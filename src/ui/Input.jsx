export default function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-auto rounded-sm border border-grey-300 bg-grey-0 px-[1.2rem] py-[0.8rem] shadow-sm ${className}`}
      {...props}
    />
  );
}
