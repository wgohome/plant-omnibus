import React from "react"

interface RadioOption {
  id: string
  label: string
}

interface IProps {
  groupName: string
  radioOptions: RadioOption[]
  selected: string // the id of RadioOption selected
  handleChange: (id: string) => void
}

/*
  NOTE:
  the groupName and the id for radioOptions have to be unique globally on the same page!
*/
const Radio: React.FC<IProps> = ({ groupName, radioOptions, selected: initialSelected, handleChange }) => {
  const [ selectedId, setSelectedId ] = React.useState(initialSelected)

  return (
    <div
      onChange={e => {
        setSelectedId(e.target.id)
        handleChange(e.target.id)
      }}
    >
      {radioOptions.map((radioOption) => (
        <div className="flex items-center mb-4" key={radioOption.id}>
          <input
            type="radio"
            name={groupName}
            id={radioOption.id}
            value={radioOption.id}  // Redundant
            checked={radioOption.id === selectedId}
            className="w-4 h-4"
          />
          <label htmlFor={radioOption.id} className="ml-2">
            {radioOption.label}
          </label>
        </div>
      ))}
    </div>
  )
}

export default Radio
