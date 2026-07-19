import { motion } from "motion/react";
import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const springTransition = { type: "spring", stiffness: 260, damping: 24 };

function NewUsers() {
  return (
    <motion.div
      className="flex flex-col gap-[3.2rem]"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <Heading as="h1" variants={itemVariants} transition={springTransition}>
        Create a new user
      </Heading>
      <SignupForm />
    </motion.div>
  );
}

export default NewUsers;
