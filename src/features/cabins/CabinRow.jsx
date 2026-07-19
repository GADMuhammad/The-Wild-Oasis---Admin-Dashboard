import { useState } from "react";
import { motion } from "motion/react";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

export default function CabinRow({ cabin }) {
  const { id: cabinID, ...cabinInfo } = cabin;
  const {
    airConditioning,
    area,
    discount,
    image: imgURL,
    maxCapacity,
    name,
    numberOfRooms,
    regularPrice,
  } = cabinInfo;

  const [imageLoaded, setImageLoaded] = useState(false);
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { createCabinFn, isCreating } = useCreateCabin(cabinInfo);

  function handleDuplicate() {
    createCabinFn({ ...cabinInfo, name: `${name}(copy)` });
  }

  return (
    <Table.Row role="row">
      <div className="relative aspect-3/2 w-[6.4rem]">
        {!imageLoaded && (
          <div className="bg-grey-100 absolute inset-0 origin-center translate-x-1.75 scale-150 animate-pulse" />
        )}
        <motion.img
          src={imgURL}
          onLoad={() => setImageLoaded(true)}
          initial={false}
          animate={imageLoaded ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="block aspect-3/2 w-[6.4rem] origin-center translate-x-1.75 scale-150 object-cover object-center"
        />
      </div>
      <div className="font-sono text-grey-600 text-[1.6rem] font-semibold">
        {name}
      </div>
      <p>{`for ${maxCapacity} guests, ${numberOfRooms} rooms${airConditioning ? " with airConditioning." : "."}`}</p>
      <p>{area}m²</p>
      <div className="font-sono font-semibold">
        {formatCurrency(regularPrice)}
      </div>
      {discount ? (
        <div className="font-sono font-medium text-green-700">
          {formatCurrency(discount)}
        </div>
      ) : (
        <span>&mdash;</span>
      )}

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinID} />

            <Menus.List id={cabinID}>
              <Menus.Button
                disabled={isCreating}
                icon={<HiSquare2Stack />}
                onClick={handleDuplicate}
              >
                Duplicate
              </Menus.Button>

              <Modal.Open opensWindowName="edit">
                <Menus.Button disabled={isCreating} icon={<HiPencil />}>
                  Edit
                </Menus.Button>
              </Modal.Open>

              <Modal.Open opensWindowName="delete">
                <Menus.Button disabled={isCreating} icon={<HiTrash />}>
                  Delete
                </Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="cabins"
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabinID)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}
