import ReactDOM from 'react-dom'
import React from 'react'
import { createStore } from 'redux'

import App from './components'
import reducer from './reducers'

const store = createStore(reducer)
ReactDOM.render(
  <App store={store} />,
  document.querySelector('#root')
)