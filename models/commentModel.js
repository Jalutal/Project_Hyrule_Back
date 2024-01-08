module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Comments', {
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    msg: "Le commentaire doit avoir un nombre de caractères compris entre 20 et 250.",
                    args: [4, 50]
                }
            },
        }       
    }
    );
}
