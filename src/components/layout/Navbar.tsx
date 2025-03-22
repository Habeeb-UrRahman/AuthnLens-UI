
import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-4 glass-panel">
      <div className="container mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="text-xl font-medium text-primary flex items-center gap-2 transition-smooth hover:opacity-80"
        >
          <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
            <Search className="w-4 h-4 text-primary" />
          </div>
          <span>AuthenLens</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link 
            to="/" 
            className="text-sm font-medium text-foreground/80 transition-smooth hover:text-primary"
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="text-sm font-medium text-foreground/80 transition-smooth hover:text-primary"
          >
            About
          </Link>
          <Link 
            to="/how-it-works" 
            className="text-sm font-medium text-foreground/80 transition-smooth hover:text-primary"
          >
            How it works
          </Link>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sm font-medium text-foreground/80 transition-smooth hover:text-primary"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
