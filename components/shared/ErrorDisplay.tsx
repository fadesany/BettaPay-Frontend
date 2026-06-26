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
    <div className={`flex flex-col items-center justify-center p-4 text-center rounded-lg border border-amber-200 bg-amber-50/50 ${className}`}>
      <div className="flex items-center justify-center gap-2 text-amber-800 mb-2">
        <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
        <span className="text-sm font-medium">{message}</span>
      </div>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-3 text-xs border-amber-300 text-amber-700 hover:bg-amber-100/50 hover:text-amber-800 flex items-center gap-1.5"
          onClick={onRetry}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Try Again
        </Button>
      )}
    </div>
  );
}
