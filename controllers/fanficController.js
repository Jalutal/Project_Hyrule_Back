const { Fanfic, User, Comments } = require('../db/sequelizeSetup')
const { UniqueConstraintError, ValidationError } = require('sequelize')



const findAllFictions = (req, res) => {
    Fanfic.findAll()
        .then((results) => {
            res.json(results)
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}

const findFictionByPk = (req, res) => {
    Fanfic.findByPk(parseInt(req.params.id), { include: [{model: Comments, include: User}] })
        .then((result) => {
            if (result) {
                res.json({ message: 'Un utilisateur a été trouvé.', data: result })
            } else {
                res.status(404).json({ message: `Aucun utilisateur n'a été trouvé.` })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: 'Une erreur est survenue.', data: error.message })
        })
}

const createFiction = (req, res) => {
    
    console.log(req.body);
        // Possible car le protect a été fait
    User.findOne({ where: { username: req.username } })
    .then(user => {
        if (!user) {
            return res.status(404).json({ message: `L'utilisateur n'a pas été trouvé.` })
        }
        const newFiction = { ...req.body, UserId: user.id }

        // Possible car le protect a été fait
        Fanfic.create(newFiction)
            .then((fiction) => {
                res.status(201).json({ message: 'La fiction a bien été créé', data: fiction })
            })
            .catch((error) => {
                if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                    return res.status(400).json({ message: error.message })
                }
                res.status(500).json({ message: `La fiction n'a pas pu être créé`, data: error.message })
            })
    })
    .catch(error => {
        res.status(500).json(error.message)
    })
}

const updateFiction = (req, res) => {
    Fanfic.findByPk(req.params.id)
    .then((result) => {
        if (result) {
            return result.update(req.body)
            .then(() =>{
                res.status(201).json({ message: `La fiction a bien été mise a jour`, data: result })
            })

        } else {
            res.status(404).json({ message: `Aucune fiction mise à jour`})
        }
    })
    .catch(error => {
        if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
            return res.status(400).json({message: `une erreur est survenue`, data: error.message})
        }
        res.status(500).json({message: `Une erreur est survenue`, data: error.message})
    })
}

const deleteFiction = (req, res) => {
    Fanfic.findByPk(req.params.id)
        .then((result) => {
            if (result) {
                return result.destroy()
                    .then((result) => {
                        res.json({ mesage: `L'utilisateur a bien été supprimé.`, data: result })
                    })
            } else {
                res.status(404).json({ mesage: `Aucun utilisateur trouvé.` })
            }
        })
        .catch((error) => {
            res.status(500).json({ mesage: `La requête n'a pas aboutie.`, data: error.message })
        })
}

module.exports = { findAllFictions, findFictionByPk, createFiction, updateFiction, deleteFiction }