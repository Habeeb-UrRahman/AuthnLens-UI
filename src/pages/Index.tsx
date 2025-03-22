
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/Hero';
import MediaSelector from '@/components/MediaSelector';
import FileUpload from '@/components/FileUpload';
import TextAnalyzer from '@/components/TextAnalyzer';
import ResultsDisplay from '@/components/ResultsDisplay';

type MediaType = 'image' | 'video' | 'audio' | 'text';

const Index = () => {
  const [selectedType, setSelectedType] = useState<MediaType>('image');
  const [showResults, setShowResults] = useState(false);
  const [aiProbability, setAiProbability] = useState(78);

  const handleSelectType = (type: MediaType) => {
    setSelectedType(type);
    setShowResults(false);
  };

  const handleFileSelected = (file: File) => {
    console.log('File selected:', file);
    // In a real implementation, you would send this file to your backend
    // for processing with your AI detection model
    
    // Simulate processing delay
    setTimeout(() => {
      // Mock result - in reality this would come from your ML model
      const mockProbability = Math.floor(Math.random() * 100);
      setAiProbability(mockProbability);
      setShowResults(true);
    }, 1500);
  };

  const handleTextAnalyze = (text: string) => {
    console.log('Analyzing text:', text.substring(0, 100) + '...');
    // In a real implementation, you would send this text to your backend
    // for processing with your AI detection model
    
    // Simulate processing delay
    setTimeout(() => {
      // Mock result - in reality this would come from your ML model
      const mockProbability = Math.floor(Math.random() * 100);
      setAiProbability(mockProbability);
      setShowResults(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <MediaSelector 
                selectedType={selectedType} 
                onSelectType={handleSelectType} 
              />
              
              {selectedType === 'text' ? (
                <TextAnalyzer onAnalyze={handleTextAnalyze} />
              ) : (
                <FileUpload 
                  mediaType={selectedType} 
                  onFileSelected={handleFileSelected} 
                />
              )}
              
              <ResultsDisplay 
                showResults={showResults} 
                aiProbability={aiProbability} 
                mediaType={selectedType} 
              />
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-muted/30">
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
