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

const Radio: React.FC<IProps> = ({ groupName, radioOptions, selected: initialSelected, handleChange }) => {
  const [ selectedId, setSelectedId ] = React.useState(initialSelected)

  return (
    <div
      onChange={e => {
        setSelectedId(e.target.id)
        handleChange(e.target.id.replace(groupName, ""))
      }}
    >
      {radioOptions.map((radioOption) => (
        <div className="flex items-center mb-4" key={radioOption.id}>
          <input
            type="radio"
            name={groupName}
            id={groupName + radioOption.id}
            value={radioOption.id}  // Redundant
            checked={groupName + radioOption.id === selectedId}
            className="w-4 h-4"
          />
          <label htmlFor={groupName + radioOption.id} className="ml-2">
            {radioOption.label}
          </label>
        </div>
      ))}
    </div>
  )
}

export default Radio
