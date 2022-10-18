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
            className="w-4 h-4 text-plb-green bg-gray-100 border-gray-300 focus:ring-plb-green"
          />
          <label htmlFor={radioOption.id} className="ml-2 text-sm font-medium text-gray-900">
            {radioOption.label}
          </label>
        </div>
      ))}
    </div>
  )
}

export default Radio
