import { motion } from "motion/react";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const springTransition = { type: "spring", stiffness: 260, damping: 24 };

function Account() {
  return (
    <motion.div
      className="flex flex-col gap-[3.2rem]"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <Heading as="h1" variants={itemVariants} transition={springTransition}>
        Update your account
      </Heading>

      <Row variants={itemVariants} transition={springTransition}>
        <Heading as="h3">Update user data</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row variants={itemVariants} transition={springTransition}>
        <Heading as="h3">Update password</Heading>
        <UpdatePasswordForm />
      </Row>
    </motion.div>
  );
}

export default Account;
