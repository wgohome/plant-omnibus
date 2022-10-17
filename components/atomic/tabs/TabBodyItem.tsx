import React from "react"

import { TabContext } from "./TabGroup"

interface IProps {
  tabIndex: number
  children: React.ReactNode
}

const TabBodyItem: React.FC<IProps> = ({ tabIndex, children }) => {
  const { openTab } = React.useContext(TabContext)!

  return (
    <li
      hidden={openTab != tabIndex}
      className=""
    >
      {children}
    </li>
  )
}

export default TabBodyItem
