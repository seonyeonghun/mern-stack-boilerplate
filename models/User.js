const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: "string",
    maxlength: 50,
  },
  email: {
    type: "string",
    maxlength: 50,
  },
  password: {
    type: "string",
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = { User };
