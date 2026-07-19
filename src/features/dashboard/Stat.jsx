import { motion } from "motion/react";

const colors = {
  blue: "bg-blue-100 text-blue-700",
  green: "bg-green-100 text-green-700",
  indigo: "bg-indigo-100 text-indigo-700",
  yellow: "bg-yellow-100 text-yellow-700",
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1 },
};

function Stat({ icon, title, value, color }) {
  return (
    <motion.div
      variants={itemVariants}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="grid grid-cols-[6.4rem_1fr] grid-rows-2 items-center gap-x-[1.6rem] gap-y-[0.4rem] rounded-md border border-grey-100 bg-grey-0 p-[1.6rem]"
    >
      <div
        className={`row-span-full flex aspect-square items-center justify-center rounded-full [&>svg]:h-[3.2rem] [&>svg]:w-[3.2rem] ${colors[color] ?? colors.blue}`}
      >
        {icon}
      </div>
      <h5 className="self-end text-[1.2rem] font-semibold tracking-[0.4px] text-grey-500 uppercase">
        {title}
      </h5>
      <p className="text-[2.4rem] leading-none font-medium">{value}</p>
    </motion.div>
  );
}

export default Stat;
