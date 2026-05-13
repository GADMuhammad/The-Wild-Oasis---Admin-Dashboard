import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import useLogOut from "./useLogOut";
import SpinnerMini from "../../ui/SpinnerMini";

export default function LogOut() {
  const { mutate, isPending } = useLogOut();
  return (
    <ButtonIcon disabled={isPending} onClick={mutate}>
      {isPending ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
}
