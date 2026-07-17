const sizes = {
  small:
    "px-[0.8rem] py-[0.4rem] text-[1.2rem] font-semibold uppercase text-center",
  medium: "px-[1.6rem] py-[1.2rem] text-[1.4rem] font-medium",
  large: "w-[48rem] px-[2.4rem] py-[1.2rem] text-[1.6rem] font-medium",
};

const variations = {
  primary: "bg-brand-600 text-brand-50 hover:bg-brand-700",
  secondary:
    "border border-grey-200 bg-grey-0 text-grey-600 hover:bg-grey-50",
  danger: "bg-red-700 text-red-100 hover:bg-red-800",
};

export default function Button({
  size = "medium",
  variation = "primary",
  as: Component = "button",
  className = "",
  ...props
}) {
  return (
    <Component
      className={`rounded-sm shadow-sm disabled:cursor-not-allowed disabled:bg-grey-300 ${sizes[size]} ${variations[variation]} ${className}`}
      {...props}
    />
  );
}
