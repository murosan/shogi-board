import ClipboardJS from 'clipboard'
import { Provider } from 'mobx-react'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import './index.scss'
import { Store } from './model/store/Store'
import * as serviceWorker from './serviceWorker'
import { DefaultStore } from './store/Store'

const store: Store = new DefaultStore()
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
new ClipboardJS('.Copy')

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register()
