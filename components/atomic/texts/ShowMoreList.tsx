import React from "react"

import TextLink from "../TextLink"

interface IProps {
  items: any[]
}

const ShowMoreList: React.FC<IProps> = ({ items }) => {
  const [ showMore, setShowMore ] = React.useState(false)

  const initialItems = items.slice(0, 10)
  const moreItems = items.slice(10, -1)

  const handleShowMore = (e) => {
    e.preventDefault()
    setShowMore(true)
  }

  const handleShowLess = (e) => {
    e.preventDefault()
    setShowMore(false)
  }

  return (
    <div>
      {/* Initial items */}
      {initialItems.map((item, i) => (
        <span key={i}>
          {item}
          <span hidden={(i === initialItems.length - 1) && (moreItems.length === 0)}>
            {", "}
          </span>
        </span>
      ))}
      {/* More items */}
      {showMore && moreItems.map((item, i) => (
        <span key={i}>
          {item}
          <span hidden={(i === initialItems.length - 1)}>
            {", "}
          </span>
        </span>
      ))}

      {/* Show more/less toggle */}
      {moreItems.length > 0 && (showMore ? (
        <TextLink
          href="#"
          moreClassName="text-stone-400 italic"
          onClick={handleShowLess}
        >
          Show less
        </TextLink>
      ) : (
        <TextLink
          href="#"
          className="text-stone-400 italic"
          onClick={handleShowMore}
        >
          Show more ...
        </TextLink>
      ))}
    </div>
  )
}

export default ShowMoreList
