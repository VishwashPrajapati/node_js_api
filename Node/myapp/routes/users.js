var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
const User = require('../models/userData')


/* GETAll users listing. */
router.get('/', function (req, res, next) {
  User.find().exec().then(result => {
    res.status(200).json({
      message:'All Data',
      data:result
    });
  }).catch(err => {
    res.status(500).json({
      message:'error',
      err: err
    });
  })
});

/* Insert Data users listing. */
router.post('/', function (req, res, next) {
  if (!req.body) {
    return res.send("Note content can not be empty");
  } else {
    var user = new User({
      name: req.body.name,
      description: req.body.description,
      _id: new mongoose.Types.ObjectId()
    })
    console.log(user, req.body)
    user.save()
      .then(result => console.log('vishwash', result))
      .catch(err => console.log('vishwash', err));

    res.status(201).json({
      message: 'handling post request',
      data: user
    });
  }
});


/* Delete Data users listing. */
router.delete('/:_id', function (req, res, next) {
  let found = req.params._id
  console.log(found)
  User.deleteOne(found)
    .exec()
    .then(res => { 
      console.log(res) 
      res.status(200).json(res)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        Error: err
      })
    })

  // if (found) {
  //   let targetIndex = userData.indexOf(found);
  //   userData.splice(targetIndex, 1);
  //   res.status(204);
  // }
  // else {
  //   res.sendStatus(404);
  // }
});


/* GET Single user listing. */
router.get('/:_id', function (req, res, next) {
  let found = req.params._id
  User.findById(found)
    .exec()
    .then(result => { 
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json({
        Error: err
      })
    })
});

/* Update user listing. */
router.put('/:id', function (req, res, next) {
  if (!req.body) {
    return res.send("Note content can not be empty");
  }
  let found = userData.find((x) => {
    return x.id === parseInt(req.params.id);
  })
  if (found) {
    let updated = {
      id: found.id,
      name: req.body.name,
      des: req.body.des,
    }
    console.log(updated)
    let targetIndex = userData.indexOf(found);
    console.log(targetIndex)
    userData.splice(targetIndex, 1, updated);
    res.status(200).json(updated);
  }
  else {
    res.sendStatus(404);
  }
});


module.exports = router;
