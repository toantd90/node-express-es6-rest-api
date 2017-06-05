import User from '../models/user'
import {Router} from 'express'

let authenticate = (req, res, next) => {
  let api = Router()
  api.route('/')
  .all((req, res, next) => {
    next()
  })
  .post((req, res, next) => {
    res.json({message: 'POST'})
    next()
  })
}

export default() => authenticate
