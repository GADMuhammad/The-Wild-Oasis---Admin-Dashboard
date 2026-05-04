import useCabins from "../../hooks/useCabins";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";

const headings = ["image", "cabin", "capacity", "area", "price", "discount"];

export default function CabinTable() {
  const { isPending, cabins } = useCabins();

  if (isPending) return <Spinner />;
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
        <Table.Body data={cabins} />
      </Table>
    </Menus>
  );
}
