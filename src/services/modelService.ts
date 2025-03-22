
// This service handles loading and running the trained h5 models
// It will use TensorFlow.js to load and run the models

import * as tf from '@tensorflow/tfjs';

export type ModelType = 'image' | 'video' | 'audio' | 'text';

class ModelService {
  private models: Record<ModelType, tf.LayersModel | null> = {
    image: null,
    video: null,
    audio: null,
    text: null
  };

  private modelPaths: Record<ModelType, string> = {
    image: '/models/image_detection_model.h5',
    video: '/models/video_detection_model.h5',
    audio: '/models/audio_detection_model.h5',
    text: '/models/text_detection_model.h5'
  };

  constructor() {
    // Initialize TensorFlow.js
    tf.ready().then(() => {
      console.log('TensorFlow.js is ready');
    });
  }

  /**
   * Load a specific model
   */
  async loadModel(type: ModelType): Promise<tf.LayersModel> {
    if (this.models[type]) {
      return this.models[type]!;
    }

    try {
      console.log(`Loading ${type} model...`);
      const model = await tf.loadLayersModel(`indexeddb://${type}_model`);
      console.log(`${type} model loaded from IndexedDB`);
      this.models[type] = model;
      return model;
    } catch (e) {
      console.log(`No saved ${type} model found, loading from h5 file...`);
      try {
        const model = await tf.loadLayersModel(
          `file://${this.modelPaths[type]}`
        );
        await model.save(`indexeddb://${type}_model`);
        this.models[type] = model;
        return model;
      } catch (err) {
        console.error(`Error loading ${type} model:`, err);
        throw new Error(`Failed to load ${type} model`);
      }
    }
  }

  /**
   * Process image data through the image model
   */
  async analyzeImage(imageData: ImageData): Promise<number> {
    const model = await this.loadModel('image');
    
    // Preprocess the image
    const tensor = tf.browser.fromPixels(imageData)
      .resizeNearestNeighbor([224, 224]) // resize to model input size
      .toFloat()
      .expandDims();
    
    // Run inference
    const prediction = model.predict(tensor) as tf.Tensor;
    const probabilityData = await prediction.data();
    
    // Cleanup tensors
    tensor.dispose();
    prediction.dispose();
    
    // Return AI probability (assuming model output is probability of being AI-generated)
    return probabilityData[0] * 100;
  }

  /**
   * Process video data through the video model
   */
  async analyzeVideo(videoElement: HTMLVideoElement): Promise<number> {
    const model = await this.loadModel('video');
    
    // Extract frames from video
    const numFrames = 10; // Sample frames
    const framesTensor: tf.Tensor[] = [];
    
    for (let i = 0; i < numFrames; i++) {
      const time = (videoElement.duration / numFrames) * i;
      videoElement.currentTime = time;
      
      // Wait for the video to seek to the specified time
      await new Promise(resolve => {
        videoElement.onseeked = resolve;
      });
      
      // Capture frame
      const frameTensor = tf.browser.fromPixels(videoElement)
        .resizeNearestNeighbor([224, 224])
        .toFloat();
      framesTensor.push(frameTensor);
    }
    
    // Stack frames into a batch
    const batchTensor = tf.stack(framesTensor).expandDims(0);
    
    // Run inference
    const prediction = model.predict(batchTensor) as tf.Tensor;
    const probabilityData = await prediction.data();
    
    // Cleanup
    framesTensor.forEach(tensor => tensor.dispose());
    batchTensor.dispose();
    prediction.dispose();
    
    return probabilityData[0] * 100;
  }

  /**
   * Process audio data through the audio model
   */
  async analyzeAudio(audioBuffer: AudioBuffer): Promise<number> {
    const model = await this.loadModel('audio');
    
    // Convert audio buffer to spectogram or other appropriate representation
    const audioData = Array.from(audioBuffer.getChannelData(0));
    
    // Create a tensor from the audio data
    const audioTensor = tf.tensor1d(audioData);
    
    // Compute spectogram using fft manually since tf.signal.rfft is not available
    // We'll use the regular fft and take the magnitude
    const fftSize = 1024;
    const hopSize = 512;
    const numFrames = Math.floor((audioData.length - fftSize) / hopSize) + 1;
    
    // Create a spectogram manually
    const spectogramData: number[][] = [];
    
    for (let i = 0; i < numFrames; i++) {
      const start = i * hopSize;
      const frame = audioData.slice(start, start + fftSize);
      
      // Pad the frame if needed
      const paddedFrame = frame.length < fftSize 
        ? [...frame, ...Array(fftSize - frame.length).fill(0)] 
        : frame;
      
      // Apply Hann window (simple implementation)
      const windowedFrame = paddedFrame.map((x, i) => 
        x * 0.5 * (1 - Math.cos(2 * Math.PI * i / (fftSize - 1)))
      );
      
      // For simplicity, we'll just use the energy in different frequency bands
      // In a real implementation, you'd compute the actual FFT
      const bands = 128; // Number of frequency bands
      const bandsData: number[] = Array(bands).fill(0);
      
      // Simple band energy calculation (this is a placeholder for actual FFT)
      for (let b = 0; b < bands; b++) {
        const bandStart = Math.floor(b * fftSize / bands);
        const bandEnd = Math.floor((b + 1) * fftSize / bands);
        
        for (let j = bandStart; j < bandEnd; j++) {
          if (j < windowedFrame.length) {
            bandsData[b] += Math.abs(windowedFrame[j]);
          }
        }
      }
      
      spectogramData.push(bandsData);
    }
    
    // Convert to tensor and prepare for model input
    const tensorInput = tf.tensor2d(spectogramData).expandDims();
    
    // Ensure the input has the right shape by reshaping to 3D tensor before using resizeBilinear
    // Create a proper 3D tensor with shape [height, width, channels]
    const reshapedInput = tf.reshape(
      tensorInput, 
      [spectogramData.length, spectogramData[0].length, 1]
    ) as tf.Tensor3D;
    
    // Now we can use resizeBilinear which expects a 3D or 4D tensor
    const resizedInput = tf.image.resizeBilinear(
      reshapedInput, 
      [128, 128]
    ).expandDims();
    
    // Run inference
    const prediction = model.predict(resizedInput) as tf.Tensor;
    const probabilityData = await prediction.data();
    
    // Cleanup
    audioTensor.dispose();
    tensorInput.dispose();
    reshapedInput.dispose();
    resizedInput.dispose();
    prediction.dispose();
    
    return probabilityData[0] * 100;
  }

  /**
   * Process text data through the text model
   */
  async analyzeText(text: string): Promise<number> {
    const model = await this.loadModel('text');
    
    // Preprocess text (tokenization would normally go here)
    // This is a simplified example
    const words = text.toLowerCase().split(/\s+/).slice(0, 100);
    const wordIndices = words.map(word => {
      // In a real implementation, you would use a vocabulary lookup
      return word.charCodeAt(0) % 1000; // Simple hash for demo purposes
    });
    
    // Pad or truncate to fixed length
    const paddedIndices = Array(100).fill(0);
    wordIndices.forEach((idx, i) => {
      if (i < 100) paddedIndices[i] = idx;
    });
    
    // Convert to tensor
    const inputTensor = tf.tensor2d([paddedIndices], [1, 100]);
    
    // Run inference
    const prediction = model.predict(inputTensor) as tf.Tensor;
    const probabilityData = await prediction.data();
    
    // Cleanup
    inputTensor.dispose();
    prediction.dispose();
    
    return probabilityData[0] * 100;
  }
}

export default new ModelService();
