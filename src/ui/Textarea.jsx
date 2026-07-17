export default function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`h-[8rem] w-full resize-none rounded-sm border border-grey-300 bg-grey-0 px-[1.2rem] py-[0.8rem] shadow-sm ${className}`}
      {...props}
    />
  );
}
