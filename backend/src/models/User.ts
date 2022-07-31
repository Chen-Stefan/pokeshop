import mongoose from 'mongoose'

const user = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  isAdmin: {
    type: Boolean,
    default: false
  }
})
// User is name of collection, user is what the collection is defined as
export default mongoose.model('User', user)