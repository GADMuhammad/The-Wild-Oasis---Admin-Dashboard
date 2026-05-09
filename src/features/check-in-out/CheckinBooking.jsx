import styled from "styled-components";
import BookingDataBox from "../bookings/BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import useCheckIn from "./useCheckIn";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckInBooking() {
  const moveBack = useMoveBack();
  const { checkIn, isCheckingIn } = useCheckIn();
  const { isPending, booking = {} } = useBooking();
  const [confirmPaid, setConfirmPaid] = useState(booking?.isPaid);

  useEffect(
    () => setConfirmPaid(booking.isPaid),
    [booking?.isPaid, setConfirmPaid],
  );

  if (isPending) return <Spinner />;
  const {
    id: bookingId,
    guests: { firstName, lastName },
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  function handleCheckIn() {
    if (!confirmPaid) return;
    checkIn(bookingId);
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          id={bookingId}
          checked={confirmPaid}
          disabled={confirmPaid || isCheckingIn} // No UNDO
          onChange={() => setConfirmPaid((prev) => !prev)}
        >
          Confirm that {firstName} {lastName} has paid the total amount{" "}
          {formatCurrency(totalPrice)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckIn} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckInBooking;
