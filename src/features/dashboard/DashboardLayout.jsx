import styled from "styled-components";
import useRecentBookings from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import useRecentDays from "./useRecentDays";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
import useCabins from "../../hooks/useCabins";
import SalesChart from "./SalesChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { bookings, isPending: isLoadingBookings } = useRecentBookings();
  const { cabins, isPending: isLoadingCabins } = useCabins();
  const {
    confirmedStays,
    stays,
    isPending: isLoadingDays,
    numberOfDays,
  } = useRecentDays();

  const checkIns = +confirmedStays?.length;
  const numberOfBookings = +bookings?.length;

  const totalSales = +confirmedStays?.reduce(
    (acc, cur) => cur.totalPrice + acc,
    0,
  );

  const totalNights = +confirmedStays?.reduce(
    (acc, cur) => acc + cur.numNights,
    0,
  );

  const capacity = numberOfDays * cabins?.length;

  const occupation =
    capacity > 0 ? `${((totalNights / capacity) * 100).toFixed(2)}%` : "0%";

  if (isLoadingBookings || isLoadingDays || isLoadingCabins) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="Bookings"
        value={numberOfBookings}
        color="blue"
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title="sales"
        value={formatCurrency(totalSales)}
        color="green"
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title="Check-ins"
        value={checkIns}
        color="indigo"
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title="occupancy rate"
        value={occupation}
        color="yellow"
      />
      <SalesChart />
    </StyledDashboardLayout>
  );
}
