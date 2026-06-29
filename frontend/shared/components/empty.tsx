type EmptyStateProps = {
  title?: string;
  message?: string;
  className?: string;
};

export default function EmptyState({
  title = "No data yet",
  message = "Try adjusting your filters or add a new item.",
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-gray-50 p-6 text-center ${className}`}>
      <h3 className="text-base font-semibold text-gray-700">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{message}</p>
    </div>
  );
}
