const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(morgan("tiny"));
app.get("/api/persons", (req, res) => {
  res.json(persons);
});
app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((person) => person.id === id);
  if (!person) {
    res.status(404).end("Bad Request: Something went wrong.");
  } else {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h2>${person.name}</h2>
  <p>${person.number}</p>
</body>
</html>`;
    res.send(html);
  }
});
app.get("/info", (req, res) => {
  const personsTotal = persons.length;
  const currentDate = new Date();
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };

  const formattedDate = currentDate.toLocaleString("en-US", options);
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Persons</title>
</head>
<body>
  <p>Phonebook has info for ${personsTotal} people</p>
  <p>${formattedDate}</p>
</body>
</html>`;
  res.send(html);
});
app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;

  const personIndex = persons.findIndex((person) => person.id === id);
  if (personIndex === -1) {
    res.status(404).send(`Person with id${id} not found.`);
  } else {
    persons.splice(personIndex, 1);
    res.status(204).end();
  }
});
app.post("/api/persons", (req, res) => {
  const person = req.body;
  if (persons.find((p) => p.name === person.name)) {
    res.status(409).send({ error: `Duplicate names not allowed` });
    return;
  }
  if (!person.name || !person.number) {
    res
      .status(404)
      .send({ error: "Error creating person, name or number missing" });
    return;
  }
  let id = null;
  do {
    id = Math.floor(Math.random() * 1000).toString();
  } while (persons.findIndex((person) => person.id === id) !== -1);
  person.id = id;
  persons.push(person);
  res.status(200).json(person);
});
app.patch("/api/persons/:id", (req, res) => {
  const { number } = req.body;
  const personId = req.params.id;
  const person = persons.find((p) => p.id === personId);
  console.log(number, personId, person);
  if (person) res.status(200).json({ ...person, number: number });
  else res.status(404).send("Unable to find the person, thought its id");
});
const PORT = process.env.PORT || 3001;

app.listen(PORT);
