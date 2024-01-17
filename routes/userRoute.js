const express = require('express')
const router = express.Router()
const { findAllUsers, findUserByPk, createUser, updateUser, deleteUser } = require('../controllers/userController')
const { login, protect, restrictToOwnUser } = require('../controllers/authController')
const { getUserInfo } = require('../controllers/userController');
const { User } = require('../db/sequelizeSetup')

router
    .route('/')
    .get(findAllUsers)
    .post(createUser)

router
    .route('/:id')
    .get(findUserByPk)
    .put(protect, updateUser)
    .delete(protect, restrictToOwnUser(User), deleteUser)

router
    .route('/login')
    .post(login)

router
    .route('/users/info')
    .get(protect, getUserInfo);

    module.exports = router;