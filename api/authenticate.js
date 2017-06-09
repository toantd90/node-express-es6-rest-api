import User from '../models/user'
import {Router} from 'express'
import jwt from 'jsonwebtoken' // used to create, sign and verify tokens
import {secret} from '../config' // get our config

let authenticate = () => {
  const api = Router()

  // Route to authenticate a user
  api.post('/', (req, res) => {
    // Find the user
    User.findOne({
      username: req.body.username
    }, (err, user) => {
      if (err) {
        throw err
      }
      if (!user) {
        console.error(`Authentication failed. User '${req.body.username}' not found.`)
        res.json({success: false, message: 'Authentication failed. User not found.'})
      } else {
        // Check if password matches
        if (!user.validPassword(req.body.password)) {
          console.error(`Authentication failed. Wroong password for user '${req.body.username}'`)
          res.json({success: false, message: 'Authentication failed. Wrong password.'})
        } else {
          // If user is founded and password is right
          // create a token
          let token = jwt.sign(user, secret, {expiresIn: 720})

          // return the information including token as JSON
          res.json({success: true, message: 'Enjoy your token', token: token})
        }
      }
    })
  })

  return api
}

export default authenticate
