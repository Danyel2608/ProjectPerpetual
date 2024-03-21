const mongoose = require("mongoose");
//importar esquemas
const Schema = mongoose.Schema;

//crear esquema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender:{
        type:String,
        required:true,
    }
  },
  {
    versionKey: false,
  }
);

const user = mongoose.model("user", userSchema);

module.exports = user;
