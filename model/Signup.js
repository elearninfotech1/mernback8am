let mongoose = require("mongoose");
let signupSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: Number,
  address: String,
});

module.exports = mongoose.model("signup", signupSchema);
