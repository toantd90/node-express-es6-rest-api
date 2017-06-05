import {Router} from 'express'
import users from './users'
import authenticate from './authenticate'

export default() => {
  // ROUTES FOR API
  // =============================================================================
  let api = Router()

  // mount the facets resource
  api.use('/users', users())
  api.use('/authenticate', authenticate())

  // perhaps expose some API metadata at the root
  api.get('/', (req, res) => {})

  return api
}
