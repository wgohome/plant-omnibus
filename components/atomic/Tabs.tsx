import React from "react";

interface Item {
  label: string
  header: React.ReactNode
  content: React.ReactNode
}

interface IProps {
  listItems: Item[]
}

const Tabs: React.FC<IProps> = ({ listItems }) => {
  const [ openTab, setOpenTab ] = React.useState(0)

  const selectedHeaderClass = "font-medium text-plb-green border-b-2 border-plb-green"

  return (
    <div>
      <ul
        className="flex flex-wrap text-center text-gray-500 border-b border-gray-400"
        role="tablist"
      >
        {listItems.map(({label, header}, i) => (
          <li
            key={label}
            className="mr-2"
          >
            <a
              href="#"
              role="tablist"
              className={`
                inline-block p-3 rounded-t-lg hover:text-white hover:bg-plb-green
                ${openTab == i && selectedHeaderClass}
              `}
              onClick={(e) => {
                e.preventDefault()
                setOpenTab(i)
              }}
            >
              {header}
            </a>
          </li>
        ))}
      </ul>
      <ul className="mt-3">
        {listItems.map(({label, content}, i) => (
          <li
            key={label}
            hidden={openTab != i}
            className=""
          >
            {content}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Tabs
