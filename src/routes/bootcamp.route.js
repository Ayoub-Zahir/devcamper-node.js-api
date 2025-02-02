const express = require('express');
const router = express.Router();
const {
    getBootcamps,
    getBootcamp,
    addBootcamp,
    updateBootcamp,
    deleteBootcamp
} = require('../controllers/bootcamp.controller');

router
    .route('/')
    .get(getBootcamps)
    .post(addBootcamp);

router
    .route('/:id')
    .get(getBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp);

module.exports = router;