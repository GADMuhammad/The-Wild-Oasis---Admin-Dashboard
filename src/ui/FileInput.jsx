export default function FileInput({ className = "", ...props }) {
  return (
    <input
      type="file"
      className={`rounded-sm text-[1.4rem] file:mr-[1.2rem] file:cursor-pointer file:rounded-sm file:border-none file:bg-brand-600 file:px-[1.2rem] file:py-[0.8rem] file:font-medium file:text-brand-50 file:transition-colors file:duration-200 hover:file:bg-brand-700 ${className}`}
      {...props}
    />
  );
}
