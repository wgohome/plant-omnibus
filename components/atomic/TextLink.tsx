import React from "react"
import Link from "next/link"

interface IProps {
  href: string
  moreClassName?: string
  children: React.ReactNode
}

const TextLink: React.FC<IProps & {[key: string]: any}> = ({
  href,
  moreClassName = "",
  children,
  ...moreAttributes  /* Eg: target="_blank" in the element */
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
