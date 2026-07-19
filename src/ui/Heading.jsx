import { motion } from "motion/react";

const variants = {
  h1: "text-[3rem] font-semibold",
  h2: "text-[2rem] font-semibold",
  h3: "text-[2rem] font-medium",
  h4: "text-[3rem] font-semibold text-center",
};

export default function Heading({
  as = "h1",
  className = "",
  children,
  ...props
}) {
  const Component = motion[as] ?? motion.h1;
  return (
    <Component
      className={`leading-[1.4] ${variants[as] ?? ""} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
