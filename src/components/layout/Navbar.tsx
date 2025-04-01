
import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-4 glass-panel shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="text-xl font-medium text-primary flex items-center gap-2 transition-smooth hover:opacity-80"
        >
          <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
            <Search className="w-4 h-4 text-primary" />
          </div>
          <span className="font-bold tracking-tight">AuthenLens</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className="text-sm font-medium text-foreground/80 transition-smooth hover:text-primary relative group"
          >
            Home
            <span className="absolute left-0 bottom-[-4px] w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link 
            to="/about" 
            className="text-sm font-medium text-foreground/80 transition-smooth hover:text-primary relative group"
          >
            About
            <span className="absolute left-0 bottom-[-4px] w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link 
            to="/how-it-works" 
            className="text-sm font-medium text-foreground/80 transition-smooth hover:text-primary relative group"
          >
            How it works
            <span className="absolute left-0 bottom-[-4px] w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sm font-medium text-foreground/80 transition-smooth hover:text-primary relative group"
          >
            GitHub
            <span className="absolute left-0 bottom-[-4px] w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>

        <div className="md:hidden">
          <button className="p-2 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-smooth">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
