module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "Le nom d'utilisateur est déjà pris."
            },
            validate: {
                len: {
                    msg: "Le nom d'utilisateur doit avoir un nombre de caractères compris entre 3 et 15.",
                    args: [3, 15]
                }
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        onDelete: 'CASCADE',
        defaultScope: {
            attributes: { exclude: ['password'] }
        },
        scopes: {
            withPassword: {
                attributes: {}
            }
        }
    }
    );
}