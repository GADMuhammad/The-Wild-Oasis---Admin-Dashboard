import styled from "styled-components";
import useRecentBookings from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import useRecentDays from "./useRecentDays";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { bookings, isPending: isLoadingBookings } = useRecentBookings();
  const { stays, isPending: isLoadingDays } = useRecentDays();

  if (isLoadingBookings || isLoadingDays) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <div>Statistics</div>
      <div>Today's activity</div>
      <div>Chart stay durations</div>
      <div>Cart of sales</div>
    </StyledDashboardLayout>
  );
}
