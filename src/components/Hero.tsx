
import React from 'react';
import { ArrowRight, Shield, FileSearch } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative w-full py-24 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-primary/10 blur-3xl animate-float opacity-70"></div>
        <div className="absolute top-20 right-20 w-60 h-60 rounded-full bg-blue-400/10 blur-3xl animate-float opacity-70" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-10 left-1/3 w-40 h-40 rounded-full bg-indigo-400/10 blur-3xl animate-float opacity-70" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 pt-20">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
            <Shield className="w-4 h-4 mr-2" />
            University Research Project
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-slide-up">
            Detect AI-Generated<br />
            <span className="text-primary">Content with Precision</span>
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl animate-slide-up" style={{ animationDelay: '100ms' }}>
            AuthenLens uses advanced deep learning models to detect AI-generated 
            content across multiple modalities: images, video, audio, and text.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <button className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-white font-medium transition-smooth hover:bg-primary/90">
              Start Analyzing
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <button className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium transition-smooth hover:bg-secondary/80">
              Learn More
            </button>
          </div>
        </div>
        
        <div className="flex justify-center mt-16 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <div className="glass-panel p-8 rounded-2xl max-w-lg w-full text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <FileSearch className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Advanced Detection Technology</h2>
            <p className="text-muted-foreground">
              Our system leverages state-of-the-art deep learning models to identify subtle patterns in AI-generated content that are invisible to the human eye.
            </p>
          </div>
        </div>
        
        <div className="flex justify-center mt-12 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <span className="block w-8 h-px bg-border"></span>
            Scroll to explore
            <span className="block w-8 h-px bg-border"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
