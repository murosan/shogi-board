import ClipboardJS from 'clipboard'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import './index.scss'

ReactDOM.render(<App />, document.getElementById('root'))
new ClipboardJS('.Copy')
