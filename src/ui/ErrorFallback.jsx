import Heading from "./Heading";
import Button from "./Button";

export default function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <main className="flex h-screen items-center justify-center bg-grey-50 p-[4.8rem]">
      <div className="flex-[0_1_96rem] rounded-md border border-grey-100 bg-grey-0 p-[4.8rem] text-center [&>h1]:mb-[1.6rem] [&>p]:mb-[3.2rem] [&>p]:font-sono [&>p]:text-grey-500">
        <Heading as="h1">Something went wrong 🧐.</Heading>
        <p>{error.message}</p>
        <Button size="large" onClick={resetErrorBoundary}>
          Try again.
        </Button>
      </div>
    </main>
  );
}
