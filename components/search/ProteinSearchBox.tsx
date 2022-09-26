import React from "react"
import TextLink from "../atomic/TextLink"

const ProteinSearchBox = ({submitSearchQuery}) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    submitSearchQuery(event.target.proteinSeq.value)
  }

  const sampleSeq = "MEEENQKSHRVSRKDQSGSHWSQGADEEPRARCSGKRCRSWAAAAIADCVALCCCPCAVVNIFTLAFVKVPWMIGRKCIGRGGPSKKRMKKINREDRFHHHHHHRRSAEMVSGGCCGGGDGDGEFDDHRFVVERDGSLTKEEAKTASLKEEEETRISARVEAERVWLELYQIGHLGFGRVSFTGIHQ"

  return (
    <form action="#" onSubmit={handleSubmit}>
      <div className="">
        <div className="my-3">
          <textarea
            className="outline-none p-4 w-full rounded-2xl shadow border border-stone-300 focus:ring ring-plb-green ring-offset-1 focus:border-green-plb"
            name="proteinSeq"
            rows={8}
            placeholder="Enter protein sequence ... "
            // defaultValue=""
          />
        </div>
        <div className="flex my-3">
          <div className="flex-grow">
            <div className="">
              <a className="hover:underline text-plb-green active:text-plb-red">
                Load example protein sequence
              </a>
            </div>
            <div className="mt-2">
              <TextLink href="/search">
                Search by gene identifiers instead
              </TextLink>
            </div>
          </div>
          <div className="">
            <button
              type="submit"
              className="text-xl text-plb-light bg-plb-green hover:bg-plb-dark-green focus:outline-none focus:ring-4 focus:ring-green-300 rounded-full px-6 py-3 text-center"
              >
              Search
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default ProteinSearchBox
