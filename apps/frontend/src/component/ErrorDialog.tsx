import { useErrorStore } from "../store/error.store";

export function ErrorDialog() {
  const message = useErrorStore((s) => s.message);
  const clearError = useErrorStore((s) => s.clearError);

  if (!message) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white/10 border border-white/30 backdrop-blur-sm rounded-2xl px-8 py-6 max-w-md w-full mx-4 text-white shadow-lg">
        <h3 className="text-white mb-2">Something went wrong</h3>
        <p className="text-white/80 break-words">{message}</p>
        <div className="mt-6 flex justify-end">
          <button
            onClick={clearError}
            className="border border-white/40 text-white/80 px-5 py-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
