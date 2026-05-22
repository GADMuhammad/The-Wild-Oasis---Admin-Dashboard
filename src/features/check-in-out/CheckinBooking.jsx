import styled from "styled-components";
import BookingDataBox from "../bookings/BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import useCheckIn from "./useCheckIn";
import useSettings from "../settings/useSettings";
import Spinner from "../../ui/Spinner";

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
  const { isPending: isLoadingBooking, booking = {} } = useBooking();
  const { isPending: isLoadingSettings, settings } = useSettings();

  const {
    id: bookingId,
    guests: { firstName, lastName } = {},
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    isPaid,
  } = booking;
  const optionalBreakfastPrice =
    settings?.breakfastPrice * numGuests * numNights;

  const [confirmPaid, setConfirmPaid] = useState(isPaid);
  const [isBreakfastAdded, setIsBreakfastAdded] = useState(hasBreakfast);

  useEffect(() => {
    setConfirmPaid(isPaid);
    setIsBreakfastAdded(hasBreakfast);
  }, [isPaid, setConfirmPaid, hasBreakfast]);

  if (isLoadingBooking || isLoadingSettings) return <Spinner />;

  function handleCheckIn() {
    if (!confirmPaid) return;
    if (isBreakfastAdded)
      checkIn({
        bookingId,
        breakfast: isBreakfastAdded
          ? {
              hasBreakfast: true,
              extrasPrice: optionalBreakfastPrice,
              totalPrice: totalPrice + optionalBreakfastPrice,
            }
          : undefined,
      });
  }

  function addingBreakfast() {
    setIsBreakfastAdded((prev) => !prev);
    setConfirmPaid(false);
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={isBreakfastAdded}
            onChange={addingBreakfast}
          >
            {firstName} {lastName} Wants to add a breakfast for{" "}
            {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          id={bookingId}
          checked={confirmPaid}
          disabled={confirmPaid || isCheckingIn} // No UNDO
          onChange={() => setConfirmPaid((prev) => !prev)}
        >
          Confirm that {firstName} {lastName} has paid the total amount{" "}
          {isBreakfastAdded
            ? `${formatCurrency(totalPrice + optionalBreakfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastPrice)})`
            : formatCurrency(totalPrice)}
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
