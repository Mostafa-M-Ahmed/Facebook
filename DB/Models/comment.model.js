import { DataTypes } from "sequelize";
import { sequelizeInstance } from "../connection.js";
import User from "./user.model.js";
import Post from "./post.model.js";


const Comment = sequelizeInstance.define('Comment',
    {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
        
    },
    {
        timestamps: true    // createdAt, updatedAt
    }
)

Comment.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Comment, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Comment.belongsTo(Post, { foreignKey: 'postId' });
Post.hasMany(Comment, { foreignKey: 'postId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

export default sequelizeInstance.models.Comment || Comment;