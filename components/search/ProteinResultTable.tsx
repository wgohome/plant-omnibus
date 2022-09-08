const ProteinResultTable = ({ results, resultFields }) => {
  return (
    <>
      <h3 className="text-3xl py-3">Sequence hits</h3>
      <div className="overflow-x-auto border border-stone-300 rounded-xl shadow-lg my-3">
        <table className="">
          <thead className="border-b">
            <tr>
              {Object.entries(resultFields).map(([ key, label ]) => (
                <th
                  scope="col"
                  className="text-gray-900 font-medium text-left min-w-[120px] px-6 py-4"
                  key={key}
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {results.map(result => (
              <tr
                key={result.target}
                className="bg-white border-b last:border-0"
              >
                {Object.entries(resultFields).map(([ key, label ]) => (
                  <td
                    key={key}
                    className="text-gray-900 text-sm font-light px-6 py-4"
                  >
                    {result[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ProteinResultTable
