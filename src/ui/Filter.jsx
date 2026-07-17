import { useSearchParams } from "react-router-dom";

export default function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleClick(value) {
    searchParams.get("page") && searchParams.set("page", 1);
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  }

  const currentFilter = searchParams.get(filterField) || options[0];

  return (
    <div className="flex gap-[0.4rem] rounded-sm border border-grey-100 bg-grey-0 p-[0.4rem] shadow-sm">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => handleClick(option)}
          disabled={currentFilter === option}
          className={`rounded-sm px-[0.8rem] py-[0.44rem] text-[1.4rem] font-medium transition-all duration-300 hover:not-disabled:bg-brand-600 hover:not-disabled:text-brand-50 ${
            currentFilter === option
              ? "bg-brand-600 text-brand-50"
              : "bg-grey-0"
          }`}
        >
          {option.replace("-", " ").replace(/^./, (str) => str.toUpperCase())}
        </button>
      ))}
    </div>
  );
}
