import React from "react"
import { useAsyncDebounce } from "react-table"

/*
  For use as global filter input for react-table
*/

interface IProps {
  globalFilter: string
  setGlobalFilter
}

const GlobalFilterBox: React.FC<IProps> = ({ globalFilter, setGlobalFilter }) => {
  const [ queryValue, setQueryValue ] = React.useState(globalFilter)

  const handleChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 1000)

  return (
    <span>
      <input
        type="text"
        className="outline-none p-3 w-full rounded-full shadow border border-stone-300 focus:ring ring-plb-green ring-offset-1 focus:border-green-plb"
        value={queryValue || ""}
        onChange={e =>{
          setQueryValue(e.target.value)
          handleChange(e.target.value)
        }}
        placeholder="What are you searching for?"
      />
    </span>
  )
}

export default GlobalFilterBox
