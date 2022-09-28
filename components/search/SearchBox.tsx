import React, { KeyboardEvent } from "react"
import debounce from "lodash.debounce"

import useOutsideAlerter from '../../components/hooks/useOutsideAlterer'

const SearchBox = ({
  initialValue, // for input field, usually blank
  placeholder, // for input field
  isLoadingResults, // to known when the submit button should be disabled or not
  /*
   * `getSuggestions` is a callback from parent element
   *  returning an array of suggestions
   *  which contain the key `label`
   */
  getSuggestions,
  submitSearchQuery, // callback from parent to get and render results
}) => {
  /* Controlled input element */
  const [ userInput, setUserInput ] = React.useState(initialValue)

  /* List of suggestions and the selected index if any */
  const [ suggestions, setSuggestions ] = React.useState([])
  const [ selectedIndex, setSelectedIndex ] = React.useState(0)  // First one by default

  /* Determines whether suggestions dropdown is shown or not */
  const [ suggestActive, setSuggestActive ] = React.useState(false)
  const [ isUpdatingSuggestions, setIsUpdatingSuggestions ] = React.useState(false)

  /* Disable button when query has been sent and is awaiting results */
  const [ buttonDisabled, setButtonDisabled ] = React.useState(isLoadingResults)

  /* Ref used to identify clicks outside this div */
  const suggestionBoxRef = React.useRef(null)
  useOutsideAlerter(suggestionBoxRef, () => {setSuggestActive(false)})

  React.useEffect(() => {
    setButtonDisabled(isLoadingResults)
  }, [isLoadingResults])

  React.useEffect(() => {
    setUserInput(initialValue)
  }, [initialValue])

  const updateSuggestions = React.useCallback(
    debounce(async (query: string) => {
      setIsUpdatingSuggestions(true)
      console.log(`Querying suggestions for: ${query} ...`)
      setSuggestions(await getSuggestions(query))
      setIsUpdatingSuggestions(false)
    }, 500),
    [],
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    setButtonDisabled(true)
    submitSearchQuery(userInput)
    setSuggestActive(false)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    /* User pressed the enter key */
    if (event.key === "Enter") {
      setUserInput(suggestions[selectedIndex].label)
    }
    /* User pressed the up arrow */
    else if (event.key === "ArrowUp") {
      if (selectedIndex === 0) return
      setSelectedIndex(selectedIndex - 1)
    }
    /* User pressed the down arrow */
    else if (event.key === "ArrowDown") {
      if (selectedIndex - 1 === suggestions.length) return
      setSelectedIndex(selectedIndex + 1)
    }
  }

  return (
    <form action="#" onSubmit={handleSubmit}>
      <div className="flex my-3">
        <div className="grow mr-3" ref={suggestionBoxRef}>
          <input
            type="search"
            placeholder={placeholder}
            className="outline-none p-3 w-full rounded-full shadow border border-stone-300 focus:ring ring-plb-green ring-offset-1 focus:border-green-plb"
            value={userInput}
            onChange={(e) => {
              /*
                Sync `value` with `userInput` component state
                Should not be called in debounced function because of timeout
                which cause state to be out of sync when typing
              */
              setUserInput(e.target.value)
              setSuggestActive(true)
              updateSuggestions(e.target.value)
            }}
            onKeyDown={handleKeyDown}
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
                No suggestions found
              </span>
            )}
            {/* NOTE: Suggestions must return array of objects with a `label` key */}
            {suggestions.map((item, index) => (
              <div
                className={
                  `border-b last:border-0 py-1.5 hover:bg-slate-100
                  ${index === selectedIndex && "bg-plb-green/25"}`
                }
                key={item.label}
                onClick={(event) => {
                  setUserInput(event.target.innerText)
                  setSuggestActive(false)
                }}
              >
                {item.label}
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
