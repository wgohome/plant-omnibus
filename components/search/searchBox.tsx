import React from "react"
import debounce from "lodash.debounce"

const SearchBox = ({
  initialValue, // for input field, usually blank
  placeholder, // for input field
  isLoadingResults,
  getSuggestions, // callback from parent to get array of suggestions
  submitSearchQuery, // callback from parent to get and render results
}) => {
  const [ localValue, setLocalValue ] = React.useState(initialValue)
  const [ suggestions, setSuggestions ] = React.useState([])
  const [ suggestActive, setSuggestActive ] = React.useState(false)
  const [ isUpdatingSuggestions, setIsUpdatingSuggestions ] = React.useState(false)
  const [ buttonDisabled, setButtonDisabled ] = React.useState(isLoadingResults)

  React.useEffect(() => {
    setButtonDisabled(isLoadingResults)
  }, [isLoadingResults])

  const updateSuggestions = React.useCallback(
    debounce(async (query: string) => {
      setIsUpdatingSuggestions(true)
      console.log(`Querying for: ${query} ...`)
      setSuggestions(await getSuggestions(query))
      setIsUpdatingSuggestions(false)
    }, 500),
    [],
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    setButtonDisabled(true)
    submitSearchQuery(localValue)
    setSuggestActive(false)
  }

  return (
    <form action="#" onSubmit={handleSubmit}>
      <div className="flex my-3">
        <div className="grow mr-3">
          <input
            className="outline-none p-3 w-full rounded-full shadow border border-stone-300 focus:ring ring-plb-green ring-offset-1 focus:border-green-plb"
            value={localValue}
            onChange={(e) => {
              /*
                Set local state in this component
                Should not be called in debounced function because of timeout
                which cause state to be out of sync when typing
              */
              setLocalValue(e.target.value)
              setSuggestActive(true)
              updateSuggestions(e.target.value)
            }}
            onBlur={(e) => {
              setSuggestActive(false)
            }}
            placeholder={placeholder}
            type="search"
          />
          <div className="border bg-white my-1 mx-4 p-3" hidden={!suggestActive}>
            {/* Show status on suggestions */}
            {isUpdatingSuggestions && (suggestions.length === 0) && (
              <span className="text-stone-500">
                Checking suggestions ...
              </span>
            )}
            {!isUpdatingSuggestions && (suggestions.length === 0) && (
              <span className="text-stone-500">
                No suggestions ...
              </span>
            )}
            {/* NOTE: Suggestions must return array of objects with key label */}
            {suggestions.map((gene) => (
              <div className="border-b last:border-0 py-1.5" key={gene.label}>
                {gene.label}
              </div>
            ))}
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="text-xl text-plb-light bg-plb-green hover:bg-plb-dark-green focus:outline-none focus:ring-4 focus:ring-green-300 rounded-full px-6 py-3 text-center disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={buttonDisabled}
          >
            Search
          </button>
        </div>
      </div>
    </form>
  )
}

export default SearchBox
