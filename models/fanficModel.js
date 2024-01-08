module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Fanfic', {
        fictionname: {
            type: DataTypes.STRING,
            // allowNull: false,
            // unique: {
            //     msg: "Le nom de la fiction est déjà pris."
            // },
            // validate: {
            //     len: {
            //         msg: "Le nom de la fiction doit avoir un nombre de caractères compris entre 4 et 50.",
            //         args: [4, 50]
            //     }
            // },
        },
        story: {
            type: DataTypes.TEXT,
            // allowNull: false,
            // validate: {
            //     len: {
            //         msg: "Le résumé de la fiction doit avoir un nombre de caractères compris entre 150 et 3000.",
            //         args: [8, 3000]
            //     }
            // },
        },
        category: {
            type: DataTypes.STRING,
            // allowNull: false
        },
       
        
        
    }
    );
}
