import React from "react"

interface IProps {
  children: React.ReactNode
}

const TabBodyGroup: React.FC<IProps> = ({ children }) => {
  return (
    <ul className="mt-3">
      {children}
    </ul>
  )
}

export default TabBodyGroup
