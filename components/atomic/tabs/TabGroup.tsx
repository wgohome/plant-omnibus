import React from "react"

interface IProps {
  children: React.ReactNode
}

interface TabContextType {
  openTab: number
  setOpenTab: React.Dispatch<React.SetStateAction<number>>
}

export const TabContext = React.createContext<TabContextType | null>(null)

const TabGroup: React.FC<IProps> = ({ children }) => {
  const [ openTab, setOpenTab ] = React.useState(0)

  return (
    <TabContext.Provider value={{ openTab, setOpenTab }}>
      <div
        className="my-4"
        role="tablist"
      >
        {children}
      </div>
    </TabContext.Provider>
  )
}

export default TabGroup
