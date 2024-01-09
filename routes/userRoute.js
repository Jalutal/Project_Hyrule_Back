const express = require('express')
const router = express.Router()
const { findAllUsers, findUserByPk, createUser, updateUser,  deleteUser } = require('../controllers/userController')
const { login, protect, restrict } = require('../controllers/authController')
const { getUserInfo } = require('../controllers/userController');

router
    .route('/')
    .get(findAllUsers)
    .post(createUser)

router
    .route('/:id')
    .get(findUserByPk)
    .put(protect, updateUser)
    .delete(protect, restrict("admin"), deleteUser)

router
    .route('/login')
    .post(login)

router
.route('/users/info')
.get(protect, getUserInfo);

    module.exports = router;