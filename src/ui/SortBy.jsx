import { useSearchParams } from "react-router-dom";
import Select from "./Select";

export default function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchByValue = searchParams.get("sortBy") || options[0];

  function handleChange(event) {
    searchParams.get("page") && searchParams.set("page", 1);
    searchParams.set("sortBy", event.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      type="white"
      onChange={handleChange}
      value={searchByValue}
    />
  );
}
