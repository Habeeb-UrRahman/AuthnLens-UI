
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-12 mt-20 border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link 
              to="/" 
              className="text-lg font-medium text-primary flex items-center gap-2"
            >
              <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
                <Shield className="w-3 h-3 text-primary" />
              </div>
              <span>AuthenLens</span>
            </Link>
            <p className="text-sm text-muted-foreground mt-2 max-w-md">
              Multimodal AI-generated content detection system
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-smooth"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
            </a>
            <a 
              href="mailto:contact@authenlens.com" 
              className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-smooth"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-border">
          <p className="text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} AuthenLens. All rights reserved. University Research Project.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
