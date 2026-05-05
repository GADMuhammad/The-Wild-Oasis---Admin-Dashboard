import React from "react";
import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
const filters = ["all", "no-discount", "with-discount"];

export default function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter filterField="discount" options={filters} />
    </TableOperations>
  );
}
