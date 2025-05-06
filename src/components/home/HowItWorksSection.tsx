
import React from 'react';

const HowItWorksSection = () => {
  return (
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
  );
};

export default HowItWorksSection;
