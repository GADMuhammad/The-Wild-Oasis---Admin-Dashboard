import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { dashboardFilterOptions } from "./DashboardFilter";

export default function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const numberOfDays =
    +searchParams.get("last") || dashboardFilterOptions[0].value;
  const queryDate = subDays(new Date(), numberOfDays).toISOString();

  const { data: bookings, isPending } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", numberOfDays],
  });

  return { bookings, isPending };
}
