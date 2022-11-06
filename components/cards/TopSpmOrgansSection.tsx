import React from "react"

import { capitalizeFirstLetter } from "../../utils/strings"

interface IProps {
  topSpmSas: object[]
  by: "mean" | "median"
}

const TopSpmOrgansSection: React.FC<IProps> = ({ topSpmSas, by }) => {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 content-center gap-3 my-4">
      {topSpmSas.map(sa => (
        <div
          className="text-center bg-green-50 rounded-2xl shadow-lg px-3 py-6"
          key={sa}
        >
          <p className="text-sm text-stone-400">{sa.label}</p>
          <h4 className="font-medium text-xl my-2">{capitalizeFirstLetter(sa.name)}</h4>
          <div className="my-2">
            {by == "mean" ? (
              <p className="text-sm text-stone-600">SPM (mean): {sa.spm}</p>
            ) : (
              <p className="text-sm text-stone-600">SPM (median): {sa.spm_med}</p>
            )}
          </div>
          <div className="my-2">
            <p className="text-xs text-stone-400">Mean TPM: {sa.avg_tpm} (±{sa.sd})</p>
            <p className="text-xs text-stone-400">Median TPM: {sa.median}</p>
          </div>
          <p className="text-xs text-stone-400 mt-1">{sa.tpms.length} sample{sa.tpms.length > 1 ? "s" : ""}</p>
        </div>
      ))}
    </div>
  )
}

export default TopSpmOrgansSection
