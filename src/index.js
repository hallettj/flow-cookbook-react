/* @flow */

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import 'regenerator-runtime/runtime'
import App from './App'
import './index.css'

const root = document.getElementById('root')

if (root) { // Truthiness check avoids type error when we pass `root` to `render`
  ReactDOM.render(
    <App numStories={15} />,
    root
  )
} else {
  throw new Error('could not find element `#root` in DOM')
}
