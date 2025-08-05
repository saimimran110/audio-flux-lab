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
  const [processingStatus, setProcessingStatus] = useState("");
  const [vocalsUrl, setVocalsUrl] = useState<string>("");
  const [instrumentalUrl, setInstrumentalUrl] = useState<string>("");
  const { toast } = useToast();

  const processAudioFile = async (file: File) => {
    try {
      setProcessingProgress(0);
      setProcessingStatus("Uploading file...");
      console.log("Starting audio processing for file:", file.name);

      // TODO: Implement backend call here
      // Create FormData and send to your Express server
      // const formData = new FormData();
      // formData.append('audio', file);
      
      setProcessingProgress(20);
      console.log("File uploaded, sending to server...");

      // TODO: Replace this with actual server call
      // const response = await fetch('http://localhost:5000/separate', {
      //   method: 'POST',
      //   body: formData,
      // });

      // TODO: Handle server response
      // const result = await response.json();
      
      // For demo purposes - simulate processing
      setProcessingProgress(50);
      setProcessingStatus("Separating vocals and instruments...");
      console.log("Server processing audio...");

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setProcessingProgress(100);
      setProcessingStatus("Processing complete!");
      console.log("Audio separation completed successfully");

      // TODO: Set actual URLs from server response
      // setVocalsUrl(`http://localhost:5000${result.vocalsPath}`);
      // setInstrumentalUrl(`http://localhost:5000${result.accompanimentPath}`);
      
      // Demo URLs - replace with actual server response
      setVocalsUrl("demo-vocals.wav");
      setInstrumentalUrl("demo-instrumental.wav");

      setTimeout(() => {
        setAppState("results");
        console.log("Results ready for download");
        toast({
          title: "Success!",
          description: "Your audio has been successfully separated.",
        });
      }, 1000);

    } catch (error) {
      console.error("Error processing audio:", error);
      setProcessingStatus("Error processing audio. Please try again.");
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
    setProcessingStatus("Initializing...");
    
    console.log("File uploaded:", file.name, "Size:", file.size, "bytes");
    
    toast({
      title: "Upload successful!",
      description: "Starting audio separation process...",
    });

    processAudioFile(file);
  };

  const handleDownloadVocals = () => {
    console.log("Downloading vocals from:", vocalsUrl);
    if (vocalsUrl) {
      const link = document.createElement('a');
      link.href = vocalsUrl;
      link.download = 'vocals.wav';
      link.click();
      console.log("Vocals download initiated");
      toast({
        title: "Download started",
        description: "Vocals track is being downloaded...",
      });
    }
  };

  const handleDownloadInstrumental = () => {
    console.log("Downloading instrumental from:", instrumentalUrl);
    if (instrumentalUrl) {
      const link = document.createElement('a');
      link.href = instrumentalUrl;
      link.download = 'instrumental.wav';
      link.click();
      console.log("Instrumental download initiated");
      toast({
        title: "Download started", 
        description: "Instrumental track is being downloaded...",
      });
    }
  };

  const handleNewUpload = () => {
    setAppState("upload");
    setUploadedFile(null);
    setProcessingProgress(0);
    setProcessingStatus("");
    setVocalsUrl("");
    setInstrumentalUrl("");
    console.log("Reset for new upload");
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
            vocalsUrl={vocalsUrl}
            instrumentalUrl={instrumentalUrl}
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