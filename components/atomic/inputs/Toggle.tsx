import React from "react"

interface IProps {
  currState: boolean
  handleChange: () => void
  prompt: string
}

const Toggle: React.FC<IProps> = ({ currState, handleChange, prompt }) => {
  return (
    <div className="my-2">
      <label className="inline-flex relative items-center cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" checked={currState}
          onChange={handleChange}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-plb-green"></div>
        <span className="ml-3 text-sm font-medium text-gray-900 ">
          {prompt}
        </span>
      </label>
    </div>
  )
}

export default Toggle
