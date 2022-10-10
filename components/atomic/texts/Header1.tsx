import React from "react"
import Link from "next/link"

interface IProps {
  children: React.ReactNode
  className?: string
  href?: string
}

const Header1: React.FC<IProps> = ({ children, className, href }) => {
  if (href) {
    return (
      <Link href={href}>
        <a className="hover:underline active:text-plb-red">
          <h1 className={`text-4xl py-3 ${className}`}>
            {children}
          </h1>
        </a>
      </Link>
    )
  }
  return (
    <h1 className={`text-4xl py-3 ${className}`}>
      {children}
    </h1>
  )
}

export default Header1
