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
  const currentPage = searchParams.get("page") ?? 1;

  const query = useQuery({
    queryKey: ["bookings", bookingsFilterValue, sortBy, +currentPage],
    queryFn: () => getBookings(filter, sortBy, +currentPage),
  });
  const { isPending, data: { bookings, elementsCount } = {}, error } = query;
  return { isPending, bookings, elementsCount };
}
