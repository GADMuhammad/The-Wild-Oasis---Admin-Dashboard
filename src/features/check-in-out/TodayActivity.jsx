import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import useTodayActivity from "../dashboard/useTodayActivity";
import Searching from "../../ui/Searching";
import TodayItem from "./TodayItem";
import DashboardBox from "../dashboard/DashboardBox";

function TodayActivity() {
  const { activities, isPending } = useTodayActivity();

  return (
    <DashboardBox className="col-span-2 pt-[2.4rem]">
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>

      {isPending ? (
        <Searching />
      ) : activities.length ? (
        <ul className="overflow-y-scroll overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:w-0!">
          {activities?.map((activity) => (
            <TodayItem key={activity.id} activity={activity}>
              {activity}
            </TodayItem>
          ))}
        </ul>
      ) : (
        <p className="mt-[0.8rem] text-center text-[1.8rem] font-medium">
          No Activity Today ...
        </p>
      )}
    </DashboardBox>
  );
}

export default TodayActivity;
