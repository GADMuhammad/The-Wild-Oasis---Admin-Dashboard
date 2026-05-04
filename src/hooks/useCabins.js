import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../services/apiCabins";

export default function useCabins() {
  const query = useQuery({ queryKey: ["cabins"], queryFn: getCabins });
  const { isPending, data: cabins, error } = query;

  return { isPending, cabins };
}
