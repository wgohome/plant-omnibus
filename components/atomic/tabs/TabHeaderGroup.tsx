import React from "react"

interface IProps {
  children: React.ReactNode
}

const TabHeaderGroup: React.FC<IProps> = ({ children, ...otherProps }) => {
  return (
    <ul
      className="flex flex-wrap text-center text-gray-500 border-b border-gray-400"
      role="tablist"
      {...otherProps}
    >
      {children}
    </ul>
  )
}

export default TabHeaderGroup
