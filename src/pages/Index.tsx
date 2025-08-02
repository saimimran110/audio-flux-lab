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

  // Mock processing simulation
  const simulateProcessing = () => {
    const statuses = [
      "Initializing AI models...",
      "Analyzing audio frequencies...",
      "Separating vocal tracks...",
      "Processing instrumental layers...",
      "Finalizing audio quality...",
      "Almost done..."
    ];

    let progress = 0;
    let statusIndex = 0;

    const interval = setInterval(() => {
      progress += Math.random() * 20;
      
      if (progress >= 100) {
        progress = 100;
        setProcessingProgress(progress);
        setProcessingStatus("Separation complete!");
        clearInterval(interval);
        
        setTimeout(() => {
          setAppState("results");
          toast({
            title: "Success!",
            description: "Your audio has been successfully separated.",
          });
        }, 1000);
        return;
      }

      setProcessingProgress(progress);
      
      if (Math.random() > 0.7 && statusIndex < statuses.length - 1) {
        statusIndex++;
        setProcessingStatus(statuses[statusIndex]);
      }
    }, 800);
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

    // Start processing simulation
    simulateProcessing();
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
