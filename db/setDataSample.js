const mockUsers = require('./mockUsers')
const mockFanfic = require('./mockFanfic')
const mockComments = require('./mockComments')
const bcrypt = require('bcrypt')

const setUsers = (User) => {
    return Promise.all([mockUsers.map(user => {
        return bcrypt.hash(user.password, 10)
            .then(hashResult => {
                return User.create({ ...user, password: hashResult })
                    .then(() => { ;})
                    .catch((error) => {
                        console.log(error.message)
                    })
            })
    })])
}

const setFanfics = (Fanfic) => {
    return Promise.all([mockFanfic.map(fanfic => {
                return Fanfic.create(fanfic)
    })])
}

const setComments = (Comments) => {
    return Promise.all([mockComments.map(comments => {
                return Comments.create(comments)       
    })])
}


const setRoles = (Role) => {
    return Promise.all([Role.create({ label: "admin" }), Role.create({ label: "edit" })])
}



module.exports = { setUsers, setRoles, setFanfics, setComments }
