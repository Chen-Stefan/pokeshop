import mongoose from 'mongoose'

const user = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  email: {
    type: String,
    unique: true
  }
})
// User is name of collection, user is what the collection is defined as
export default mongoose.model('User', user)