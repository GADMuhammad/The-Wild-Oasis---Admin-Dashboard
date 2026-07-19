import { motion } from "motion/react";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import { FormProvider } from "react-hook-form";
import CabinFormDetails, { formRowVariants } from "./CabinFormDetails";
import useCreateCabin from "./useCreateCabin";

const formStaggerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
};

function CreateCabinForm({ cabinToEdit, onCloseModal }) {
  const { methods, handleSubmit, createCabinFn, onError, isCreating } =
    useCreateCabin(cabinToEdit, onCloseModal);

  const isToEditSession = !!cabinToEdit?.id;

  return (
    <FormProvider {...methods}>
      <Form
        onSubmit={handleSubmit(createCabinFn, onError)}
        type={onCloseModal ? "modal" : "regular"}
        variants={formStaggerVariants}
        initial="hidden"
        animate="visible"
      >
        <CabinFormDetails isToEditSession={isToEditSession} />

        <motion.div
          variants={formRowVariants}
          className="grid grid-cols-[24rem_1fr_1.2fr] items-center gap-[2.4rem] border-b border-grey-100 px-0 py-[1.2rem] first:pt-0 last:border-b-0 last:pb-0 has-[button]:flex has-[button]:justify-end has-[button]:gap-[1.2rem]"
        >
          {/* type is an HTML attribute! */}
          <Button
            type="reset"
            variation="secondary"
            onClick={() => onCloseModal?.()}
          >
            Cancel
          </Button>

          <Button disabled={isCreating}>
            {isToEditSession ? "Edit" : "Create new"} cabin
          </Button>
        </motion.div>
      </Form>
    </FormProvider>
  );
}

export default CreateCabinForm;
