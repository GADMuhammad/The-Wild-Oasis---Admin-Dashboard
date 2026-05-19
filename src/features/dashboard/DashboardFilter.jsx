import FilterDashboard from "../../ui/FilterDashboard";

export const dashboardFilterOptions = [
  { value: 15, label: "Last 15 days" },
  { value: 45, label: "Last 45 days" },
  { value: 90, label: "Last 90 days" },
];

function DashboardFilter() {
  return (
    <FilterDashboard filterField="last" options={dashboardFilterOptions} />
  );
}

export default DashboardFilter;
