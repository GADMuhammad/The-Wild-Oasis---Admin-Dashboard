import { format, isToday } from "date-fns";
import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import useCheckOut from "../check-in-out/useCheckOut";
import useDeleteBooking from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const cabinClass = "font-sono text-[1.6rem] font-semibold text-grey-600";

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    cabins: { name } = {},
    guests: {
      firstName,
      lastName,
      emailAddress,
      nationality,
      countryFlag,
    } = {},
  },
  order,
}) {
  const statusToTagName = {
      unconfirmed: "blue",
      "checked-in": "green",
      "checked-out": "silver",
    },
    guestName = `${firstName} ${lastName}`;

  function flagUrlToEmoji(url) {
    const match = url.match(/\/([a-z]{2})\.svg$/i);
    if (!match) return null;

    const countryCode = match[1].toUpperCase();

    const emoji = [...countryCode]
      .map((char) => String.fromCodePoint(127397 + char.charCodeAt()))
      .join("");

    return emoji;
  }

  const navigate = useNavigate();
  const { checkOut, isCheckingOut } = useCheckOut();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();

  return (
    <Table.Row>
      <p className={cabinClass}>{String(order).padStart(2, "0")}</p>
      <p className={cabinClass}>{name}</p>
      <p className={cabinClass}>{bookingId}</p>
      <div className="flex flex-col gap-[0.2rem] [&>span:first-child]:font-medium [&>span:last-child]:text-[1.2rem] [&>span:last-child]:text-grey-500">
        <span>{guestName}</span>
        <span>{emailAddress}</span>
      </div>
      <div className="flex flex-col gap-[0.2rem] [&>span:first-child]:font-medium [&>span:last-child]:text-[1.2rem] [&>span:last-child]:text-grey-500">
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </div>
      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
      <div className="font-sono font-medium">{formatCurrency(totalPrice)}</div>
      <p className={cabinClass}>{`${nationality.split(" (")[0]} ${flagUrlToEmoji(countryFlag)}`}</p>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              See details
            </Menus.Button>

            {status === "unconfirmed" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkIn/${bookingId}`)}
              >
                Check in
              </Menus.Button>
            )}

            {status === "checked-in" && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                disabled={isCheckingOut}
                onClick={() => checkOut(bookingId)}
              >
                Check out
              </Menus.Button>
            )}

            <Modal.Open opensWindowName="delete Booking">
              <Menus.Button icon={<HiTrash />}>Delete Booking</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete Booking">
          <ConfirmDelete
            resourceName="booking"
            onConfirm={() => deleteBooking(bookingId)}
            disabled={isDeletingBooking}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
