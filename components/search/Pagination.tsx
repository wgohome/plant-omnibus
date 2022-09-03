import React from "react"

interface IPaginationProps {
  pageIndex: number,
  pageTotal: number,
  changeSearchPage: (pageIndex: number) => {},
}

const Pagination: React.FC<IPaginationProps> = ({ pageIndex, pageTotal, changeSearchPage }) => {
  return (
    <nav className="">
      <div className="flex drop-shadow-md my-4">
        <button
          className="py-2 px-3 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          onClick={() => changeSearchPage(0)}
          disabled={pageIndex === 0}
        >
          First
        </button>
        <button
          className="py-2 px-5 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          onClick={() => changeSearchPage(pageIndex - 1)}
          disabled={pageIndex <= 0}
        >
          {'<'}
        </button>
        <div
            className="grow text-center py-2 px-5 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          >
            Page{" "}
            <input
              className="w-12 text-center border border-stone-300"
              type="number"
              defaultValue={pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                changeSearchPage(page)
                // console.log(`change to ${page}`)
                // TODO: some sort of submit event
              }}
            />
            {" "}of {pageTotal}
          </div>
        <button
          className="py-2 px-5 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          onClick={() => changeSearchPage(pageIndex + 1)}
          disabled={pageIndex >= pageTotal - 1}
        >
          {'>'}
        </button>
        <button
          className="py-2 px-5 text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          onClick={() => changeSearchPage(pageTotal - 1)}
          disabled={pageIndex >= pageTotal - 1}
        >
          Last
        </button>
      </div>
    </nav>
  )
}

export default Pagination
