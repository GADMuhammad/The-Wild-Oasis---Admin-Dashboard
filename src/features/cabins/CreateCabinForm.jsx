import Form from "../../ui/Form";
import Button from "../../ui/Button";
import { FormProvider } from "react-hook-form";
import CabinFormDetails from "./CabinFormDetails";
import useCreateCabin from "./useCreateCabin";

function CreateCabinForm({ cabinToEdit, onCloseModal }) {
  const { methods, handleSubmit, createCabinFn, onError, isCreating } =
    useCreateCabin(cabinToEdit, onCloseModal);

  const isToEditSession = !!cabinToEdit?.id;

  return (
    <FormProvider {...methods}>
      <Form
        onSubmit={handleSubmit(createCabinFn, onError)}
        type={onCloseModal ? "modal" : "regular"}
      >
        <CabinFormDetails isToEditSession={isToEditSession} />

        <div className="grid grid-cols-[24rem_1fr_1.2fr] items-center gap-[2.4rem] border-b border-gray-100 px-0 py-[1.2rem] first:pt-0 last:border-b-0 last:pb-0 has-[button]:flex has-[button]:justify-end has-[button]:gap-[1.2rem]">
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
        </div>
      </Form>
    </FormProvider>
  );
}

export default CreateCabinForm;
