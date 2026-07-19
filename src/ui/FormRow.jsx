import { motion } from "motion/react";

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

function FormRow({ label, error, children }) {
  return (
    <motion.div
      variants={itemVariants}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="grid grid-cols-[24rem_1fr_1.2fr] items-center gap-[2.4rem] border-b border-grey-100 py-[1.2rem] first:pt-0 last:border-b-0 last:pb-0 has-[button]:flex has-[button]:justify-end has-[button]:gap-[1.2rem]"
    >
      {label && (
        <label className="font-medium" htmlFor={children.props.id}>
          {label}
        </label>
      )}
      {children}
      {error && <span className="text-[1.4rem] text-red-700">{error}</span>}
    </motion.div>
  );
}

export default FormRow;
