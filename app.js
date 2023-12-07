let express = require("express");
require("./db");
let Employee = require("./model/Employee");
let sturouting = require("./routings/student");
let Signup = require("./model/Signup");
let cors = require("cors");
let app = express();
app.use(express.json());
app.use(cors());

app.use("/student", sturouting);

//employee api

app.get("/employee", async (req, res) => {
  let user = await Employee.find({});
  if (user.length > 0) {
    res.send(user);
  } else {
    res.send("no data found");
  }
});

app.post("/employee", async (req, res) => {
  let user = new Employee(req.body);
  let result = await user.save();
  res.send(result);
});

app.delete("/employee/:id", async (req, res) => {
  let user = await Employee.deleteOne({ _id: req.params.id });
  res.send(user);
});

app.post("/signup", async (req, res) => {
  let user = new Signup(req.body);
  let result = await user.save();
  res.send(result);
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await Signup.findOne({ email: email });
  if (user.password == password) {
    res.send(user);
  } else {
    res.send("no user found");
  }
});

app.post("/forgot", async (req, res) => {
  let { email } = req.body;
  let user = await Signup.findOne({ email: email });
  if (user) {
    res.send(user);
  } else {
    res.send("no user found");
  }
});

app.listen(4000);
