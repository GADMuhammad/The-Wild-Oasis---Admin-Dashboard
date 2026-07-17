export function Flag({ className = "", ...props }) {
  return (
    <img
      className={`block max-w-[2rem] rounded-tiny border border-grey-100 ${className}`}
      {...props}
    />
  );
}
