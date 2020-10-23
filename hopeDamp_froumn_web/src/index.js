import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import './static/index.css'
import './static/reset.css'
import App from './App'
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/v1'
// 每次请求前将token加到请求头中
axios.interceptors.request.use(
    (config) => {
        let token = sessionStorage.getItem('token')
        if (token) {
            config.headers.token = token
        }
        return config
    },
    (err) => {
        return Promise.reject(err)
    }
)

ReactDOM.render(<App />, document.getElementById('root'))
