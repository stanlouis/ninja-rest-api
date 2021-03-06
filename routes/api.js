const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

//get a list of ninjas from the db
router.get('/ninjas', (req, res, next) => {
  // retrieving all ninjas
  // Ninja.find({}).then(ninjas => res.send(ninjas));
  Ninja.aggregate()
    .near({
      near: {
        type: 'Point',
        coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
      },
      maxDistance: 100000,
      spherical: true,
      distanceField: 'dis'
    })
    .then(function(ninjas) {
      res.send(ninjas);
    })
    .catch(next);
});

//add a new ninja to db
router.post('/ninjas', (req, res, next) => {
  // const ninja = new Ninja(req.body);
  // ninja.save();
  Ninja.create(req.body)
    .then(ninja => {
      res.send(ninja);
    })
    .catch(next);
});

//update a ninja in the db
router.put('/ninjas/:id', (req, res) => {
  Ninja.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
    Ninja.findOne({ _id: req.params.id }).then(ninja => res.send(ninja));
  });
});

//delete a ninjas from the db
router.delete('/ninjas/:id', (req, res) => {
  Ninja.findByIdAndRemove({ _id: req.params.id }).then(ninja =>
    res.send(ninja)
  );
});

module.exports = router;
