import React from "react"

const useAutoFocus = () => {
  const inputRef = React.useCallback((inputElement: HTMLInputElement) => {
    if (inputElement) {
      inputElement.focus()
    }
  }, [])

  return inputRef
}

export default useAutoFocus
