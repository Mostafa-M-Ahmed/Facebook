import { DataTypes } from "sequelize";
import { sequelizeInstance } from "../connection.js";
import bcrypt from "bcrypt";


    const User = sequelizeInstance.define('User',
        {
            id: {
                type: DataTypes.INTEGER(11),
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            loginFlag: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false
            }
        },
        {
            hooks: {
                beforeCreate: async (user) => {
                    if (user.password) {
                        const salt = await bcrypt.genSalt(10);
                        user.password = await bcrypt.hash(user.password, salt);
                    }
                },
                beforeUpdate: async (user) => {
                    if (user.password && user.changed('password')) {
                        const salt = await bcrypt.genSalt(10);
                        user.password = await bcrypt.hash(user.password, salt);
                    }
                },
            },
        },
        {
            indexes: [
                {
                    unique: true,
                    fields: ['email']
                }
            ]
        },
        {
            timestamps: true    // createdAt, updatedAt
        }
    )

    User.prototype.validPassword = async function (password) {
        return await bcrypt.compare(password, this.password);
    };

    export default User;