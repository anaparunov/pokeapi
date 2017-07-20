import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import axios from 'axios'

axios.defaults.baseURL = 'http://pokeapi.co/api/v2/'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
