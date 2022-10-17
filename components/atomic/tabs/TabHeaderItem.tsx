import React from "react"

import { TabContext } from "./TabGroup"

interface IProps {
  tabIndex: number
  children: React.ReactNode
}

const TabHeaderItem: React.FC<IProps> = ({ tabIndex, children }) => {
  const { openTab, setOpenTab, handleChangeTab } = React.useContext(TabContext)!

  const selectedHeaderClass = "font-medium text-plb-green border-b-2 border-plb-green"

  return (
    <li
      className="mr-2"
    >
      <a
        href="#"
        role="tablist"
        className={`
          inline-block p-3 rounded-t-lg hover:text-neutral-700 hover:bg-gray-200
          ${openTab === tabIndex && selectedHeaderClass}
        `}
        onClick={(e) => {
          e.preventDefault()
          setOpenTab(tabIndex)
          handleChangeTab && handleChangeTab(tabIndex)
        }}
      >
        {children}
      </a>
    </li>
  )
}

export default TabHeaderItem
