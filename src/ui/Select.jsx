export default function Select({ options, value, type, ...props }) {
  return (
    <select
      value={value}
      className={`rounded-sm border bg-grey-0 px-[1.2rem] py-[0.8rem] text-[1.4rem] font-medium shadow-sm ${
        type === "white" ? "border-grey-100" : "border-grey-300"
      }`}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
