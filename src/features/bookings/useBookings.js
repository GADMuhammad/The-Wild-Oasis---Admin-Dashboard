import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export default function useBookings() {
  const [searchParams] = useSearchParams();
  const bookingsFilterValue = searchParams.get("status");

  const filter =
    !bookingsFilterValue || bookingsFilterValue === "all-bookings"
      ? null
      : { field: "status", value: bookingsFilterValue, method: "eq" };

  const sortByValue = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByValue.split("-");
  const sortBy = { field, direction };

  const query = useQuery({
    queryKey: ["bookings", bookingsFilterValue, sortBy],
    queryFn: () => getBookings(filter, sortBy),
  });
  const { isPending, data: bookings, error } = query;
  return { isPending, bookings };
}
