
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FileUpload from '@/components/FileUpload';
import ResultsDisplay from '@/components/ResultsDisplay';
import { Loader2 } from 'lucide-react';
import modelService from '@/services/modelService';
import { toast } from "@/components/ui/use-toast";

const VideoDetection = () => {
  const [showResults, setShowResults] = useState(false);
  const [aiProbability, setAiProbability] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileSelected = async (file: File) => {
    try {
      setIsAnalyzing(true);
      console.log('Processing video:', file.name);
      
      // Create video element and load the file
      const video = document.createElement('video');
      video.src = URL.createObjectURL(file);
      video.muted = true;
      await new Promise(resolve => { video.onloadedmetadata = resolve; });
      
      // Process the video
      const probability = await modelService.analyzeVideo(video);
      
      setAiProbability(probability);
      setShowResults(true);
      toast({
        title: "Analysis Complete",
        description: "We've processed your video and generated results.",
      });
    } catch (error) {
      console.error('Error processing file:', error);
      toast({
        title: "Processing Error",
        description: "There was an error analyzing your video. Please try again.",
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
              <h1 className="text-3xl font-bold mb-2">Video Detection</h1>
              <p className="text-muted-foreground">
                Upload a video to analyze whether it was generated or manipulated by AI
              </p>
            </div>
            
            {isAnalyzing ? (
              <div className="w-full flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                <h3 className="text-lg font-medium">Analyzing your video...</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  This may take a moment depending on the size and complexity.
                </p>
              </div>
            ) : (
              <FileUpload 
                mediaType="video" 
                onFileSelected={handleFileSelected} 
              />
            )}
            
            <ResultsDisplay 
              showResults={showResults} 
              aiProbability={aiProbability} 
              mediaType="video" 
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VideoDetection;
