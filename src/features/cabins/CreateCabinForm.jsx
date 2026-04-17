import Form from "../../ui/Form";
import Button from "../../ui/Button";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import CabinFormDetails from "./CabinFormDetails";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editID, ...valuesToEdit } = cabinToEdit;
  const isToEditSession = !!editID;

  const methods = useForm({
    defaultValues: isToEditSession ? valuesToEdit : {},
  });
  const { handleSubmit, reset } = methods;
  const queryClient = useQueryClient();

  const { isPending: isLoading, mutate } = useMutation({
    mutationFn: ({ newCabinData, id }) => createOrEditCabin(newCabinData, id),
    onSuccess: function () {
      toast.success(
        `New cabin successfully ${isToEditSession ? "edited" : "added"}.`,
      );
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (error) => toast.error(error.message),
  });

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    mutate({ newCabinData: { ...data, image }, id: editID });
  }

  function onError(errors) {
    toast.error(Object.values(errors)[0].message);
  }

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <CabinFormDetails isToEditSession={isToEditSession} />

        <div className="grid grid-cols-[24rem_1fr_1.2fr] items-center gap-[2.4rem] border-b border-gray-100 px-0 py-[1.2rem] first:pt-0 last:border-b-0 last:pb-0 has-[button]:flex has-[button]:justify-end has-[button]:gap-[1.2rem]">
          {/* type is an HTML attribute! */}
          <Button
            type="reset"
            variation="secondary"
            // onClick={() => setShowForm(false)}
          >
            Cancel
          </Button>
          <Button disabled={isLoading}>
            {isToEditSession ? "Edit" : "Create new"} cabin
          </Button>
        </div>
      </Form>
    </FormProvider>
  );
}

export default CreateCabinForm;
