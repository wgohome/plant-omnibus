import React from "react"

import { capitalizeFirstLetter } from "../../utils/strings"

interface IProps {
  topSpmSas: object[]
}

const TopSpmOrgansSection: React.FC<IProps> = ({ topSpmSas }) => {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 content-center gap-3 my-4">
      {topSpmSas.map(sa => (
        <div
          className="text-center bg-green-50 rounded-2xl shadow-lg px-3 py-6"
          key={sa}
        >
          <p className="text-sm text-stone-500">{sa.label}</p>
          <h4 className="font-medium text-xl my-2">{capitalizeFirstLetter(sa.name)}</h4>
          <p className="text-sm text-stone-600">SPM: {sa.spm}</p>
          <p className="text-sm text-stone-600">Mean TPM: {sa.avg_tpm} (±{sa.sd})</p>
          <p className="text-sm text-stone-600">Median TPM: {sa.median}</p>
          <p className="text-sm text-stone-600 mt-1">{sa.tpms.length} sample{sa.tpms.length > 1 ? "s" : ""}</p>
        </div>
      ))}
    </div>
  )
}

export default TopSpmOrgansSection
