import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

export default function CabinTable() {
  const query = useQuery({ queryKey: ["cabins"], queryFn: getCabins });
  const { isPending, data: cabins, error } = query;

  if (isPending) return <Spinner />;
  return (
    <Table role="table">
      <header
        role="row"
        className="grid-cols-main-layout bg-grey-50 font-new grid items-center justify-between gap-x-[2.4rem] border-gray-50 px-16 py-[1.4rem] tracking-[0.4px] text-gray-600 uppercase"
      >
        <div>IMAGE</div>
        <div>cabin</div>
        <div>capacity</div>
        <div>price</div>
        <div>discount</div>
        <div>area</div>
      </header>
      {cabins.map((cabin) => (
        <CabinRow key={cabin.id} cabin={cabin} />
      ))}
    </Table>
  );
}
