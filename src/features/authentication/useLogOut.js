import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logOut } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export default function useLogOut() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["logOut"],
    mutationFn: logOut,
    onSuccess: function () {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });

  return { mutate, isPending };
}
