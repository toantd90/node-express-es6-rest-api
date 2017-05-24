import resource from 'resource-router-middleware'
import User from '../models/user'

export default() => resource({
  /** Property name to store preloaded entity on `request`. */
  id: 'user',

  /** For requests with an `id`, you can auto-load the entity.
   *  Errors terminate the request, success sets `req[id] = data`.
   */
  load (req, id, callback) {
    User.findById(id, (err, user) => {
      if (err) {
        callback(err)
        return console.error(err)
      }
      callback(err, User.convertObject(user))
    })
  },

  /** GET / - List all entities */
  index ({
    params
  }, res) {
    User.find({}, (err, users) => {
      if (err) {
        res.json({message: err.code})
        return console.error(err)
      }

      let listUsers = users.map(user => User.convertObject(user))
      res.json(listUsers)
    })
  },

  /** POST / - Create a new entity */
  create ({
    body
  }, res) {
    let {name, username, password, birth, address, profession} = body
    let saveUser = new User({name, username, birth, address, profession})

    saveUser.password = saveUser.generateHash(password)
    saveUser.modifieddate = saveUser.createddate = new Date()
    saveUser.save((err, savedUser) => {
      if (err) {
        res.json({message: err.code})
        return console.error(err)
      }
      res.json(User.convertObject(savedUser))
    })
  },

  /** GET /:id - Return a given entity */
  read ({
    user
  }, res) {
    res.json(user)
  },

  /** PUT /:id - Update a given entity */
  update ({
    user,
    body
  }, res) {
    body.modifieddate = new Date()
    User.update({
      _id: user.userid
    }, body, (err, updatedUser) => {
      if (err) {
        res.json({message: err.code})
        return console.error(err)
      }
      res.sendStatus(204)
    })
  },

  /** DELETE /:id - Delete a given entity */
  delete ({
    user
  }, res) {
    User.remove({
      _id: user.userid
    }, (err) => {
      if (err) {
        res.json({message: err.code})
        return console.error(err)
      }
      res.sendStatus(204)
    })
  }
})
