import React from "react"
import Link from "next/link"

interface IProps {
  href: string
  moreClassName?: string
  moreAttributes?: object
  children: React.ReactNode
}

const TextLink: React.FC<IProps> = ({
  href,
  moreClassName = "",
  moreAttributes = {},  /* Eg: {target: "_blank"} */
  children
}) => {
  return (
    <Link href={href}>
      <a className={`text-plb-green hover:underline active:text-plb-red visited:text-plb-red ${moreClassName}`} {...moreAttributes}>
        {children}
      </a>
    </Link>
  )
}

export default TextLink
