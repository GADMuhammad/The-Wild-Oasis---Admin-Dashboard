import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinFn } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinFn,
    onSuccess: function () {
      toast.success("cabin successfully deleted.");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isDeleting, deleteCabin };
}
