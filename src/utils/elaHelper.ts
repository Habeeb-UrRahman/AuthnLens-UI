
import * as tf from '@tensorflow/tfjs';

/**
 * Convert an image to its Error Level Analysis (ELA) version
 * ELA highlights differences in JPEG compression levels which can reveal 
 * modifications in the image
 */
export async function createElaImage(imageData: ImageData, quality: number = 90): Promise<ImageData> {
  try {
    // Convert ImageData to tensor
    const originalTensor = tf.browser.fromPixels(imageData);
    
    // Create a canvas to work with the image data
    const canvas = document.createElement('canvas');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    const ctx = canvas.getContext('2d')!;
    
    // Put the original image data on canvas
    ctx.putImageData(imageData, 0, 0);
    
    // Save the image at reduced quality
    const dataUrl = canvas.toDataURL('image/jpeg', quality / 100);
    
    // Load the compressed image
    const compressedImage = new Image();
    await new Promise((resolve) => {
      compressedImage.onload = resolve;
      compressedImage.src = dataUrl;
    });
    
    // Draw the compressed image to the canvas
    ctx.drawImage(compressedImage, 0, 0);
    const compressedData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // Convert compressed image to tensor
    const compressedTensor = tf.browser.fromPixels(compressedData);
    
    // Calculate difference (ELA)
    const diffTensor = tf.sub(originalTensor, compressedTensor);
    
    // Scale the difference to make it more visible
    // First find the max value to scale correctly
    const maxValues = tf.max(diffTensor, [0, 1]);
    const maxValue = tf.max(maxValues).dataSync()[0];
    
    // Scale the difference tensor (normalize to 0-255 range)
    const scale = 255.0 / (maxValue || 1);
    const scaledDiff = tf.mul(diffTensor, tf.scalar(scale));
    
    // Convert back to ImageData
    // Fix: Cast the tensor to a Tensor3D type to match toPixels expectations
    const elaArray = await tf.browser.toPixels(scaledDiff as tf.Tensor3D);
    const elaImageData = new ImageData(
      new Uint8ClampedArray(elaArray),
      imageData.width,
      imageData.height
    );
    
    // Clean up tensors
    originalTensor.dispose();
    compressedTensor.dispose();
    diffTensor.dispose();
    maxValues.dispose();
    scaledDiff.dispose();
    
    return elaImageData;
  } catch (error) {
    console.error('Error creating ELA image:', error);
    // Return the original image data if ELA generation fails
    return imageData;
  }
}
