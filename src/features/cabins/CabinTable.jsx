import useCabins from "../../hooks/useCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";

const headings = ["image", "cabin", "capacity", "area", "price", "discount"];

export default function CabinTable() {
  const { isPending, cabins } = useCabins();
  if (isPending) return <Spinner />;
  return (
    <div
      className="border-grey-200 bg-gray-0 overflow-hidden rounded-md border border-solid text-[1.4rem]"
      role="table"
    >
      <header
        role="row"
        className="grid-cols-main-layout bg-grey-50 font-new grid gap-x-[2.4rem] border-gray-50 px-16 py-[1.4rem] text-center tracking-[0.4px] text-gray-600 uppercase"
      >
        {headings.map((heading) => (
          <div key={heading}>{heading}</div>
        ))}
      </header>
      {cabins.map((cabin) => (
        <CabinRow key={cabin.id} cabin={cabin} />
      ))}
    </div>
  );
}
