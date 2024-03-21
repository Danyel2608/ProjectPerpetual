const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const loginSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique:false,
  },
  role: {
    type: String,
    required: true,
    unique:false,
    default:"user",
  },
  lastName: {
    type: String,
    required: false,
  },
  rememberMe: {
    type: Boolean,
    required: true,
    default: false,
  }
});
const login = mongoose.model("Login", loginSchema);

module.exports = login;