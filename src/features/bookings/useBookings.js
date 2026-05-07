import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export default function useBookings() {
  const queryClient = useQueryClient();
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

  // Query:
  const queryObject = (value) => ({
    queryKey: ["bookings", bookingsFilterValue, sortBy, value],
    queryFn: () => getBookings(filter, sortBy, value),
  });

  const query = useQuery(queryObject(+currentPage));
  const { isPending, data: { bookings, elementsCount } = {} } = query;

  // PREFETCHING:
  const pagesCount = Math.ceil(elementsCount / PAGE_SIZE);
  if (currentPage < pagesCount) {
    queryClient.prefetchQuery(queryObject(+currentPage + 1));
  }
  currentPage > 1 && queryClient.prefetchQuery(queryObject(+currentPage - 1));

  return { isPending, bookings, elementsCount };
}
