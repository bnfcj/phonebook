const Person = require('../models/personModel');
const CustomError = require('../utils/customError');
const handleError = require('../utils/handleError');
async function getPeople() {
  try {
    const people = await Person.find(); // Fetch people from the database

    return people;
  } catch (error) {
    handleError('Failed to retrieve people: ', error);
  }
}

async function postPerson(name, number) {
  try {
    const person = new Person({ name, number });
    await person.save();
    return person;
  } catch (error) {
    handleError('Failed to create contact: ', error);
  }
}
async function getPerson(id) {
  try {
    const person = await Person.findById(id);
    if (!person) handleError(new CustomError('Person not found', 404));
    return person;
  } catch (error) {
    handleError('Failed to get person: ', error);
  }
}
async function patchPerson(id, body) {
  try {
    const person = await Person.findByIdAndUpdate(id, ...body, {
      new: true,
      runValidators: true,
    });
    if (!person) handleError(new CustomError('Person not found', 404));
    return person;
  } catch (error) {
    handleError('Failed to update person: ', error);
  }
}
async function deletePerson(id) {
  try {
    const deletePerson = await Person.findByIdAndDelete(id);
    if (!deletePerson) handleError(new CustomError('Person not found', 404));
    else {
      return deletePerson;
    }
  } catch (error) {
    handleError('Unable to delete person: ', error);
  }
}
module.exports = {
  getPeople,
  postPerson,
  getPerson,
  patchPerson,
  deletePerson,
};
