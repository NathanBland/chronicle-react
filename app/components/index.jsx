import React from 'react'
import { Provider } from 'react-redux'

export default ({
  store
}) => (
  <Provider store={store}>
    <div className="grid">
      <span>text</span>
    </div>
  </Provider>
)