import { AudioPlayer } from "./AudioPlayer";
import { Card } from "@/components/ui/card";
import { CheckCircle, Sparkles } from "lucide-react";

interface ResultsSectionProps {
  vocalsUrl?: string;
  instrumentalUrl?: string;
  onDownloadVocals: () => void;
  onDownloadInstrumental: () => void;
}

export const ResultsSection = ({ 
  vocalsUrl, 
  instrumentalUrl, 
  onDownloadVocals, 
  onDownloadInstrumental 
}: ResultsSectionProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto animate-slide-up">
      {/* Success header */}
      <Card className="glass-card p-6 mb-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-success/20 border border-success/30">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">Separation Complete!</h2>
        <p className="text-muted-foreground">
          Your audio has been successfully split into vocals and instrumental tracks
        </p>
      </Card>

      {/* Audio players grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <AudioPlayer
          title="Vocals Only"
          type="vocals"
          audioUrl={vocalsUrl}
          onDownload={onDownloadVocals}
        />
        
        <AudioPlayer
          title="Instrumental"
          type="instrumental"
          audioUrl={instrumentalUrl}
          onDownload={onDownloadInstrumental}
        />
      </div>

      {/* Pro tip */}
      <Card className="glass-card p-4 mt-8 border border-accent/30">
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-accent" />
          <div>
            <p className="text-sm font-medium">Pro Tip</p>
            <p className="text-xs text-muted-foreground">
              Use high-quality audio files for the best separation results
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};