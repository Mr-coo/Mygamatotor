import { useEffect } from "react";
import { X } from "lucide-react";
import { useErrorStore } from "../store/error.store";

export function ErrorDialog() {
  const message = useErrorStore((s) => s.message);
  const clearError = useErrorStore((s) => s.clearError);

  useEffect(() => {
    if (!message) return;
    const id = setTimeout(clearError, 5000);
    return () => clearTimeout(id);
  }, [message, clearError]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm animate-[slideIn_0.25s_ease-out]">
      <div className="bg-white/10 border border-white/30 backdrop-blur-sm rounded-xl px-5 py-4 text-white shadow-lg flex items-start gap-3 [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
        <div className="flex-1 min-w-0">
          <h4 className="text-white mb-1">Something went wrong</h4>
          <p className="text-white/90 break-words text-xl">{message}</p>
        </div>
        <button
          onClick={clearError}
          className="text-white/70 hover:text-white transition-colors cursor-pointer shrink-0"
          aria-label="Dismiss"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
