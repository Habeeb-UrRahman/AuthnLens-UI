import React, { useState, useRef } from 'react';
import { Upload, X, FileImage, FileVideo, FileAudio } from 'lucide-react';

type MediaType = 'image' | 'video' | 'audio';

interface FileUploadProps {
  mediaType: MediaType;
  onFileSelected: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ mediaType, onFileSelected }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mediaTypeInfo = {
    image: {
      accept: 'image/*',
      icon: FileImage,
      label: 'Upload Image',
      description: 'Drag and drop an image file here, or click to select',
      fileTypes: '.jpg, .jpeg, .png, .webp, .gif'
    },
    video: {
      accept: 'video/*',
      icon: FileVideo,
      label: 'Upload Video',
      description: 'Drag and drop a video file here, or click to select',
      fileTypes: '.mp4, .webm, .avi, .mov'
    },
    audio: {
      accept: 'audio/*',
      icon: FileAudio,
      label: 'Upload Audio',
      description: 'Drag and drop an audio file here, or click to select',
      fileTypes: '.mp3, .wav, .ogg, .m4a'
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile: File) => {
    // Check if file type matches the expected media type
    if (!selectedFile.type.startsWith(mediaType)) {
      alert(`Please select a valid ${mediaType} file.`);
      return;
    }
    
    setFile(selectedFile);
    onFileSelected(selectedFile);
    
    // Create preview for image or video
    if (mediaType === 'image' || mediaType === 'video') {
      const url = URL.createObjectURL(selectedFile);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyzeClick = () => {
    if (file) {
      onFileSelected(file);
    }
  };

  const { icon: Icon, label, description, accept, fileTypes } = mediaTypeInfo[mediaType];

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      {!file ? (
        <div
          className={`upload-zone ${isDragging ? 'upload-zone-dragging' : ''}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Icon className="w-8 h-8 text-primary" />
            </div>
            
            <h3 className="text-lg font-medium mb-2">{label}</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">{description}</p>
            
            <div className="flex items-center gap-2 text-sm text-primary">
              <Upload className="w-4 h-4" />
              <span>Select file</span>
            </div>
            
            <p className="text-xs text-muted-foreground mt-4">
              Supported formats: {fileTypes}
            </p>
          </div>
          
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept={accept}
            onChange={handleFileInputChange}
          />
        </div>
      ) : (
        <div className="w-full glass-panel rounded-xl overflow-hidden">
          <div className="p-4 flex justify-between items-center border-b border-border">
            <div className="flex items-center gap-2">
              <Icon className="w-5 h-5 text-primary" />
              <span className="font-medium">{file.name}</span>
            </div>
            
            <button
              onClick={handleRemoveFile}
              className="w-8 h-8 rounded-full bg-muted flex items-center justify-center transition-smooth hover:bg-muted/80"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="p-6">
            {mediaType === 'image' && preview && (
              <div className="w-full h-64 flex items-center justify-center">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="max-w-full max-h-full object-contain rounded-md" 
                />
              </div>
            )}
            
            {mediaType === 'video' && preview && (
              <div className="w-full">
                <video 
                  src={preview} 
                  controls 
                  className="w-full max-h-64 rounded-md"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
            
            {mediaType === 'audio' && (
              <div className="w-full flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <FileAudio className="w-8 h-8 text-primary" />
                </div>
                <p className="text-sm text-center mb-4">Audio file selected</p>
                <audio controls className="w-full">
                  <source src={URL.createObjectURL(file)} />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
            
            <div className="flex justify-center mt-6">
              <button 
                className="px-6 py-2.5 rounded-lg bg-primary text-white font-medium transition-smooth hover:bg-primary/90"
                onClick={handleAnalyzeClick}
              >
                Analyze {mediaType}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
