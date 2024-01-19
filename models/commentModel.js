module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Comments', {
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    msg: "Le commentaire doit avoir un nombre de caractères compris entre 2 et 250.",
                    args: [2, 250]
                }
            },
        }       
    }
    );
}
