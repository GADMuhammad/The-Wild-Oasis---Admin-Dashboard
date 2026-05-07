import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import useBookings from "./useBookings";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { isPending, bookings, elementsCount } = useBookings();

  if (isPending) return <Spinner />;
  if (!bookings?.length) return <Empty resource="bookings" />;
  return (
    <Menus>
      <Table columns="0.3fr 1.3fr 1.6fr 2fr 1fr 0.8fr 2fr 3.2rem">
        {/* <Table columns="0.6fr 1fr 1fr 1fr 1fr 20rem"> */}
        <Table.Header>
          <div>Order</div>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div>Country</div>
        </Table.Header>
        <Table.Body
          data={bookings}
          render={(booking, index) => (
            <BookingRow key={booking.id} booking={booking} order={index + 1} />
          )}
        />{" "}
        <Table.Footer>
          <Pagination elementsCount={elementsCount} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
