import { createContext, useContext } from "react";

const TableContext = createContext(undefined);
function useTableContext() {
  const context = useContext(TableContext);
  if (!context) throw new Error("No TableContext.");
  return context;
}

export default function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div
        role="table"
        className="w-full overflow-hidden rounded-md border border-grey-200 bg-grey-0 text-[1.4rem]"
      >
        {children}
      </div>
    </TableContext.Provider>
  );
}

Table.Header = function TableHeader({ children }) {
  const { columns } = useTableContext();
  return (
    <header
      role="row"
      style={{ gridTemplateColumns: columns }}
      className="grid items-center gap-x-[2.4rem] border-b border-grey-100 bg-grey-50 px-[2.4rem] py-[1.6rem] font-semibold tracking-[0.4px] text-grey-600 uppercase"
    >
      {children}
    </header>
  );
};

Table.Row = function TableRow({ children }) {
  const { columns } = useTableContext();
  return (
    <div
      role="row"
      style={{ gridTemplateColumns: columns }}
      className="grid items-center gap-x-[2.4rem] px-[2.4rem] py-[1.2rem] [&:not(:last-child)]:border-b [&:not(:last-child)]:border-grey-100"
    >
      {children}
    </div>
  );
};

Table.Body = function ({ data, render }) {
  if (!data?.length)
    return (
      <p className="m-[2.4rem] text-center text-[1.6rem] font-medium">
        No data to show at the moment.
      </p>
    );
  return <section className="my-[0.4rem]">{data?.map(render)}</section>;
};

Table.Footer = function TableFooter({ children }) {
  return (
    <footer className="flex justify-center bg-grey-50 p-[1.2rem] empty:hidden">
      {children}
    </footer>
  );
};
