import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Music, FileAudio } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadSectionProps {
  onFileUpload: (file: File) => void;
  isProcessing: boolean;
}

export const UploadSection = ({ onFileUpload, isProcessing }: UploadSectionProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('audio/')) {
        setSelectedFile(file);
        onFileUpload(file);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      onFileUpload(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8 animate-fade-in">
        <div className="flex justify-center mb-4">
          <div className="p-4 rounded-full bg-gradient-to-r from-primary to-accent shadow-glow animate-float">
            <Music className="w-8 h-8 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          AudioSplit AI
        </h1>
        <p className="text-muted-foreground text-lg">
          Split vocals and instrumentals with AI precision
        </p>
      </div>

      <Card
        className={cn(
          "glass-card p-8 transition-all duration-300 cursor-pointer",
          isDragOver && "upload-area-active",
          isProcessing && "pointer-events-none opacity-75"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isProcessing}
        />
        
        <div className="text-center">
          {selectedFile ? (
            <div className="animate-fade-in">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-success/20 border border-success/30">
                  <FileAudio className="w-6 h-6 text-success" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">{selectedFile.name}</h3>
              <p className="text-muted-foreground mb-4">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
              <Button 
                variant="glow" 
                size="lg"
                disabled={isProcessing}
                className="animate-pulse-glow"
              >
                {isProcessing ? "Processing..." : "Upload Another File"}
              </Button>
            </div>
          ) : (
            <div>
              <div className="flex justify-center mb-6">
                <div className="p-6 rounded-full border-2 border-dashed border-border">
                  <Upload className="w-12 h-12 text-muted-foreground" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Your Song</h3>
              <p className="text-muted-foreground mb-6">
                Drag and drop your audio file here or click to browse
              </p>
              <Button variant="glow" size="lg" className="animate-pulse-glow">
                Choose File
              </Button>
              <p className="text-xs text-muted-foreground mt-4">
                Supports MP3, WAV, M4A, FLAC • Max 50MB
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};