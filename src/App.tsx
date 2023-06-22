import React, { useRef, useState } from 'react'

import axios, {
  getResponseDetails,
  AxiosRequestConfig,
  responseDetails
} from './utils/axiosHelper'
import ThemeToggleSwitch from './components/ThemeToggleSwitch'
import './App.css'
import ResponseSection from './components/ResponseSection'

const Tabs = [
  'Params',
  'Auth',
  'Headers',
  'Body',
  'Pre-req.',
  'Tests',
  'Settings'
]

function App() {
  // define state for active tab
  const [activeTab, setActiveTab] = useState('Params')
  // define state for axios response
  const [axiosResponse, setAxiosResponse] = useState<responseDetails | null>(
    null
  )
  // define form reference
  const formRef = useRef<any>(null)

  // submit the form
  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault()
    // reset the response
    setAxiosResponse(null)
    try {
      // get form Value
      const form = formRef.current!
      // get the values of the form reference
      const method = form.querySelector('#method')?.value
      const url = form.querySelector('#url')?.value
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
        return error.message
      } else {
        console.error('unexpected error: ', error)
        return 'An unexpected error occurred'
      }
    }
  }

  return (
    <div className="flex flex-col">
      {/* Theme toggle switch */}
      <ThemeToggleSwitch />

      {/* Form (Method - API_URL - Send) */}
      <div className="flex flex-row justify-between gap-2">
        {/* Select Method && URL text input */}
        <form className="join mb-[30px] w-100 flex-1" ref={formRef}>
          <select
            className="select select-bordered join-item"
            defaultValue={'GET'}
            id="method"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="PATCH">PATCH</option>
            <option value="DELETE">DELETE</option>
          </select>
          <div className="flex-1">
            <div>
              <input
                className="input input-bordered join-item w-full"
                placeholder="https://jsonplaceholder.typicode.com/todos"
                id="url"
              />
            </div>
          </div>
        </form>
        {/* Send Button */}
        <div className="indicator">
          <button className="btn join-item" onClick={submitForm}>
            SEND
          </button>
        </div>
      </div>

      {/* Request Tabs */}
      <div className="tabs">
        {Tabs.map((tabName) => (
          <button
            key={tabName}
            className={`tab tab-bordered ${
              tabName === activeTab ? 'tab-active' : ''
            }`}
            onClick={() => setActiveTab(tabName)}
          >
            {tabName}
          </button>
        ))}
      </div>

      {/* Request Tabs Content */}
      <div className="tab-content text-left p-3 py-5">
        {activeTab === 'Params' && <ParamsComponent />}
        {activeTab === 'Auth' && <AuthComponent />}
        {activeTab === 'Headers' && <HeadersComponent />}
        {activeTab === 'Body' && <BodyComponent />}
        {activeTab === 'Pre-req.' && <PreReqComponent />}
        {activeTab === 'Tests' && <TestsComponent />}
        {activeTab === 'Settings' && <SettingsComponent />}
      </div>

      {/* Response Section */}
      {axiosResponse?.responseStatus && (
        <ResponseSection axiosResponse={axiosResponse} />
      )}
    </div>
  )
}

export default App

function ParamsComponent() {
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
            <tr className="">
              <th className="border"></th>
              <th className="border">KEY</th>
              <th className="border">VALUE</th>
              <th className="border">DESCRIPTION</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th className="border p-0 text-center">
                <label className="mx-2">
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td className="border p-0">
                <input
                  className="input w-full focus:outline-0"
                  placeholder="key"
                />
              </td>
              <td className="border p-0">
                <input
                  className="input w-full focus:outline-0"
                  placeholder="value"
                />
              </td>
              <td className="border p-0">
                <input
                  className="input w-full focus:outline-0"
                  placeholder="description"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

function AuthComponent() {
  return <div>Auth</div>
}

function HeadersComponent() {
  return <div>Headers</div>
}

function BodyComponent() {
  return <div>Body</div>
}

function PreReqComponent() {
  return <div>PreReq</div>
}

function TestsComponent() {
  return <div>Tests</div>
}

function SettingsComponent() {
  return <div>Settings</div>
}
