import { AlertCircle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorDisplayProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorDisplay({
  message = "Failed to load data. Please check your connection.",
  onRetry,
  className = "",
}: ErrorDisplayProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-4 text-center rounded-lg border border-primary/30 bg-primary/10 ${className}`}>
      <div className="flex items-center justify-center gap-2 text-primary mb-2">
        <AlertCircle className="w-5 h-5 text-primary shrink-0" />
        <span className="text-sm font-medium">{message}</span>
      </div>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-3 text-xs border-primary/40 text-primary hover:bg-primary/20 hover:text-primary flex items-center gap-1.5"
          onClick={onRetry}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Try Again
        </Button>
      )}
    </div>
  );
}
