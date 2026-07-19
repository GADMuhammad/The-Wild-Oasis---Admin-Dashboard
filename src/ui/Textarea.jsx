export default function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`border-grey-300 bg-grey-0 h-32 w-lg resize-none rounded-sm border px-[1.2rem] py-[0.8rem] shadow-sm ${className}`}
      {...props}
    />
  );
}
