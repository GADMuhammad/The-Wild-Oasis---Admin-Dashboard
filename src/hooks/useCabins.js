import { useQuery } from "@tanstack/react-query";
import { getCabins as queryFn } from "../services/apiCabins";

export default function useCabins() {
  const query = useQuery({ queryKey: ["cabins"], queryFn });
  const { isPending, data: cabins, error } = query;
  if (error) throw new Error(error.message);
  return { isPending, cabins };
}
