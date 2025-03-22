
import React, { useState } from 'react';
import { Send, RefreshCw, Copy, Check } from 'lucide-react';

interface TextAnalyzerProps {
  onAnalyze: (text: string) => void;
}

const TextAnalyzer: React.FC<TextAnalyzerProps> = ({ onAnalyze }) => {
  const [text, setText] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleClearText = () => {
    setText('');
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAnalyze(text);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <form onSubmit={handleSubmit} className="text-input-container">
        <div className="mb-4 flex justify-between items-center">
          <label htmlFor="text-input" className="text-sm font-medium">
            Enter or paste text to analyze
          </label>
          
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyText}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-smooth"
              disabled={!text}
              title="Copy text"
            >
              {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
            
            <button
              type="button"
              onClick={handleClearText}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-smooth"
              disabled={!text}
              title="Clear text"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <textarea
          id="text-input"
          className="w-full h-48 p-4 border rounded-lg bg-background resize-none focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="Paste or type the text you want to analyze for AI-generated content detection..."
          value={text}
          onChange={handleTextChange}
        ></textarea>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            {text.length} characters
          </div>
          
          <button
            type="submit"
            disabled={!text.trim()}
            className={`px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-smooth ${
              text.trim() 
                ? 'bg-primary text-white hover:bg-primary/90' 
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            <span>Analyze Text</span>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">
          For the most accurate results, provide at least 100 characters of text.
        </p>
      </div>
    </div>
  );
};

export default TextAnalyzer;
