const colors = {
  blue: "text-blue-700 bg-blue-100",
  green: "text-green-700 bg-green-100",
  silver: "text-grey-700 bg-grey-200",
};

export default function Tag({ type = "silver", children }) {
  return (
    <span
      className={`w-fit rounded-full px-[1.2rem] py-[0.4rem] text-[1.1rem] font-semibold uppercase ${colors[type] ?? colors.silver}`}
    >
      {children}
    </span>
  );
}
