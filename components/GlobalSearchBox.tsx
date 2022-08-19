import debounce from "lodash.debounce"
import React from "react"
import Async, { useAsync } from 'react-select/async'
import AsyncSelect from 'react-select/async'

const GlobalSearchBox = ({
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

  const getUpdatedOptions = React.useCallback(
    debounce(query => {
      fetch("")
      // TODO
    }),
    [],
  )

  return (
    <div>
      <AsyncSelect
        loadOptions={}
      />
    </div>
  )
}

export default GlobalSearchBox
