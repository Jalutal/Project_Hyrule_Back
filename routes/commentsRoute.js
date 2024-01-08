const express = require('express')
const router = express.Router()
const { findAllComments, findCommentByPk, createComment, updateComment, deleteComment } = require('../controllers/commentsController')
const { login, protect } = require('../controllers/authController')


router
    .route('/')
    .get(findAllComments)
    .post(createComment)

router
    .route('/:id')
    .get(findCommentByPk)
    .put(protect, updateComment)
    .delete(protect, deleteComment)

router
    .route('/login')
    .post(login)

    module.exports = router