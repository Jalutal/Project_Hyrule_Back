const express = require('express')
const router = express.Router()
const { findAllUsers, findUserByPk, createUser, updateUser, deleteUser } = require('../controllers/userController')
const { login, protect, restrict } = require('../controllers/authController')


router
    .route('/')
    .get(findAllUsers)
    .post(createUser)

router
    .route('/:id')
    .get(findUserByPk)
    .put(protect, updateUser)
    .delete(protect, restrict("superadmin"), deleteUser)

router
    .route('/login')
    .post(login)

    module.exports = router