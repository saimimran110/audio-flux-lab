import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AudioWaveform, Sparkles } from "lucide-react";

interface ProcessingStateProps {
  progress: number;
  status: string;
}

export const ProcessingState = ({ progress, status }: ProcessingStateProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto animate-slide-up">
      <Card className="glass-card p-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="p-4 rounded-full bg-gradient-to-r from-primary to-accent shadow-glow animate-pulse-glow">
                <Sparkles className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="absolute -top-2 -right-2 p-2 rounded-full bg-secondary shadow-glow-secondary animate-float">
                <AudioWaveform className="w-4 h-4 text-secondary-foreground" />
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-2">AI Processing in Progress</h2>
          <p className="text-muted-foreground mb-8">{status}</p>

          <div className="space-y-4">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground">{progress}% Complete</p>
          </div>

          {/* Audio visualization bars */}
          <div className="flex justify-center gap-1 mt-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="audio-bar w-1 h-8"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};