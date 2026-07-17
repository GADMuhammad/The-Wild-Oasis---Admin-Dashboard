import { format, isToday } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";
import DataItem from "../../ui/DataItem";
import { Flag } from "../../ui/Flag";
import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";

// A purely presentational component
function BookingDataBox({ booking }) {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guests: {
      firstName,
      lastName,
      emailAddress,
      nationality,
      countryFlag,
      nationalID,
    },
    cabins: { name: cabinName },
  } = booking;
  const guestName = `${firstName} ${lastName}`;

  return (
    <section className="overflow-hidden rounded-md border border-grey-100 bg-grey-0">
      <header className="flex items-center justify-between bg-brand-500 px-[4rem] py-[2rem] text-[1.8rem] font-medium text-[#e0e7ff] [&_span]:ml-[4px] [&_span]:font-sono [&_span]:text-[2rem] [&>div:first-child]:flex [&>div:first-child]:items-center [&>div:first-child]:gap-[1.6rem] [&>div:first-child]:text-[1.8rem] [&>div:first-child]:font-semibold [&_svg]:h-[3.2rem] [&_svg]:w-[3.2rem]">
        <div>
          <HiOutlineHomeModern />
          <p>
            {numNights} nights in Cabin <span>{cabinName}</span>
          </p>
        </div>

        <p>
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>
      </header>

      <section className="px-[4rem] pt-[3.2rem] pb-[1.2rem]">
        <div className="mb-[1.6rem] flex items-center gap-[1.2rem] text-grey-500 [&>p:first-of-type]:font-medium [&>p:first-of-type]:text-grey-700">
          {countryFlag && (
            <Flag src={countryFlag} alt={`Flag of ${nationality}`} />
          )}
          <p>
            {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
          </p>
          <span>&bull;</span>
          <p>{emailAddress}</p>
          <span>&bull;</span>
          <p>National ID {nationalID}</p>
        </div>

        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Observations"
          >
            {observations}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label="Breakfast included?">
          {hasBreakfast ? "Yes" : "No"}
        </DataItem>

        <div
          className={`mt-[2.4rem] flex items-center justify-between rounded-sm px-[3.2rem] py-[1.6rem] [&_svg]:h-[2.4rem] [&_svg]:w-[2.4rem] [&_svg]:text-current [&>p:last-child]:text-[1.4rem] [&>p:last-child]:font-semibold [&>p:last-child]:uppercase ${
            isPaid
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
            {formatCurrency(totalPrice)}

            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                extrasPrice,
              )} breakfast)`}
          </DataItem>

          <p>{isPaid ? "Paid" : "Will pay at property"}</p>
        </div>
      </section>

      <footer className="px-[4rem] py-[1.6rem] text-right text-[1.2rem] text-grey-500">
        <p>Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}</p>
      </footer>
    </section>
  );
}

export default BookingDataBox;
