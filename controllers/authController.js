const { User, Role } = require('../db/sequelizeSetup')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET_KEY = require('../configs/tokenData')

const rolesHierarchy = {
    edit: ["edit"],
    admin: ["admin", "edit"],
}

const login = (req, res) => {
    // A. On vérifie que l'utilisateur qui tente de se connecter existe bel et bien dans notre BDD
    User.scope('withPassword').findOne({ where: { username: req.body.username } })
        .then((result) => {
            // B. Si l'utilisateur n'existe pas, on renvoie une réponse erreur Client
            if (!result) {
                return res.status(404).json({ message: `Le nom d'utilisateur n'existe pas.` })
            }

            return bcrypt.compare(req.body.password, result.password)
                .then((isValid) => {
                    if (!isValid) {
                        return res.status(401).json({ message: `Le mot de passe n'est pas valide.` })
                    }
                    const token = jwt.sign({
                        data: result.username,
                        dataId: result.id
                    }, SECRET_KEY, { expiresIn: '10h' });

                    // Possibilité de stocker le jwt dans un cookie côté client
                    // res.cookie('coworkingapi_jwt', token)
                    res.json({ message: `Login réussi`, data: token })
                })
        })
        .catch((error) => {
            res.status(500).json({ data: error.message })
        })
}

const protect = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: `Vous n'êtes pas authentifié.` })
    }

    const token = req.headers.authorization.split(' ')[1]

    // Possibilité de stocker le jwt dans un cookie côté client
    // if (!req.cookies.coworkingapi_jwt) {
    //     return res.status(401).json({ message: `Vous n'êtes pas authentifié.` })
    // }

    // const token = req.cookies.coworkingapi_jwt

    if (token) {
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            req.username = decoded.data
            next()
        } catch (error) {
            return res.status(403).json({ message: `Le token n'est pas valide.` })
        }
    }
}

// Ajouter le paramètre labelRole
const restrict = (labelRole) => {
    return (req, res, next) => {
        User.findOne({
            where: {
                username: req.username
            }
        })
            .then(user => {
                Role.findByPk(user.RoleId)
                    .then(role => {
                        if (rolesHierarchy[role.label].includes(labelRole)) {
                            next();
                        } else {
                            res.status(403).json({ message: `Droits insuffisants` });
                        }
                    })
                    .catch(error => {
                        console.log(error.message);
                    });
            })
            .catch(error => {
                console.log(error);
            });
    };
};


// Implémenter le middleware qui sera utilisé sur updateCoworking et deleteCoworking, qui permmettra d'interagir sur la ressource seulement si on en est l'auteur. Si ce n'est pas le cas, on renvoie une erreur 403.
const restrictToOwnUser = (model) => {
    return (req, res, next) => {
        User.findOne(
            {
                where:
                    { username: req.username }
            })
            .then(user => {
                if (!user) {
                    return res.status(404).json({ message: `Pas d'utilisateur trouvé.` })
                }
                // on teste d'abord si le user est admin
                return Role.findByPk(user.RoleId)
                    .then(role => {
                        if (rolesHierarchy[role.dataValues.label].includes('admin')) {
                            return next()
                        }
                        model.findByPk(req.params.id)
                            .then(resource => {
                                if (!resource) return res.status(404).json({ message: `La ressource n'existe pas.` })
                                if (user.id === resource.UserId) {
                                    next()
                                } else {
                                    res.status(403).json({ message: `Vous n'êtes pas l'auteur de la ressource.` })
                                }
                            })
                            .catch(error => {
                                return res.status(500).json({ message: error.message })
                            })
                    })
            })
            .catch(error => console.log(error.message))
    }
}

const correctUser = (req, res, next) => {
    User.findOne({ where: { username: req.username } })
        .then(authUser => {
            console.log(authUser.id, parseInt(req.params.id))
            if (authUser.id === parseInt(req.params.id)) {
                next()
            } else {
                res.status(403).json({ message: "Droits insuffisants." })
            }
            // Role.findByPk(authUser.RoleId)
            //     .then(role => {
            //         // if (rolesHierarchy[role.label].includes('admin')) {
            //         //     return next()
            //         // }

            //         if (authUser.id === req.params.id) {
            //             next()
            //         } else {
            //             res.status(403).json({ message: "Droits insuffisants." })
            //         }
            //     })
        })
        .catch(error => {
            res.status(500).json({ message: error.message })
        })
    // if (result.id !== req.params.id) {
    //     return res.status(403).json({ message: 'Droits insuffisants.' })
    // }
}

module.exports = { login, protect, restrict, restrictToOwnUser, correctUser }
