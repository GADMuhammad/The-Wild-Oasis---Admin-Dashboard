import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

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

function Settings() {
  return (
    <Row variants={containerVariants} initial="hidden" animate="show">
      <Heading as="h1" variants={itemVariants} transition={springTransition}>
        Update hotel settings
      </Heading>
      <UpdateSettingsForm />
    </Row>
  );
}

export default Settings;
