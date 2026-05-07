import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
const statusFilterOptions = [
  "all-bookings",
  "unconfirmed",
  "checked-out",
  "checked-in",
];
const sortOptions = [
  { value: "startDate-desc", label: "Sort by date (recent first)" },
  { value: "startDate-asc", label: "Sort by date (earlier first)" },
  { value: "totalPrice-desc", label: "Sort by amount (high first)" },
  { value: "totalPrice-asc", label: "Sort by amount (low first)" },
];

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter filterField="status" options={statusFilterOptions} />
      <SortBy options={sortOptions} />
    </TableOperations>
  );
}

export default BookingTableOperations;
