import { useState } from "react";
import { UploadSection } from "@/components/UploadSection";
import { ProcessingState } from "@/components/ProcessingState";
import { ResultsSection } from "@/components/ResultsSection";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

type AppState = "upload" | "processing" | "results";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("upload");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingStatus, setProcessingStatus] = useState("Initializing AI models...");
  const { toast } = useToast();

  // Real API processing function
  const processAudioFile = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('audio', file);

      setProcessingStatus("Uploading file to server...");
      setProcessingProgress(10);

      // TODO: Replace with your actual Supabase Edge Function URL
      const response = await fetch('/api/audio-separator', {
        method: 'POST',
        body: formData,
      });

      setProcessingProgress(50);
      setProcessingStatus("Running AI separation algorithm...");

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Processing failed');
      }

      setProcessingProgress(100);
      setProcessingStatus("Separation complete!");

      setTimeout(() => {
        setAppState("results");
        toast({
          title: "Success!",
          description: "Your audio has been successfully separated.",
        });
      }, 1000);

      // Store the results for display
      // You'll need to add state for these URLs
      console.log('Vocals URL:', result.vocalsUrl);
      console.log('Instrumental URL:', result.instrumentalUrl);

    } catch (error) {
      console.error('Processing error:', error);
      toast({
        title: "Error",
        description: "Failed to process audio. Please try again.",
        variant: "destructive",
      });
      setAppState("upload");
    }
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setAppState("processing");
    setProcessingProgress(0);
    setProcessingStatus("Initializing AI models...");
    
    toast({
      title: "Upload successful!",
      description: "Starting AI separation process...",
    });

    // Start real processing
    processAudioFile(file);
  };

  const handleDownloadVocals = () => {
    // TODO: API call here to download vocals
    toast({
      title: "Download started",
      description: "Vocals track is being downloaded...",
    });
  };

  const handleDownloadInstrumental = () => {
    // TODO: API call here to download instrumental
    toast({
      title: "Download started", 
      description: "Instrumental track is being downloaded...",
    });
  };

  const handleNewUpload = () => {
    setAppState("upload");
    setUploadedFile(null);
    setProcessingProgress(0);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {appState === "upload" && (
          <UploadSection 
            onFileUpload={handleFileUpload}
            isProcessing={false}
          />
        )}

        {appState === "processing" && (
          <ProcessingState 
            progress={processingProgress}
            status={processingStatus}
          />
        )}

        {appState === "results" && (
          <ResultsSection
            vocalsUrl="#" // TODO: Replace with actual audio URLs
            instrumentalUrl="#"
            onDownloadVocals={handleDownloadVocals}
            onDownloadInstrumental={handleDownloadInstrumental}
          />
        )}

        {appState === "results" && (
          <div className="text-center mt-8">
            <button
              onClick={handleNewUpload}
              className="text-accent hover:text-accent-glow transition-colors underline"
            >
              Process another file
            </button>
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
};

export default Index;
