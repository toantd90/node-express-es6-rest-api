import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import { initializeDb } from './database'
import api from './api'

let app = express()
// let pubSub = new EventEmitter()

// configure app to user bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()) // for parsing application/json

// enable CORS - Cross Origin Resource Sharing
app.use(cors())

// app.get('/', function (req, res) {
//   res.json({message: 'horray! welcome to our api!'})
// })
//
// const server = http.createServer(app, (req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });
//

// server.listen(port, () => {
//   console.log(`Server running at port ${port}`);
// });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', api())

const port = process.env.PORT || 3000

// START THE SERVER
app.listen(port, () => {
  console.info(`Server running at port ${port}`)
})

initializeDb()
