const types = {
  horizontal: "justify-between items-center",
  vertical: "flex-col",
};

export default function Row({ type = "vertical", children }) {
  return (
    <div className={`flex gap-[1.6rem] ${types[type]}`}>{children}</div>
  );
}
