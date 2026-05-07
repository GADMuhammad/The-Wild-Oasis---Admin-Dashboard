import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export default function useBookings() {
  const [searchParams] = useSearchParams();
  const bookingsFilterValue = searchParams.get("status");

  const filter =
    !bookingsFilterValue || bookingsFilterValue === "all-bookings"
      ? null
      : { field: "status", value: bookingsFilterValue };

  const query = useQuery({
    queryKey: ["bookings", bookingsFilterValue],
    queryFn: () => getBookings(filter),
  });
  const { isPending, data: bookings, error } = query;
  return { isPending, bookings };
}
