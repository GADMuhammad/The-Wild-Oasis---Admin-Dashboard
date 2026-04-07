import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
// import { getCabins } from "../services/apiCabins";
import CabinTable from "../features/cabins/CabinTable";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>FILTER / SORT</p>
      </Row>

      <CabinTable />
      <Row>
        <Button onClick={() => setShowForm((prev) => !prev)}>
          Add new cabin
        </Button>
      </Row>
      {showForm && <CreateCabinForm setShowForm={setShowForm} />}
    </>
  );
}

export default Cabins;
