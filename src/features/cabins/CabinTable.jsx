import { useSearchParams } from "react-router-dom";
import useCabins from "../../hooks/useCabins";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";

const headings = ["image", "cabin", "capacity", "area", "price", "discount"];

export default function CabinTable() {
  const { isPending, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isPending) return <Spinner />;
  const filterValue = searchParams.get("discount") || "all";

  // FILTER
  function filterBasedOnDiscount(state) {
    organizedCabins = cabins.filter(({ discount }) => !!discount === state);
  }
  let organizedCabins;
  if (filterValue === "all") organizedCabins = cabins;
  if (filterValue === "no-discount") filterBasedOnDiscount(false);
  if (filterValue === "with-discount") filterBasedOnDiscount(true);

  // SORT
  const sortByValue = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortByValue.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  organizedCabins = organizedCabins.sort((a, b) => {
    const aValue = a[field],
      bValue = b[field];

    if (typeof aValue === "string") {
      return aValue.localeCompare(bValue) * modifier;
    }
    return (aValue - bValue) * modifier;
  });

  return (
    <Menus>
      <Table columns="0.6fr 0.8fr 1.6fr 0.6fr 0.6fr 0.6fr 0.6fr">
        <Table.Header
          role="row"
          className="grid-cols-main-layout bg-grey-50 font-new grid gap-x-[2.4rem] border-gray-50 px-16 py-[1.4rem] text-center tracking-[0.4px] text-gray-600 uppercase"
        >
          {headings.map((heading) => (
            <div key={heading}>{heading}</div>
          ))}
        </Table.Header>
        <Table.Body data={organizedCabins} />
      </Table>
    </Menus>
  );
}
