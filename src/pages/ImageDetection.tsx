
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FileUpload from '@/components/FileUpload';
import ResultsDisplay from '@/components/ResultsDisplay';
import { Loader2 } from 'lucide-react';
import modelService from '@/services/modelService';
import { toast } from "@/components/ui/use-toast";

const ImageDetection = () => {
  const [showResults, setShowResults] = useState(false);
  const [aiProbability, setAiProbability] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileSelected = async (file: File) => {
    try {
      setIsAnalyzing(true);
      console.log('Processing image:', file.name);
      
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
      const probability = await modelService.analyzeImage(imageData);
      
      setAiProbability(probability);
      setShowResults(true);
      toast({
        title: "Analysis Complete",
        description: "We've processed your image and generated results.",
      });
    } catch (error) {
      console.error('Error processing file:', error);
      toast({
        title: "Processing Error",
        description: "There was an error analyzing your image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="mb-10 text-center">
              <h1 className="text-3xl font-bold mb-2">Image Detection</h1>
              <p className="text-muted-foreground">
                Upload an image to analyze whether it was generated or manipulated by AI
              </p>
            </div>
            
            {isAnalyzing ? (
              <div className="w-full flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                <h3 className="text-lg font-medium">Analyzing your image...</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  This may take a moment depending on the size and complexity.
                </p>
              </div>
            ) : (
              <FileUpload 
                mediaType="image" 
                onFileSelected={handleFileSelected} 
              />
            )}
            
            <ResultsDisplay 
              showResults={showResults} 
              aiProbability={aiProbability} 
              mediaType="image" 
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ImageDetection;
