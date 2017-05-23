import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const Schema = mongoose.Schema

let userSchema = new Schema({
  name: {
    type: String,
    min: 6,
    max: 20
  },
  username: {
    type: String,
    min: 6,
    max: 20,
    unique: true,
    required: true,
    dropDups: true
  },
  password: {
    type: String,
    min: 6,
    max: 20
  },
  birth: {
    type: Date
  },
  address: {
    type: String
  },
  profession: {
    type: String
  },
  status: {
    type: Boolean,
    default: true
  },
  createddate: {
    type: Date
  },
  modifieddate: {
    type: Date
  }
})

// generate password hash
userSchema.methods.generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)

// checking if password is valid
userSchema.methods.validPassword = password => bcrypt.compareSync(password, this.password)

userSchema.statics.convertObject = user => ({
  userid: user._id,
  name: user.name,
  username: user.username,
  profession: user.profession,
  createddate: user.createddate,
  modifieddate: user.modifieddate,
  status: user.status
})

export default mongoose.model('User', userSchema)
