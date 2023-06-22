import React from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { json } from '@codemirror/lang-json'

export default function CodeEditor(props: any) {
  const onChange = React.useCallback((value: any, _viewUpdate: any) => {
    console.log('value:', value)
  }, [])
  return (
    <div>
      <CodeMirror
        // value=""
        // height="200px"
        // width="100%"
        // theme="dark"
        value={props.value || ''}
        height={props.height || '200px'}
        width={props.width || '100%'}
        theme={props.theme || 'dark'}
        extensions={[json()]}
        onChange={onChange}
      />
    </div>
  )
}
