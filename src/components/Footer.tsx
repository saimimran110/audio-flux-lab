import { Card } from "@/components/ui/card";
import { Github, Twitter, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="mt-16 pb-8">
      <Card className="glass-card p-6 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground">
              Made with AI precision
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © 2024 AudioSplit AI
          </div>
        </div>
      </Card>
    </footer>
  );
};