'use strict';

const express = require('express');
const Data = require('./data');

const router = express.Router();

/* ========== GET/READ ALL ITEMS ========== */
router.get('/', (req, res, next) => {
  const {searchTerm} = req.query;
  let filter = {};
  if (searchTerm) {
    filter.name = { $regex: searchTerm };
  }
  return Data.find(filter).sort({ updatedAt: 'desc' })
    .then((results) => {
      if (results) {
        res.json(results);
      } else {
        next();
      }
    })
    .catch((err) => next(err)); 
});

/* ========== GET/READ A SINGLE ITEM ========== */
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  return Data.findById(id)
    .then((results) => {
      if (results) {
        res.json(results);
      } else {
        next();
      }
    })
    .catch((err) => next(err)); 
});

/* ========== POST/CREATE AN ITEM ========== */
router.post('/', (req, res, next) => {
  const {name} = req.body;
  const newItem = {
    name
  };
  if (!name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }
  return Data.create(newItem)
    .then((results) => {
      if (results) {
        res.json(results);
      } else {
        next();
      }
    })
    .catch(err => {
      if (err.code === 11000) {
        err = new Error('The name already exists');
        err.status = 400;
      }
      next(err);
    });
});

/* ========== PUT/UPDATE A SINGLE ITEM ========== */
router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const {name} = req.body;
  const updateObj = {
    name
  };
  if (!updateObj.name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }
  return Data.findByIdAndUpdate(id, updateObj, {new: true})
    .then((results) => {
      if (results) {
        res.json(results);
      } else {
        next();
      }
    })
    .catch(err => {
      if (err.code === 11000) {
        err = new Error('The name already exists');
        err.status = 400;
      }
      next(err);
    });
});

/* ========== DELETE/REMOVE A SINGLE ITEM ========== */
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  return Data.findByIdAndRemove(id)
    .then((results) => {
      if (results) {
        res.status(204).end();
      } else {
        next();
      }
    })
    .catch((err) => next(err)); 
});

module.exports = router;