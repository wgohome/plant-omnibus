import React from "react"

import LocalPaginatedTable from "./generics/LocalPaginatedTable"

type MapmanLevel1BinType = {
  bincode: number
  binname: string
}

interface IProps {
  level1Bins: MapmanLevel1BinType[]
}

const MapmanLevel1IndexTable: React.FC<IProps> = ({ level1Bins }) => {
  const columns = React.useMemo(() => [
    {
      Header: "Mapman bin code",
      accessor: "bincode",
    },
    {
      Header: "Mapman bin name",
      accessor: "binname",
    },
  ], [])

  return (
    <LocalPaginatedTable
      columns={columns}
      data={level1Bins}
    />
  )
}

export default MapmanLevel1IndexTable
