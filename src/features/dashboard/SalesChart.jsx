import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkModeContext } from "../../context/DarkModeContext";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
  height: fit-content;
`;

export default function SalesChart({ bookings, numberOfDays }) {
  const { isDarkMode } = useDarkModeContext();

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numberOfDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings
        .filter((booking) => isSameDay(booking.created_at, date))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: bookings
        .filter((booking) => isSameDay(booking.created_at, date))
        .reduce((acc, cur) => acc + cur.extrasPrice, 0),
    };
  });

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {format(allDates[0], "MMM dd yyyy")} &mdash;{" "}
        {format(allDates.at(-1), "MMM dd yyyy")}
      </Heading>

      <ResponsiveContainer height={350} width="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <Area
            name="Total Sales"
            dataKey="totalSales"
            unit="$"
            type="monotone"
            strokeWidth={2}
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
          />
          <Area
            name="Extras Sales"
            dataKey="extrasSales"
            unit="$"
            type="monotone"
            strokeWidth={2}
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}
