import styled from "styled-components";
import { format, isToday } from "date-fns";
import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

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
  };
  const guestName = `${firstName} ${lastName}`;

  function flagUrlToEmoji(url) {
    const match = url.match(/\/([a-z]{2})\.svg$/i);
    if (!match) return null;

    const countryCode = match[1].toUpperCase();

    const emoji = [...countryCode]
      .map((char) => String.fromCodePoint(127397 + char.charCodeAt()))
      .join("");

    return emoji;
  }

  return (
    <Table.Row>
      <Cabin>{String(order).padStart(2, "0")}</Cabin>
      <Cabin>{name}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{emailAddress}</span>
      </Stacked>

      <Stacked>
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
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      {/* <Cabin>{bookingId}</Cabin> */}
      <Cabin>
        {`${nationality.split(" (")[0]} ${flagUrlToEmoji(countryFlag)}`}
      </Cabin>
    </Table.Row>
  );
}

export default BookingRow;
