import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 0.8fr 1.6fr 0.6fr 0.6fr 0.6fr 0.6fr 0.6fr;

  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 4rem;
  letter-spacing: 0.4px;
  justify-content: space-between;
  text-align: center;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;
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

const buttonStyle =
  "w-fit rounded bg-gray-200 px-10 py-4 text-gray-950 disabled:bg-transparent";

export default function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);

  const {
    id: cabinID,
    airConditioning,
    area,
    discount,
    image: imgURL,
    maxCapacity,
    name,
    numberOfRooms,
    regularPrice,
  } = cabin;

  const { isDeleting, deleteCabin } = useDeleteCabin();

  return (
    <>
      <TableRow role="row">
        <Img src={imgURL} />
        <Cabin>{name}</Cabin>
        <p>{`for ${maxCapacity} guests, ${numberOfRooms} rooms${airConditioning ? " with airConditioning." : "."}`}</p>
        <p>{area}m²</p>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <button
          className={buttonStyle}
          onClick={() => setShowForm((show) => !show)}
        >
          Edit
        </button>
        <button
          type="button"
          role="button"
          disabled={isDeleting}
          onClick={() => deleteCabin(cabinID)}
          className={buttonStyle}
        >
          Delete
        </button>
      </TableRow>
      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}
