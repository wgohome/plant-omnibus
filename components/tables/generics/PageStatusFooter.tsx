import React from "react"

interface IProps {
  pageIndex: number  // 0-indexed
  pageLength: number
  loading?: boolean  // Only for virtual tables
}

const PageStatusFooter: React.FC<IProps> = ({ pageIndex, pageLength, loading }) => {
  return (
    <div className="px-6 py-2">
      {loading ? (
        <span>Loading ...</span>
      ) : (
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1}
          </strong>{' '}
          of {pageLength}
        </span>
      )}
    </div>
  )
}

export default PageStatusFooter
