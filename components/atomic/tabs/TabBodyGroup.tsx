import React from "react"

interface IProps {
  children: React.ReactNode
}

const TabBodyGroup: React.FC<IProps> = ({ children, ...otherProps }) => {
  return (
    <ul className="mt-3" {...otherProps}>
      {children}
    </ul>
  )
}

export default TabBodyGroup
