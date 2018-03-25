import express from 'express'
import userModel from '../models/user'

const router = express.Router()

router.route('/users')
  .get((req, res) => {
    const params = Object.assign({}, req.query)
    if (params.age) {
      params.age = parseInt(params.age)
    }
    userModel.find({...params}, (err, users) => {
      if (err) {
        res.send(err)
        return
      }
      res.json(users)
    })
  })
  .post((req, res) => {
    const postData = req.body
    const validationError = {
      type: 'Validation Error',
      message: ''
    }

    if (!postData.name) {
      validationError.message = 'name is required'
    }
    if (!postData.age) {
      validationError.message = 'age is required'
    }
    if (!postData.gender) {
      validationError.message = 'gender is required'
    }

    if (validationError.message) {
      res.json(validationError)
      return
    }

    userModel.insert(postData, (err, newUser) => {
      if (err) {
        res.send(err)
        return
      }
      res.json(newUser)
    })
  })

router.route('/users/ltage/:age')
  .get((req, res) => {
    userModel.find({
      age: {
        $lt: +req.params.age
      }
    }, (err, users) => {
      if (err) {
        res.send(err)
        return
      }
      res.json(users)
    })
  })

router.route('/users/gteage/:age')
  .get((req, res) => {
    userModel.find({
      age: {
        $gte: +req.params.age
      }
    }, (err, users) => {
      if (err) {
        res.send(err)
        return
      }
      res.json(users)
    })
  })

router.route('/user/:id').put((req, res) => {
  userModel.findOne({
    _id: req.params.id
  }, (err, user) => {
    var prop

    if (err) {
      res.send(err)
      return
    }

    if (user === null) {
      res.json({
        type: 'error',
        message: 'Did not find a user with "id" of "' + req.params.id + '".'
      })
      return
    }

    for (prop in req.body) {
      if (prop !== '_id') {
        user[prop] = req.body[prop]
      }
    }

    userModel.update({
      _id: user._id
    }, user, {}, (err, numReplaced) => {
      if (err) {
        res.send(err)
        return
      }

      res.json({
        type: 'success',
        message: 'Replaced ' + numReplaced + ' user(s).'
      })
    })
  })
}).get((req, res) => {
  userModel.findOne({
    _id: req.params.id
  }, (err, user) => {
    if (err) {
      res.send(err)
      return
    }

    if (user === null) {
      res.json({
        type: 'error',
        message: 'Did not find a user with "id" of "' + req.params.id + '".'
      })
      return
    }
    res.json(user)
  })
}).delete((req, res) => {
  userModel.remove({
    _id: req.params.id
  }, (err, user) => {
    if (err) {
      res.send(err)
    }
    res.json({
      type: 'success',
      message: 'Successfully deleted user with id "' + req.params.id + '".'
    })
  })
})

module.exports = router
