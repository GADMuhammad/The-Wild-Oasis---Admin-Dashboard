export default function ButtonGroup({ children, className = "" }) {
  return (
    <div className={`flex justify-end gap-[1.2rem] ${className}`}>
      {children}
    </div>
  );
}
