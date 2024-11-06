let morgan;
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
  morgan = require("morgan");
}
const express = require("express");

const cors = require("cors");
const Person = require("./models/personModel");
const app = express();
app.use(cors());
if (morgan) {
  app.use(morgan("tiny"));
}
app.use(express.static("dist"));
app.use(express.json());
const PORT = process.env.PORT || 3001;
app.get("/api/persons", (req, res, next) => {
  Person.find()
    .then((persons) => res.json(persons))
    .catch(next);
});
app.post("/api/persons", (req, res, next) => {
  const { name, number } = req.body;
  const person = new Person({ name, number: number });
  person
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});
app.get("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;

  Person.findById(id)
    .then((result) => {
      if (!result) res.status(404).send("Not Found");
      else {
        res.json(result);
      }
    })
    .catch(next);
});
app.patch("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;
  const { name, number } = req.body;
  if (!number) {
    return res.status(400).json("Number is required");
  }
  const updatedBody = {};
  if (name) updatedBody.name = name;
  if (number) updatedBody.number = number;

  Person.findByIdAndUpdate(
    id,

    { ...updatedBody },
    { new: true, runValidators: true },
  )
    .then((result) => {
      if (!result) res.status(404).send("Not Found");
      else {
        res.json(result);
      }
    })
    .catch(next);
});
app.delete("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;
  Person.findByIdAndDelete(id)
    .then((result) => {
      if (!result) res.status(404).send("Not Found");
      else res.status(200).send(result);
    })
    .catch(next);
});
app.use((err, req, res, next) => {
  console.error(err.message);
  if (err.name === "CastError")
    return res.status(500).send({ error: "Malformed ID" });
  else if (err.name === "ValidationError")
    return res
      .status(500)
      .send({ error: "Validation Error, fields incorrect or missing" });
  next(err);
});
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
