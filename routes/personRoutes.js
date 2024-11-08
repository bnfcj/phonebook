const express = require('express');
const router = express.Router();
const routes = require('../controllers/personController');
router.get('/', routes.getPeople);
router.post('/', routes.postPerson);
router.get('/:id', routes.getPerson);
router.patch('/:id', routes.patchPerson);
router.delete('/:id', routes.deletePerson);
module.exports = router;
