import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

export default function AddCabin() {
  return (
    <Modal>
      <Modal.Open opensWindowName="cabin-form">
        <Button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          Add new Cabin
        </Button>
      </Modal.Open>

      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}
