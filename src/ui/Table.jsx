import { createContext, useContext } from "react";
import { motion } from "motion/react";

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
        className="border-grey-200 bg-grey-0 w-full overflow-hidden rounded-md border text-[1.4rem]"
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
      className="border-grey-100 bg-grey-50 text-grey-600 grid items-center gap-x-[2.4rem] border-b px-[2.4rem] py-[1.6rem] font-semibold tracking-[0.4px] uppercase"
    >
      {children}
    </header>
  );
};

const rowVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

Table.Row = function TableRow({ children }) {
  const { columns } = useTableContext();
  return (
    <motion.div
      role="row"
      variants={rowVariants}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      style={{ gridTemplateColumns: columns }}
      className="not-last-child:border-grey-100 grid items-center gap-x-[2.4rem] px-[2.4rem] py-[1.2rem] not-last:border-b"
    >
      {children}
    </motion.div>
  );
};

const bodyVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
};

Table.Body = function ({ data, render }) {
  if (!data?.length)
    return (
      <p className="m-[2.4rem] text-center text-[1.6rem] font-medium">
        No data to show at the moment.
      </p>
    );
  return (
    <motion.section
      className="my-[0.4rem]"
      variants={bodyVariants}
      initial="hidden"
      animate="show"
    >
      {data?.map(render)}
    </motion.section>
  );
};

Table.Footer = function TableFooter({ children }) {
  return (
    <footer className="bg-grey-50 flex justify-center p-[1.2rem] empty:hidden">
      {children}
    </footer>
  );
};
