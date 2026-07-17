export default function DashboardBox({ className = "", children }) {
  return (
    <div
      className={`flex flex-col gap-[2.4rem] rounded-md border border-grey-100 bg-grey-0 p-[3.2rem] ${className}`}
    >
      {children}
    </div>
  );
}
