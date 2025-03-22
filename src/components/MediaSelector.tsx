
import React from 'react';
import { FileImage, FileVideo, FileAudio, FileText, Check } from 'lucide-react';

type MediaType = 'image' | 'video' | 'audio' | 'text';

interface MediaSelectorProps {
  selectedType: MediaType;
  onSelectType: (type: MediaType) => void;
}

const MediaSelector: React.FC<MediaSelectorProps> = ({ selectedType, onSelectType }) => {
  const mediaTypes = [
    { id: 'image', label: 'Image', icon: FileImage, description: 'Detect AI-generated images' },
    { id: 'video', label: 'Video', icon: FileVideo, description: 'Detect AI-generated videos' },
    { id: 'audio', label: 'Audio', icon: FileAudio, description: 'Detect AI-generated audio' },
    { id: 'text', label: 'Text', icon: FileText, description: 'Detect AI-generated text' },
  ];

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold mb-2">Select Content Type</h2>
        <p className="text-muted-foreground">Choose the type of content you want to analyze</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mediaTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = selectedType === type.id;
          
          return (
            <div
              key={type.id}
              className={`relative overflow-hidden group transition-all duration-300 ease-out
                ${isSelected 
                  ? 'bg-primary/5 border-primary shadow-md' 
                  : 'bg-white/80 border-transparent hover:bg-white/90 hover:-translate-y-1'} 
                border rounded-xl p-6 cursor-pointer`}
              onClick={() => onSelectType(type.id as MediaType)}
              aria-selected={isSelected}
            >
              <div className={`w-12 h-12 rounded-full 
                ${isSelected ? 'bg-primary/20' : 'bg-secondary'} 
                flex items-center justify-center mb-4 transition-smooth group-hover:scale-110`}>
                <Icon className={`w-6 h-6 ${isSelected ? 'text-primary' : 'text-muted-foreground'} transition-smooth`} />
              </div>
              
              <h3 className="text-lg font-medium mb-1">{type.label}</h3>
              <p className="text-sm text-muted-foreground">{type.description}</p>
              
              {isSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
              
              <div className={`absolute bottom-0 left-0 h-1 bg-primary transition-all duration-300 ${
                isSelected ? 'w-full' : 'w-0 group-hover:w-1/3'
              }`}></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MediaSelector;
