import {Router} from 'express'
import authenticate from './authenticate'
import jwt from 'jsonwebtoken' // used to verify tokens
import users from './users'
import {secret} from '../config' // get our config

export default() => {
  // ROUTES FOR API
  // =============================================================================
  let api = Router()

  // mount the facets resource
  api.use('/authenticate', authenticate())

  api.use((req, res, next) => {
    // Check header or url parameters or post parameters for token
    let token = req.body.token || req.param('token') || req.headers['x-access-token']

    if (token) {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return res.json({success: false, message: 'Failed to authenticate token.'})
        } else {
          req.decoded = decoded
          next()
        }
      })
    } else {
      return res.status(403).send({success: false, message: 'No token provided.'})
    }
  })

  api.use('/users', users())
  // perhaps expose some API metadata at the root
  // api.get('/', (req, res) => {
  //   res.end()
  // })

  return api
}
