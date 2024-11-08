const personServices = require('../services/personServices');
const CustomError = require('../utils/customError');
const handleError = require('../utils/handleError');
async function getPeople(req, res, next) {
  try {
    const people = await personServices.getPeople();
    return res.status(200).json(people);
  } catch (error) {
    next(error);
  }
}
async function postPerson(req, res, next) {
  try {
    const { name, number } = req.body;
    if (!name || !number)
      handleError(
        new CustomError('One or more Inputs are missing. Please try again', 400)
      );
    const person = await personServices.postPerson(name, number);
    res.status(200).json(person);
  } catch (error) {
    next(error);
  }
}
async function getPerson(req, res, next) {
  try {
    const { id } = req.params;
    console.log(id);
    const person = await personServices.getPerson(id);
    res.status(200).json(person);
  } catch (error) {
    next(error);
  }
}
async function patchPerson(req, res, next) {
  try {
    const body = req.body;
    const { id } = req.params;
    const person = await personServices.patchPerson(id, body);
    res.status(200).json(person);
  } catch (error) {
    next(error);
  }
}
async function deletePerson(req, res, next) {
  try {
    const { id } = req.params;
    const person = await personServices.deletePerson(id);
    res.status(200).json(person);
  } catch (error) {
    next(error);
  }
}
module.exports = {
  getPeople,
  postPerson,
  getPerson,
  patchPerson,
  deletePerson,
};
