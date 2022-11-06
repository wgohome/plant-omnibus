import React from "react"
import { useAsyncDebounce } from "react-table"

/*
  For use as global filter input for react-table
*/

interface IProps {
  globalFilter: string
  setGlobalFilter: (filterValue: string | undefined) => void
  placeholder?: string
  autofocus?: boolean
}

const GlobalFilterBox: React.FC<IProps> = ({
  globalFilter,
  setGlobalFilter,
  placeholder = "What are you searching for?",
  autofocus = true,
}) => {
  const [ queryValue, setQueryValue ] = React.useState(globalFilter)

  const handleChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 1000)

  return (
    <div className="my-3">
      <input
        type="text"
        className="outline-none p-3 w-full rounded-full shadow border border-stone-300 focus:ring focus:ring-1 focus:ring-plb-green focus:border-plb-green"
        value={queryValue || ""}
        onChange={e =>{
          setQueryValue(e.target.value)
          handleChange(e.target.value)
        }}
        placeholder={placeholder}
        autoFocus={autofocus}
      />
    </div>
  )
}

export default GlobalFilterBox
