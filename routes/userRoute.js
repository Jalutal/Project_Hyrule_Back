const express = require('express')
const router = express.Router()
const { findAllUsers, findUserByPk, createUser, updateUser,  deleteUser } = require('../controllers/userController')
const { login, protect, restrict, correctUser } = require('../controllers/authController')


router
    .route('/')
    .get(findAllUsers)
    .post(createUser)

router
    .route('/:id')
    .get(findUserByPk)
    .put(protect, updateUser)
    .delete(protect, correctUser, deleteUser)
    .delete(protect, restrict("admin"), deleteUser)

router
    .route('/login')
    .post(login)

    module.exports = router