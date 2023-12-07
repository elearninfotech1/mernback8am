let mongoose = require("mongoose");
let studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
});

module.exports = mongoose.model("users", studentSchema);
