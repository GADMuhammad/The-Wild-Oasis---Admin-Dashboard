import { useMutation } from "@tanstack/react-query";
import loginAPI from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginAPI(email, password),
    onSuccess: (user) => navigate("/dashboard"),
    onError: (error) => {
      console.error(error.message);
      toast.error("Provided email or password is incorrect.");
    },
  });

  return { login, isPending };
}
