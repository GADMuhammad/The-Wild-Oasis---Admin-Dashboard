import { motion } from "motion/react";

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

function DataItem({ icon, label, children }) {
  return (
    <motion.div
      variants={itemVariants}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="flex items-center gap-[1.6rem] py-[0.8rem]"
    >
      <span className="flex items-center gap-[0.8rem] font-medium [&>svg]:h-[2rem] [&>svg]:w-[2rem] [&>svg]:text-brand-600">
        {icon}
        <span>{label}</span>
      </span>
      {children}
    </motion.div>
  );
}

export default DataItem;
