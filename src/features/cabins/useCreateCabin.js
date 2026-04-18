import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

export default function useCreateCabin(cabinToEdit = {}) {
  const { id: editID, ...valuesToEdit } = cabinToEdit,
    isToEditSession = !!editID;

  const methods = useForm({
    defaultValues: isToEditSession ? valuesToEdit : {},
  });
  const { handleSubmit, reset } = methods;

  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
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

  function createCabinFn(data) {
    console.log(data);
    const image = typeof data.image === "string" ? data.image : data.image[0];
    mutate({ newCabinData: { ...data, image }, id: editID });
  }

  function onError(errors) {
    toast.error(Object.values(errors)[0].message);
  }

  return {
    methods,
    handleSubmit,
    createCabinFn,
    onError,
    isPending,
    isToEditSession,
  };
}
