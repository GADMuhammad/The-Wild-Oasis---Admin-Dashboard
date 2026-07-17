function DataItem({ icon, label, children }) {
  return (
    <div className="flex items-center gap-[1.6rem] py-[0.8rem]">
      <span className="flex items-center gap-[0.8rem] font-medium [&>svg]:h-[2rem] [&>svg]:w-[2rem] [&>svg]:text-brand-600">
        {icon}
        <span>{label}</span>
      </span>
      {children}
    </div>
  );
}

export default DataItem;
