import React from "react"
import TextLink from "../atomic/TextLink"

type MapmanLevel1BinType = {
  bincode: number
  binname: string
}

interface IProps {
  level1Bins: MapmanLevel1BinType[]
}

const MapmanLevel1Cards: React.FC<IProps> = ({ level1Bins }) => {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 content-center gap-3">
      {level1Bins.map(bin => (
        <div
          className="text-center bg-white rounded-2xl shadow-lg px-3 py-6"
          key={bin.bincode}
        >
          <p className="text-sm text-stone-600">Bin {bin.bincode}</p>
          <TextLink href={`/mapman/subbins/${bin.bincode}`}>
            <h4 className="font-medium text-xl my-2">{bin.binname}</h4>
          </TextLink>
        </div>
      ))}
    </div>
  )
}

export default MapmanLevel1Cards
