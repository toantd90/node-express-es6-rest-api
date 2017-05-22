import resource from 'resource-router-middleware';
import User from '../models/user';

export default() => resource({
  /** Property name to store preloaded entity on `request`. */
  id: 'user',

  /** For requests with an `id`, you can auto-load the entity.
   *  Errors terminate the request, success sets `req[id] = data`.
   */
  load(req, id, callback) {
    let user = users.find(user => user.id === id),
      err = users
        ? null
        : 'Not found';
    callback(err, user);
  },

  /** GET / - List all entities */
  index({
    params
  }, res) {
    User.find({}, function(err, users) {
      if (err) {
        res.json({message: err.code});
        return console.error(err);
      }
      res.json(users);
    });

  },

  /** POST / - Create a new entity */
  create({
    body
  }, res) {
    body.id = users.length.toString(36);
    users.push(body);
    res.json(body);
  },

  /** GET /:id - Return a given entity */
  read({
    user
  }, res) {
    res.json(user);
  },

  /** PUT /:id - Update a given entity */
  update({
    user,
    body
  }, res) {
    for (let key in body) {
      if (key !== 'id') {
        user[key] = body[key];
      }
    }
    res.sendStatus(204);
  },

  /** DELETE /:id - Delete a given entity */
  delete({
    user
  }, res) {
    facets.splice(users.indexOf(user), 1);
    res.sendStatus(204);
  }
});
