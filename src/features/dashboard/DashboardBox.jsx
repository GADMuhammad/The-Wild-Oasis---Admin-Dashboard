import { motion } from "motion/react";

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1 },
};

export default function DashboardBox({ className = "", children }) {
  return (
    <motion.div
      variants={itemVariants}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className={`border-grey-100 bg-grey-0 flex flex-col gap-[2.4rem] rounded-md border p-[3.2rem] ${className}`}
    >
      {children}
    </motion.div>
  );
}
