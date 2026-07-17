import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";

export default function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity; // remember this activity is a booking.
  const { nationality, countryFlag, firstName, lastName, childrenNumber } =
    guests;

  return (
    <li className="grid grid-cols-[9rem_2rem_1fr_7rem_9rem] items-center gap-[1.2rem] border-b border-grey-100 py-[0.8rem] text-[1.4rem] first:border-t first:border-grey-100">
      {status === "unconfirmed" ? (
        <Tag type="green">Arriving</Tag>
      ) : (
        <Tag type="blue">Departing</Tag>
      )}
      <Flag src={countryFlag} alt={`Flag of ${nationality}`} />
      <div className="font-medium">
        <strong>
          {firstName} {lastName}
        </strong>{" "}
        {childrenNumber ? `with ${childrenNumber + 1} companions` : ""}
      </div>
      <div>{numNights} nights</div>

      {status === "unconfirmed" && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/checkIn/${id}`}
        >
          Check In
        </Button>
      )}

      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </li>
  );
}
