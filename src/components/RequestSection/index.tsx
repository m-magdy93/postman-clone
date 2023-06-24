import React, { memo, useRef, useState } from 'react'

import { getUrlParams } from '../../utils/urlHelper'
import ParamsComponent from './ParamsComponent'
import AuthComponent from './AuthComponent'
import HeadersComponent from './HeadersComponent'
import BodyComponent from './BodyComponent'
import PreReqComponent from './PreReqComponent'
import TestsComponent from './TestsComponent'
import SettingsComponent from './SettingsComponent'

const Tabs = [
  'Params',
  'Auth',
  'Headers',
  'Body',
  'Pre-req.',
  'Tests',
  'Settings'
]

const defaultQueryParams: Array<queryParamType> = [
  {
    checked: false,
    key: '',
    value: '',
    description: ''
  }
]

function RequestForm({
  submitForm
}: {
  submitForm: (
    e: React.FormEvent,
    formRef: React.MutableRefObject<any>,
    formData: any
  ) => Promise<void>
}) {
  // define form reference
  const formRef = useRef<any>(null)

  // define state for active tab
  const [activeTab, setActiveTab] = useState('Params')
  // define url input state
  const [urlInput, setUrlInput] = useState<string>('')
  // define state for query params
  const [queryParams, setQueryParams] =
    useState<Array<queryParamType>>(defaultQueryParams)

  // handle url input change
  const handleUrlInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // get the url value
    const urlValue: string = e.target.value
    // get the params
    const newQueryParams = getUrlParams(urlValue)
    // set the url input
    setUrlInput(urlValue)
    // set the query params (new ones + default empty one)
    setQueryParams([...newQueryParams, defaultQueryParams[0]])
  }

  // call the submitForm function
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    submitForm(e, formRef, {
      url: urlInput
    })
  }

  return (
    <>
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
                value={urlInput}
                onChange={handleUrlInputChange}
              />
            </div>
          </div>
        </form>
        {/* Send Button */}
        <div className="indicator">
          <button className="btn join-item" onClick={handleFormSubmit}>
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
        {activeTab === 'Params' && (
          <ParamsComponent
            queryParams={queryParams}
            setQueryParams={setQueryParams}
            urlInput={urlInput}
            setUrlInput={setUrlInput}
          />
        )}
        {activeTab === 'Auth' && <AuthComponent />}
        {activeTab === 'Headers' && <HeadersComponent />}
        {activeTab === 'Body' && <BodyComponent />}
        {activeTab === 'Pre-req.' && <PreReqComponent />}
        {activeTab === 'Tests' && <TestsComponent />}
        {activeTab === 'Settings' && <SettingsComponent />}
      </div>
    </>
  )
}

export default memo(RequestForm)
