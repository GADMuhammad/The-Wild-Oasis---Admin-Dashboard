export default function ButtonIcon({ children, className = "", ...props }) {
  return (
    <button
      className={`rounded-lg border-none bg-none p-[0.6rem] transition-all duration-200 hover:bg-grey-100 [&>svg]:h-[2.2rem] [&>svg]:w-[2.2rem] [&>svg]:text-brand-600 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
