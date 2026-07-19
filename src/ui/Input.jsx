export default function Input({ className = "", ...props }) {
  return (
    <input
      className={`border-grey-300 bg-grey-0 w-xl rounded-sm border px-[1.2rem] py-[0.8rem] shadow-sm ${className}`}
      {...props}
    />
  );
}
