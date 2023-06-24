import { useState } from 'react'
import { modifyUrlWithParamsChanges } from '../../utils/urlHelper'

const defaultQueryParams: Array<queryParamType> = [
  {
    checked: false,
    key: '',
    value: '',
    description: ''
  }
]

function ParamsComponent({
  urlInput,
  queryParams,
  setUrlInput,
  setQueryParams
}: {
  urlInput: string
  queryParams: Array<queryParamType>
  setUrlInput: React.Dispatch<React.SetStateAction<string>>
  setQueryParams: React.Dispatch<React.SetStateAction<Array<queryParamType>>>
}) {
  const [hoveredRowIndex, setHoveredRowIndex] = useState<null | number>(null)

  // handleParamDelete (remove the param from the url)
  const handleParamDelete = (index: number) => {
    // get the new params value after removing the required param
    const newParamsValue: Array<queryParamType> = queryParams.filter(
      (_p, i) => i !== index
    )
    // update the url input to include the query params
    const newUrl = modifyUrlWithParamsChanges(urlInput, newParamsValue)
    // update the state
    setUrlInput(newUrl)
    setQueryParams(newParamsValue)
  }

  // handle query param changes
  const handleParamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // get current index
    const [name, indexVal] = e.target.name.split('-')
    const index = parseInt(indexVal)
    // get current row data
    const currentRow = queryParams[index]
    // validate field
    if (!name || !currentRow) return

    // get the correct value based on the field name
    const inputValue = name === 'checked' ? e.target.checked : e.target.value

    // check if it is the first entry in the row
    const shouldAddNewRow =
      currentRow.key === '' &&
      currentRow.value === '' &&
      currentRow.description === '' &&
      index === queryParams.length - 1

    // get the new params value
    let newParamsValue: Array<queryParamType> = queryParams.map((p, i) =>
      i === index
        ? {
            ...p,
            checked: shouldAddNewRow ? true : p.checked,
            [name]: inputValue
          }
        : p
    )
    if (shouldAddNewRow) {
      newParamsValue = [...newParamsValue, defaultQueryParams[0]]
    }

    // update the url input to include the query params
    const newUrl = modifyUrlWithParamsChanges(urlInput, newParamsValue)

    // update the state
    setUrlInput(newUrl)
    setQueryParams(newParamsValue)
  }

  return (
    <div>
      <div className="w-100 mb-3">
        <span>Query Params</span>
      </div>
      {/* checkbox - key input - value input */}
      <div className="overflow-x-auto w-full">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th className="border w-[45px]"></th>
              <th className="border">KEY</th>
              <th className="border">VALUE</th>
              <th className="border border-r-0">DESCRIPTION</th>
              <th className="border border-l-0 w-[20px] p-0"></th>
            </tr>
          </thead>
          <tbody>
            {queryParams.map((q, index) => (
              <tr
                key={`param` + index}
                onMouseEnter={() =>
                  queryParams.length - 1 !== index && setHoveredRowIndex(index)
                }
                onMouseLeave={() => setHoveredRowIndex(null)}
              >
                <th className="border p-0 text-center">
                  {(q.key || q.value || q.description) && (
                    <label className="mx-2">
                      <input
                        type="checkbox"
                        className="checkbox"
                        defaultChecked={q.checked}
                        name={`checked-${index}`}
                        onChange={handleParamChange}
                      />
                    </label>
                  )}
                </th>
                <td className="border p-0">
                  <input
                    className="input w-full focus:outline-0"
                    placeholder="key"
                    name={`key-${index}`}
                    value={q.key}
                    onChange={handleParamChange}
                  />
                </td>
                <td className="border p-0">
                  <input
                    className="input w-full focus:outline-0"
                    placeholder="value"
                    name={`value-${index}`}
                    value={q.value}
                    onChange={handleParamChange}
                  />
                </td>
                <td className="border border-r-0 p-0">
                  <input
                    className="input w-full focus:outline-0"
                    placeholder="description"
                    name={`description-${index}`}
                    value={q.description}
                    onChange={handleParamChange}
                  />
                </td>
                {/* (Last cell) Delete row icon */}
                <td className="border border-l-0 p-0 text-center">
                  {hoveredRowIndex === index ? (
                    <span
                      className="cursor-pointer"
                      onClick={() => handleParamDelete(index)}
                    >
                      X
                    </span>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ParamsComponent
