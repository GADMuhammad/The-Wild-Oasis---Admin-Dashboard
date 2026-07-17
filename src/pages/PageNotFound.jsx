import { useMoveBack } from "../hooks/useMoveBack";
import Heading from "../ui/Heading";

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <main className="flex h-screen items-center justify-center bg-grey-50 p-[4.8rem]">
      <div className="flex-[0_1_96rem] rounded-md border border-grey-100 bg-grey-0 p-[4.8rem] text-center [&>h1]:mb-[3.2rem]">
        <Heading as="h1">
          The page you are looking for could not be found 😢
        </Heading>
        <button onClick={moveBack} size="large">
          &larr; Go back
        </button>
      </div>
    </main>
  );
}

export default PageNotFound;
