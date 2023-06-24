function getUrlParams(urlValue: string) {
  if (!urlValue || !isValidUrl(urlValue)) return []
  // get the params from the url
  const url = new URL(urlValue)
  const params = new URLSearchParams(url.search)
  // get the entries of the params
  const entries = Array.from(params.entries())
  // check if there are any params
  if (!entries.length) return []
  // create new query params
  const newQueryParams = entries.map(([key, value]) => ({
    checked: true,
    key,
    value,
    description: ''
  }))
  return newQueryParams
}

function isValidUrl(value: string) {
  let valid = true
  try {
    new URL(value)
  } catch (error) {
    valid = false
  } finally {
    return valid
  }
}

function modifyUrlWithParamsChanges(
  urlInput: string,
  newParamsValue: Array<queryParamType>
) {
  // filter the params
  const validQueryParams = newParamsValue.filter(
    (p) => p.checked && (p.key !== '' || p.value !== '')
  )
  // check if the url is not valid
  let valid = isValidUrl(urlInput)
  const url = valid ? new URL(urlInput) : urlInput
  const params = new URLSearchParams()
  validQueryParams.forEach((param) => {
    if (param.checked) params.append(param.key, param.value)
  })
  const paramsString = params.toString()
  if (url && valid) url.search = paramsString
  if (url && valid && url.search === '?=') url.search = ''
  const newUrl =
    url && valid ? url.toString() : paramsString ? '?' + paramsString : ''
  return newUrl
}

export { getUrlParams, modifyUrlWithParamsChanges }
