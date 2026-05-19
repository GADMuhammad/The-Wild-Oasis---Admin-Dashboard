import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";
import { dashboardFilterOptions } from "./DashboardFilter";

export default function useRecentDays() {
  const [searchParams] = useSearchParams();
  const numberOfDays =
    +searchParams.get("last") || +dashboardFilterOptions[0].value;
  const queryDate = subDays(new Date(), numberOfDays).toISOString();

  const { data: stays, isPending } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", numberOfDays],
  });

  const confirmedStays =
    stays?.filter(({ status }) =>
      ["checked-in", "checked-out"].includes(status),
    ) ?? [];

  return { confirmedStays, stays, isPending };
}
