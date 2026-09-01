export default function ProgressBar({ value }) {
  return (
    <div className="w-full h-1 bg-neutral-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-navy transition-all duration-300 ease-out"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
