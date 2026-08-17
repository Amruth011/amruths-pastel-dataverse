import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail } from 'lucide-react';

interface AnnouncementBannerProps {
  onOpenChange?: (open: boolean) => void;
}

const STORAGE_KEY = 'amruth-banner-dismissed';

const AnnouncementBanner = ({ onOpenChange }: AnnouncementBannerProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      setIsVisible(true);
      onOpenChange?.(true);
    }
  }, [onOpenChange]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(STORAGE_KEY, 'true');
    onOpenChange?.(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -48, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -48, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          className="fixed top-0 left-0 right-0 z-[60] h-12 overflow-hidden border-b border-border/50 bg-gradient-to-r from-background via-card to-background"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5" />
          <div className="container mx-auto flex h-full items-center justify-between px-4 md:px-6 relative">
            <div className="flex items-center gap-2 text-sm">
              <span className="hidden sm:inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="font-medium text-foreground/90">
                AI & Data Science Engineer — Currently Open to Opportunities
              </span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="mailto:amruth.kumar.portfolio@gmail.com"
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs text-primary transition-colors hover:bg-primary/20"
              >
                <Mail className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Get in touch</span>
                <span className="sm:hidden">Hire</span>
              </a>
              <button
                onClick={handleDismiss}
                aria-label="Dismiss announcement"
                className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementBanner;
