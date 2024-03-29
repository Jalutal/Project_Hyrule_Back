const express = require('express')
const router = express.Router()
const { findAllFictions, findFictionByPk, createFiction, updateFiction, deleteFiction } = require('../controllers/fanficController')
const { login, protect, restrict } = require('../controllers/authController')


router
    .route('/')
    .get(findAllFictions)
    .post(protect, createFiction)

router
    .route('/:id')
    .get(findFictionByPk)
    .put(protect, restrict("admin"), updateFiction)
    .delete(protect, restrict("admin"), deleteFiction)

router
    .route('/login')
    .post(login)

    module.exports = router