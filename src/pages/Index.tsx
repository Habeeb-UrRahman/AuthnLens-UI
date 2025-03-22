
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/Hero';
import MediaSelector from '@/components/MediaSelector';
import FileUpload from '@/components/FileUpload';
import TextAnalyzer from '@/components/TextAnalyzer';
import ResultsDisplay from '@/components/ResultsDisplay';
import { Loader2 } from 'lucide-react';
import modelService from '@/services/modelService';
import { toast } from "@/components/ui/use-toast";

type MediaType = 'image' | 'video' | 'audio' | 'text';

const Index = () => {
  const [selectedType, setSelectedType] = useState<MediaType>('image');
  const [showResults, setShowResults] = useState(false);
  const [aiProbability, setAiProbability] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSelectType = (type: MediaType) => {
    setSelectedType(type);
    setShowResults(false);
  };

  const handleFileSelected = async (file: File) => {
    try {
      setIsAnalyzing(true);
      console.log('Processing file:', file.name);
      
      let probability = 0;
      
      if (selectedType === 'image') {
        // Create an image element and load the file
        const img = new Image();
        img.src = URL.createObjectURL(file);
        await new Promise(resolve => { img.onload = resolve; });
        
        // Create a canvas to get ImageData
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        
        // Process the image
        probability = await modelService.analyzeImage(imageData);
      } 
      else if (selectedType === 'video') {
        // Create video element and load the file
        const video = document.createElement('video');
        video.src = URL.createObjectURL(file);
        video.muted = true;
        await new Promise(resolve => { video.onloadedmetadata = resolve; });
        
        // Process the video
        probability = await modelService.analyzeVideo(video);
      }
      else if (selectedType === 'audio') {
        // Create audio context and decode the file
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const fileBuffer = await file.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(fileBuffer);
        
        // Process the audio
        probability = await modelService.analyzeAudio(audioBuffer);
      }
      
      setAiProbability(probability);
      setShowResults(true);
      toast({
        title: "Analysis Complete",
        description: "We've processed your content and generated results.",
      });
    } catch (error) {
      console.error('Error processing file:', error);
      toast({
        title: "Processing Error",
        description: "There was an error analyzing your content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleTextAnalyze = async (text: string) => {
    try {
      setIsAnalyzing(true);
      console.log('Analyzing text sample');
      
      // Process the text
      const probability = await modelService.analyzeText(text);
      
      setAiProbability(probability);
      setShowResults(true);
      toast({
        title: "Analysis Complete",
        description: "We've processed your text and generated results.",
      });
    } catch (error) {
      console.error('Error analyzing text:', error);
      toast({
        title: "Processing Error",
        description: "There was an error analyzing your text. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        <section className="py-16" id="content-type-section">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <MediaSelector 
                selectedType={selectedType} 
                onSelectType={handleSelectType} 
              />
              
              {isAnalyzing ? (
                <div className="w-full flex flex-col items-center justify-center py-20">
                  <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                  <h3 className="text-lg font-medium">Analyzing your content...</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    This may take a moment depending on the size and complexity.
                  </p>
                </div>
              ) : (
                <>
                  {selectedType === 'text' ? (
                    <TextAnalyzer onAnalyze={handleTextAnalyze} />
                  ) : (
                    <FileUpload 
                      mediaType={selectedType} 
                      onFileSelected={handleFileSelected} 
                    />
                  )}
                </>
              )}
              
              <ResultsDisplay 
                showResults={showResults} 
                aiProbability={aiProbability} 
                mediaType={selectedType} 
              />
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-muted/30" id="how-it-works">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground mb-12">
                Our system uses advanced deep learning models to detect AI-generated content
                across different media types with high accuracy.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="glass-panel p-6 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-medium">1</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Select Media Type</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose from image, video, audio, or text content that you want to analyze.
                  </p>
                </div>
                
                <div className="glass-panel p-6 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-medium">2</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Upload or Paste</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload your media file or paste your text content into the system.
                  </p>
                </div>
                
                <div className="glass-panel p-6 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-medium">3</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Get Results</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive a detailed analysis showing the probability of AI generation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
