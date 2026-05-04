import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;
const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;
const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;
const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const buttonStyle = "w-fit rounded bg-gray-200 px-10 py-4 text-gray-950 disabled:bg-transparent";

export default function CabinRow({ cabin }) {
  const { id: cabinID, ...cabinInfo } = cabin;
  const { airConditioning, area, discount, image: imgURL, maxCapacity, name, numberOfRooms, regularPrice } = cabinInfo;

  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { createCabinFn, isCreating } = useCreateCabin(cabinInfo);

  function handleDuplicate() {
    createCabinFn({ ...cabinInfo, name: `${name}(copy)` });
  }

  return (
    <Table.Row role="row">
      <Img src={imgURL} />
      <Cabin>{name}</Cabin>
      <p>{`for ${maxCapacity} guests, ${numberOfRooms} rooms${airConditioning ? " with airConditioning." : "."}`}</p>
      <p>{area}m²</p>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinID} />

            <Menus.List id={cabinID}>
              <Menus.Button disabled={isCreating} icon={<HiSquare2Stack />} onClick={handleDuplicate}>
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button disabled={isCreating} icon={<HiPencil />}>
                  Edit
                </Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button disabled={isCreating} icon={<HiTrash />}>
                  Delete
                </Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete resourceName="cabins" disabled={isDeleting} onConfirm={() => deleteCabin(cabinID)} />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}
