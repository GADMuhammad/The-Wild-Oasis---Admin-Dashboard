import { useMutation } from "@tanstack/react-query";
import { signUp as signUpAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export default function useSignUp() {
  const { mutate: signUp, isPending } = useMutation({
    mutationKey: "signUp",
    mutationFn: signUpAPI,
    onSuccess: function () {
      toast.success(
        "Account's successfully created. Please, verify the new account from the user's email address.",
      );
    },
  });
  return { signUp, isPending };
}
