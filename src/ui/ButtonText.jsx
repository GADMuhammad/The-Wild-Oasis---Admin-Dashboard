export default function ButtonText({ children, className = "", ...props }) {
  return (
    <button
      className={`rounded-sm border-none bg-none text-center font-medium text-brand-600 transition-all duration-300 hover:text-brand-700 active:text-brand-700 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
