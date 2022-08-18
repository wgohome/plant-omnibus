import React from "react"
import debounce from "lodash.debounce"

const SearchBox = ({
  initialValue,
  onValueUpdate, // function to update state in parent component
  placeholder,
}) => {
  const [ localValue, setLocalValue ] = React.useState(initialValue)
  const handleValueChange = React.useCallback(
    debounce(query => {
      console.log(query)
      // onValueUpdate(query)
    }, 500),
    [],
  )

  return (
    <div>
      <input
        className="outline-none p-4 w-full rounded-xl shadow border border-stone-300 focus:ring ring-plb-green ring-offset-1 focus:border-green-plb"
        value={localValue || ""}
        onChange={(e) => {
          setLocalValue(e.target.value)  // For local state in this component
          handleValueChange(e.target.value)  // For external state and searching db
        }}
        placeholder={placeholder}
        type="search"
      />
    </div>
  )
}

export default SearchBox
