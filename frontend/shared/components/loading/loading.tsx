import "./style.css";

export default function Loading() {
  return (
    <div className="spinner center">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="spinner-blade" />
      ))}
    </div>
  );
}