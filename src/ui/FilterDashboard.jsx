import { useSearchParams } from "react-router-dom";

export default function FilterDashboard({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleClick(value) {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  }

  const currentFilter = +searchParams.get(filterField) || options[0].value;

  return (
    <div className="flex gap-[0.4rem] rounded-sm border border-grey-100 bg-grey-0 p-[0.4rem] shadow-sm">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleClick(option.value)}
          disabled={currentFilter === option.value}
          className={`rounded-sm px-[0.8rem] py-[0.44rem] text-[1.4rem] font-medium transition-all duration-300 hover:not-disabled:bg-brand-600 hover:not-disabled:text-brand-50 ${
            currentFilter === option.value
              ? "bg-brand-600 text-brand-50"
              : "bg-grey-0"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
