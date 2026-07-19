export default function Input({ className = "w-lg", ...props }) {
  return (
    <input
      className={`border-grey-300 bg-grey-0 rounded-sm border px-[1.2rem] py-[0.8rem] shadow-sm ${className}`}
      {...props}
    />
  );
}
