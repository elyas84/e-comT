const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,

  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
 
}); 
// decrype the password
  userSchema.methods.verifyPassword = async function (typedPasswrod) {
    return await bcrypt.compare(typedPasswrod, this.password);
  };
  
module.exports = mongoose.model("User", userSchema);