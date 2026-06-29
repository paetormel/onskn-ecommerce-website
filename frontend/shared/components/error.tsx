type ErrorStateProps = {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
};

export default function ErrorState({
  title = "Something went wrong",
  message = "Please try again.",
  actionLabel,
  onAction,
  className = "",
}: ErrorStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50 p-6 text-center ${className}`}>
      <h3 className="text-base font-semibold text-red-700">{title}</h3>
      <p className="mt-1 text-sm text-red-600">{message}</p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-4 rounded-lg border border-red-300 bg-white px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-100"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
