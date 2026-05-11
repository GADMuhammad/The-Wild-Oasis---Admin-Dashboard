import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";
// import { useLocation, useNavigate } from "react-router-dom";

export default function useDeleteBooking() {
  const queryClient = useQueryClient();
  // const navigate = useNavigate();
  // const location = useLocation();

  const { mutate: deleteBooking, isPending: isDeletingBooking } = useMutation({
    mutationFn: (bookingId) => deleteBookingApi(bookingId),
    onSuccess: () => {
      toast.success(`Booking is successfully deleted.`);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      // location.pathname !== "/bookings" && navigate("/bookings");
    },
    onError: (err) =>
      toast.error(err.message || "There was an error deleting the booking."),
  });

  return { deleteBooking, isDeletingBooking };
}
