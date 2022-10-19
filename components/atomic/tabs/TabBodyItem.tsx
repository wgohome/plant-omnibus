import React from "react"

import { TabContext } from "./TabGroup"

interface IProps {
  tabIndex: number
  children: React.ReactNode
}

const TabBodyItem: React.FC<IProps & any> = ({ tabIndex, children, ...otherProps }) => {
  const { openTab } = React.useContext(TabContext)!

  return (
    <li
      hidden={openTab != tabIndex}
      {...otherProps}
    >
      {children}
    </li>
  )
}

export default TabBodyItem
