const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

//get a list of ninjas from the db
router.get('/ninjas', (req, res) => {
  res.send({ type: 'GET' });
});

//add a new ninja to db
router.post('/ninjas', (req, res, next) => {
  // const ninja = new Ninja(req.body);
  // ninja.save();
  Ninja.create(req.body).then(ninja => {
    res.send(ninja);
  }).catch(next);
});

//update a ninja in the db
router.put('/ninjas/:id', (req, res) => {
  console.log('id:', req.params.id);
  res.send({ type: 'PUT' });
});

//delete a ninjas from the db
router.delete('/ninjas/:id', (req, res) => {
  console.log('id:', req.params.id);
  res.send({ type: 'DELETE' });
});

module.exports = router;
