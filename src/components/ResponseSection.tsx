import { memo, useState } from 'react'

import CodeEditor from './Editor'
import { responseDetails } from '../utils/axiosHelper'

function ResponseSection({
  axiosResponse
}: {
  axiosResponse: responseDetails
}) {
  // define state for active tab
  const [activeResTab, setActiveResTab] = useState('Response')

  return (
    <>
      {/* Response Tabs */}
      <div className="tabs">
        {['Response', 'Headers'].map((tabName) => (
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

      {/* Response Tabs's Content */}
      <div className="tab-content text-left p-0 py-5 w-100 overflow-hidden">
        {/* Json Response */}
        {activeResTab === 'Response' && (
          <CodeEditor
            value={axiosResponse.jsonResponse}
            height={'300px'}
            width={'100%'}
            theme={'dark'}
          />
        )}
        {/* Response headers details */}
        {activeResTab === 'Headers' && (
          <div>
            <div className="d-flex my-2">
              <div className="me-3">
                Status: <span data-status>{axiosResponse.responseStatus}</span>
              </div>
              <div className="me-3">
                Time: <span data-time>{axiosResponse.responseTime}</span>ms
              </div>
              <div className="me-3">
                Size: <span data-size>{axiosResponse.responseSize}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default memo(ResponseSection)
