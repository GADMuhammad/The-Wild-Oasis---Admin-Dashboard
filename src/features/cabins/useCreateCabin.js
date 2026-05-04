import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

export default function useCreateCabin(cabin = {}, onCloseModal) {
  const { id, ...valuesToEdit } = cabin;

  const methods = useForm({ defaultValues: id ? valuesToEdit : {} });
  const { handleSubmit, reset } = methods;

  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate } = useMutation({
    mutationFn: ({ newCabinData, id }) => createOrEditCabin(newCabinData, id),
    onSuccess: function () {
      toast.success(`New cabin successfully ${id ? "edited" : "added"}.`);
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      onCloseModal?.();
      reset();
    },
    onError: (error) => toast.error(error.message),
  });

  function createCabinFn(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    mutate({ newCabinData: { ...data, image }, id });
  }

  function onError(errors) {
    toast.error(Object.values(errors)[0].message);
  }

  return {
    methods,
    handleSubmit,
    createCabinFn,
    onError,
    isCreating,
  };
}
