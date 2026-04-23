import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin_() {
  return (
    <Modal>
      <Modal.Open>
        <Button>Add new Cabin</Button>
      </Modal.Open>

      <Modal.Window>
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

export default function AddCabin() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsModalOpen((prev) => !prev)}>
        Add new cabin
      </Button>
      {isModalOpen && (
        <Modal onCloseModal={() => setIsModalOpen(false)}>
          <CreateCabinForm onCloseModal={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
