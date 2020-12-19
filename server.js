import "@babel/polyfill"
import express from "express"
import bodyParser from "body-parser"
import React from "react"
import ReactDOMServer from 'react-dom/server'
import {StaticRouter} from "react-router"
import {Helmet} from 'react-helmet'
import {createStore} from 'redux'
import {Provider} from 'react-redux'


//node-backend->>>>>>>
const dotenv = require('dotenv').config()
import mongoose from 'mongoose'
import cors from 'cors'
import fileUpload from 'express-fileupload'



import apirouter from './Routers/router'


import App from './src/App'
import reducer from './src/reducers/index.js'


const app = express()
const PORT = process.env.PORT || 3000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(fileUpload())
app.use(cors())

app.use(express.static('build/public'))


mongoose.connect(process.env.MONGO_URI , {useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology:true});

mongoose.connection.once("open" , ()=>{
    console.log("db has successfully connected")
})


app.use('/api',apirouter)

const store = createStore(reducer)
app.get('/*' , (req, res)=>{
    const context = {}
    const content = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
          <Provider store={store}>
            <App />
          </Provider>
        </StaticRouter>
    )

const helmet = Helmet.renderStatic()

    
const html = `<!doctype html>    
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="theme-color" content="#000000" />
<link rel="icon" href="/favicon.ico">
<meta name="keywords" content="booksharing , sharing, books, stationary" />
<meta name="author" content="Riyazur Razak" />
${helmet.title.toString()}
${helmet.meta.toString()}
<link rel="stylesheet" href="/client_bundle.css"></link>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.5.9/dist/css/uikit.min.css" />
    <script src="https://cdn.jsdelivr.net/npm/uikit@3.5.9/dist/js/uikit.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/uikit@3.5.9/dist/js/uikit-icons.min.js"></script>
  </head>
   <body>
     <div id="root">${content}</div>
     ${helmet.script.toString()}
     <noscript>Your browser does not support JavaScript!</noscript>
     <script src="/client_bundle.js"> </script>
    </body>  
    </html>`

    res.send(html)

})


app.listen(PORT , ()=>{
    console.log(`server runing in ${PORT}`)
})