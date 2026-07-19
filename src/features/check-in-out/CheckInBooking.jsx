import { motion } from "motion/react";
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

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const springTransition = { type: "spring", stiffness: 260, damping: 24 };

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
    <motion.div
      className="flex flex-col gap-[3.2rem]"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants} transition={springTransition}>
        <Row type="horizontal">
          <Heading as="h1">Check in booking #{bookingId}</Heading>
          <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
        </Row>
      </motion.div>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <motion.div
          variants={itemVariants}
          transition={springTransition}
          className="rounded-md border border-grey-100 bg-grey-0 px-[4rem] py-[2.4rem]"
        >
          <Checkbox
            id="breakfast"
            checked={isBreakfastAdded}
            onChange={addingBreakfast}
          >
            {firstName} {lastName} Wants to add a breakfast for{" "}
            {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </motion.div>
      )}

      <motion.div
        variants={itemVariants}
        transition={springTransition}
        className="rounded-md border border-grey-100 bg-grey-0 px-[4rem] py-[2.4rem]"
      >
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
      </motion.div>

      <motion.div variants={itemVariants} transition={springTransition}>
        <ButtonGroup>
          <Button
            onClick={handleCheckIn}
            disabled={!confirmPaid || isCheckingIn}
          >
            Check in booking #{bookingId}
          </Button>
          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>
      </motion.div>
    </motion.div>
  );
}

export default CheckInBooking;
