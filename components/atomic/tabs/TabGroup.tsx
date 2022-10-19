import React from "react"

interface IProps {
  children: React.ReactNode
  handleChangeTab?: (tabIndex?: number) => {}  // Callback to run when changing tab
}

interface TabContextType {
  openTab: number
  setOpenTab: React.Dispatch<React.SetStateAction<number>>
  handleChangeTab?: (tabIndex?: number) => {}
}

export const TabContext = React.createContext<TabContextType | null>(null)

const TabGroup: React.FC<IProps> = ({ children, handleChangeTab, ...otherProps }) => {
  const [ openTab, setOpenTab ] = React.useState(0)

  return (
    <TabContext.Provider value={{ openTab, setOpenTab, handleChangeTab }}>
      <div
        className=""
        role="tablist"
        {...otherProps}
      >
        {children}
      </div>
    </TabContext.Provider>
  )
}

export default TabGroup
