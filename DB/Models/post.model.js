import { DataTypes } from "sequelize";
import { sequelizeInstance } from "../connection.js";
import User from "./user.model.js";
// const User  = require("../user.model.js");

const Post = sequelizeInstance.define('Post',
    {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        deleteFlag: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        timestamps: true    // createdAt, updatedAt
    }
)



Post.belongsTo(User, { foreignKey: 'author' });
User.hasMany(Post, { foreignKey: 'author', onDelete: 'CASCADE', onUpdate: 'CASCADE' });


export default sequelizeInstance.models.Post || Post;