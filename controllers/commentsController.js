const { Comments } = require('../db/sequelizeSetup')
const { UniqueConstraintError, ValidationError } = require('sequelize')
const bcrypt = require('bcrypt')


const findAllComments = (req, res) => {
    Comments.findAll()
        .then((results) => {
            res.json(results)
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}

const findCommentByPk = (req, res) => {
    Fanfic.findByPk((parseInt(req.params.id)))
        .then((result) => {
            if (result) {
                res.json({ message: 'Un commentaire a été trouvé.', data: result })
            } else {
                res.status(404).json({ message: `Aucun commentaire n'a été trouvé.` })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: 'Une erreur est survenue.', data: error.message })
        })
}

const createComment = (req, res) => {
        
            Comments.create({ ...req.body })
                .then((user) => {
                    res.status(201).json({ message: `Le commentaire a bien été créé`, data: user })
                })
                .catch((error) => {
                    if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                        return res.status(400).json({ message: error.message })
                    }
                    res.status(500).json({ message: `Le commentaire n'a pas pu être créé`, data: error.message })
                })
        
        
}

const updateComment = (req, res) => {
    Comments.findByPk(req.params.id)
        .then((result) => {
            console.log(result)
            if (result) {
                return result.update(req.body)
                    .then(() => {
                        res.status(201).json({ message: `Le commentaire a bien été mis à jour.`, data: result })
                                })
            } else {
                res.status(404).json({ message: `Aucun commentaire à mettre à jour n'a été trouvé.` })
            }
        })
        .catch(error => {
            if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                return res.status(400).json({ message: error.message })
            }
            res.status(500).json({ message: 'Une erreur est survenue.', data: error.message })
        })
}

const deleteComment = (req, res) => {
    Comments.findByPk(req.params.id)
        .then((result) => {
            if (result) {
                return result.destroy()
                    .then((result) => {
                        res.json({ mesage: `Le commentaire a bien été supprimé.`, data: result })
                    })
            } else {
                res.status(404).json({ mesage: `Aucun commentaire trouvé.` })
            }
        })
        .catch((error) => {
            res.status(500).json({ mesage: `La requête n'a pas aboutie.`, data: error.message })
        })
}

module.exports = { findAllComments, findCommentByPk, createComment, updateComment, deleteComment }