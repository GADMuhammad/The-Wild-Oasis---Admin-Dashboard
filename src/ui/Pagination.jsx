import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";

const buttonBase =
  "flex items-center justify-center gap-[0.4rem] rounded-sm px-[1.2rem] py-[0.6rem] text-[1.4rem] font-medium transition-all duration-300 has-[span:last-child]:pl-[0.4rem] has-[span:first-child]:pr-[0.4rem] [&>svg]:h-[1.8rem] [&>svg]:w-[1.8rem] hover:not-disabled:bg-brand-600 hover:not-disabled:text-brand-50";

export default function Pagination({ elementsCount }) {
  if (elementsCount <= PAGE_SIZE) return null;
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page") ?? 1;
  const pagesCount = Math.ceil(elementsCount / PAGE_SIZE);

  function changePageParams(newValue) {
    searchParams.set("page", newValue);
    setSearchParams(searchParams);
  }

  function goToNextPage() {
    if (+currentPage === +pagesCount) return;
    changePageParams(+currentPage + 1);
  }

  function goToPreviousPage() {
    if (+currentPage === 1) return;
    changePageParams(+currentPage - 1);
  }
  return (
    <div className="flex w-full items-center justify-between">
      <p className="ml-[0.8rem] text-[1.6rem] [&>span]:font-semibold">
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
        <span>
          {+currentPage === pagesCount
            ? elementsCount
            : currentPage * PAGE_SIZE}
        </span>{" "}
        of <span>{elementsCount}</span> results
      </p>

      <div className="flex gap-[0.6rem]">
        <button
          onClick={goToPreviousPage}
          disabled={+currentPage === 1}
          className={`${buttonBase} bg-grey-50`}
        >
          <HiChevronDoubleLeft />
          <span>Previous</span>
        </button>

        <button
          onClick={goToNextPage}
          disabled={+currentPage === +pagesCount}
          className={`${buttonBase} bg-grey-50`}
        >
          <span>Next</span>
          <HiChevronDoubleRight />
        </button>
      </div>
    </div>
  );
}
