
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { FileImage, FileVideo, FileAudio, FileText, ArrowRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  const detectionTypes = [
    {
      title: 'Image Detection',
      description: 'Detect AI-generated or manipulated images using our advanced dual-input neural network.',
      icon: FileImage,
      path: '/image'
    },
    {
      title: 'Video Detection',
      description: 'Analyze video content to identify AI-generated frames and sequences.',
      icon: FileVideo,
      path: '/video'
    },
    {
      title: 'Audio Detection',
      description: 'Identify synthetic audio or voice cloning using spectral analysis.',
      icon: FileAudio,
      path: '/audio'
    },
    {
      title: 'Text Detection',
      description: 'Determine if text was written by AI or a human through linguistic pattern analysis.',
      icon: FileText,
      path: '/text'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        <section className="py-16" id="detection-types">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Choose Detection Type</h2>
              <p className="text-muted-foreground">
                AuthenLens offers multiple AI detection solutions. Select the content type you want to analyze.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {detectionTypes.map((type) => {
                const Icon = type.icon;
                
                return (
                  <div 
                    key={type.path}
                    className="glass-panel border border-border/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer"
                    onClick={() => navigate(type.path)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      
                      <div className="text-left">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">{type.title}</h3>
                        <p className="text-muted-foreground mb-4">{type.description}</p>
                        <Button 
                          variant="outline" 
                          className="flex items-center gap-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(type.path);
                          }}
                        >
                          Try it now
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
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
