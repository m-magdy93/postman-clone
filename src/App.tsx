import { useState, useEffect } from 'react'
import { themeChange } from 'theme-change'
import CodeEditor from './Editor'
import './App.css'

const Tabs = [
  'Params',
  'Auth',
  'Headers',
  'Body',
  'Pre-req.',
  'Tests',
  'Settings'
]

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

function App() {
  const [activeTab, setActiveTab] = useState('Params')
  const [activeResTab, setActiveResTab] = useState('Response')

  useEffect(() => {
    themeChange(false)
    // 👆 false parameter is required for react project
  }, [])

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-end mb-5">
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="mr-1">🌞</span>
            <input
              name="theme"
              data-toggle-theme="light,dark"
              type="checkbox"
              className="toggle"
              data-act-class="ACTIVECLASS"
            />
            <span className="ml-1">🌚</span>
          </label>
        </div>
      </div>

      {/* Form */}
      <div className="flex flex-row justify-between gap-2">
        <div className="join mb-[30px] w-100 flex-1">
          <select
            className="select select-bordered join-item"
            defaultValue={'GET'}
          >
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>PATCH</option>
            <option>DELETE</option>
          </select>
          <div className="flex-1">
            <div>
              <input
                className="input input-bordered join-item w-full"
                placeholder="https://api.example.com"
              />
            </div>
          </div>
        </div>
        <div className="indicator">
          <button className="btn join-item">SEND</button>
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

      {/* Tabs Content */}
      <div className="tab-content text-left p-3 py-5">
        {activeTab === 'Params' && <ParamsComponent />}
        {activeTab === 'Auth' && <AuthComponent />}
        {activeTab === 'Headers' && <HeadersComponent />}
        {activeTab === 'Body' && <BodyComponent />}
        {activeTab === 'Pre-req.' && <PreReqComponent />}
        {activeTab === 'Tests' && <TestsComponent />}
        {activeTab === 'Settings' && <SettingsComponent />}
      </div>

      {/* Response Tabs */}
      <div className="tabs">
        {['Response'].map((tabName) => (
          <button
            key={tabName}
            className={`tab tab-bordered ${
              tabName === activeResTab ? 'tab-active' : ''
            }`}
            onClick={() => setActiveResTab(tabName)}
          >
            {tabName}
          </button>
        ))}
      </div>

      {/* Response Content */}
      <div className="tab-content text-left p-0 py-5 w-100 overflow-hidden">
        <CodeEditor value={''} height={'200px'} width={'100%'} theme={'dark'} />
      </div>
    </div>
  )
}

export default App
