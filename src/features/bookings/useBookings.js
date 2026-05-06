import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

export default function useBookings() {
  const query = useQuery({ queryKey: ["bookings"], queryFn: getBookings });
  const { isPending, data: bookings, error } = query;
  return { isPending, bookings };
}
