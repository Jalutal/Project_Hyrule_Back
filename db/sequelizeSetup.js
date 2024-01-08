const UserModel = require('../models/userModel')
const RoleModel = require('../models/roleModel')
const FanficModel = require('../models/fanficModel')
const CommentModel = require('../models/commentModel')
const { setUsers, setRoles, setFanfics, setComments } = require('./setDataSample');
const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize('zelda_fanfic', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false
});

const User = UserModel(sequelize, DataTypes)
const Role = RoleModel(sequelize, DataTypes)
const Fanfic = FanficModel(sequelize, DataTypes)
const Comments = CommentModel(sequelize, DataTypes)




Role.hasMany(User)
User.belongsTo(Role)

User.hasMany(Fanfic)
Fanfic.belongsTo(User) 

User.hasMany(Comments)
Comments.belongsTo(User)


sequelize.sync({ force: true })
    .then(async() => {
        await setRoles(Role)
        await setUsers(User)
        await setFanfics(Fanfic)
        await setComments(Comments)

        

    })
    .catch(error => {
        console.log('this is error',error.message)
    })

    sequelize.authenticate()
    .then(() => console.log('La connexion à la base de données a bien été établie.'))
    .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))


module.exports = { User, Role, Fanfic, Comments, sequelize }