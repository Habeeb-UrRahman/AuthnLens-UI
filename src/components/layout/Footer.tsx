
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-8 mt-20 border-t border-border">
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
            <p className="text-sm text-muted-foreground mt-2">
              Multimodal AI-generated content detection system
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-8">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">Resources</h3>
              <Link to="/documentation" className="text-sm text-muted-foreground hover:text-primary transition-smooth">Documentation</Link>
              <Link to="/api" className="text-sm text-muted-foreground hover:text-primary transition-smooth">API</Link>
              <Link to="/research" className="text-sm text-muted-foreground hover:text-primary transition-smooth">Research</Link>
            </div>
            
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">Legal</h3>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-smooth">Privacy Policy</Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-smooth">Terms of Service</Link>
            </div>
            
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">Connect</h3>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-smooth">GitHub</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-smooth">Twitter</a>
            </div>
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
