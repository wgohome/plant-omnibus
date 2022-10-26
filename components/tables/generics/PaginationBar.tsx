import React from "react"

const PaginationBar: React.FC = ({
  pageIndex,  // This is a state from useTable hook
  pageSize,  // This is a state from useTable hook
  pageCount,
  canPreviousPage,
  previousPage,
  canNextPage,
  nextPage,
  gotoPage,
  setPageSize,
}) => {
  return (
    // <nav className="flex justify-center my-3">
      <div className="flex text-center drop-shadow">
        <button
          className="py-3 px-5 pl-6 text-gray-500 bg-white rounded-l-full border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          First
        </button>
        <button
          className="py-3 px-5 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {'<'}
        </button>
        <div
          className="grow py-3 px-5 text-gray-500 bg-white border border-gray-300"
        >
          Go to{" "}
          <input
            className="text-center border border-stone-300"
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '50px' }}
          />
        </div>
        <div
          className="grow py-3 px-5 text-gray-500 bg-white border border-gray-300"
        >
          <select
            className="border border-stone-300"
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        <button
          className="py-3 px-5 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {'>'}
        </button>
        <button
          className="py-3 px-5 pr-6 text-gray-500 bg-white rounded-r-full border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          Last
        </button>
      </div>
    // </nav>
  )
}

export default PaginationBar
