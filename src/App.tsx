import React, { useState } from 'react'

import axios, {
  getResponseDetails,
  AxiosRequestConfig,
  responseDetails
} from './utils/axiosHelper'
import ThemeToggleSwitch from './components/ThemeToggleSwitch'
import './App.css'
import ResponseSection from './components/ResponseSection'
import RequestForm from './components/RequestSection'

function App() {
  // define state for axios response
  const [axiosResponse, setAxiosResponse] = useState<responseDetails | null>(
    null
  )

  // submit the form
  const submitForm = async (
    e: React.FormEvent,
    formRef: React.MutableRefObject<any>,
    formData: any
  ) => {
    e.preventDefault()
    // reset the response
    setAxiosResponse(null)
    try {
      // get form Value
      const form = formRef.current!
      // get the values of the form reference
      const method = form.querySelector('#method')?.value
      const url = formData.url
      console.log(method, url, form)
      // TODO: validate the input
      // send the request
      const axiosRequest: AxiosRequestConfig = { method, url }
      const response = await axios(axiosRequest)
      const resDetails = getResponseDetails(response)
      setAxiosResponse(resDetails)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('error message: ', error.message)
        // return error.message
      } else {
        console.error('unexpected error: ', error)
        // return 'An unexpected error occurred'
      }
    }
  }

  return (
    <div className="flex flex-col">
      {/* Theme toggle switch */}
      <ThemeToggleSwitch />
      <RequestForm submitForm={submitForm} />

      {/* Response Section */}
      {axiosResponse?.responseStatus && (
        <ResponseSection axiosResponse={axiosResponse} />
      )}
    </div>
  )
}

export default App
