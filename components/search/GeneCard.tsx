import React from "react"
import Link from "next/link"

interface IProps {
  label: string
  alias: string[]
  speciesName: string
  taxid: number
}

const GeneCard: React.FC<IProps> = ({ label, alias, speciesName, taxid }) => {
  return (
    <div className="border p-4">
      <div className="my-3">
        <span className="bg-green-100 text-green-800 text-sm font-medium rounded-full px-2.5 py-0.5">
          Gene
        </span>
      </div>
      <h3 className="text-lg font-medium pb-1">
        {/* TODO: find the species on redirect */}
        <Link href={`/species/${taxid}/genes/${label}`}>
          <a className="text-plb-green hover:underline active:text-plb-red">
            {label}
          </a>
        </Link>
      </h3>
      <p className="">
        Species: {speciesName} ({taxid})
      </p>
      <p className="">
        <span>Alias: </span><span>{alias.length ? alias : "-"}</span>
      </p>
    </div>
  )
}

export default GeneCard
