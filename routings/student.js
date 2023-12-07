let express = require("express");
let Users = require("../model/Person");
require("../db");
let sturouting = express.Router();

sturouting.get("/", async (req, res) => {
  let user = await Users.find();
  if (user.length > 0) {
    res.send(user);
  } else {
    res.send("no data found");
  }
});

sturouting.post("/", async (req, res) => {
  let user = new Users(req.body);
  let result = await user.save();
  res.send(result);
});

sturouting.delete("/:_id", async (req, res) => {
  let user = await Users.deleteOne(req.params);
  res.send(user);
});

sturouting.get("/:id", async (req, res) => {
  let user = await Users.findOne({ _id: req.params.id });
  res.send(user);
});

sturouting.put("/:id", async (req, res) => {
  let user = await Users.updateOne({ _id: req.params.id }, { $set: req.body });
  res.send(user);
});

sturouting.get("/search/:key", async (req, res) => {
  let user = await Users.find({
    $or: [
      { name: { $regex: req.params.key } },
      { email: { $regex: req.params.key } },
      { address: { $regex: req.params.key } },
    ],
  });
  res.send(user);
});

module.exports = sturouting;
