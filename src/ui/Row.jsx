import { motion } from "motion/react";

const types = {
  horizontal: "justify-between items-center",
  vertical: "flex-col",
};

export default function Row({ type = "vertical", children, ...props }) {
  return (
    <motion.div className={`flex gap-[1.6rem] ${types[type]}`} {...props}>
      {children}
    </motion.div>
  );
}
