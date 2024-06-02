import { Sequelize } from "sequelize";
// import from env

export const sequelizeInstance = new Sequelize('test2', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const testConnection = async () => {
    try {
        await sequelizeInstance.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.log('Unable to establish a connection.', error);
    }
}

// sync
export const dbConnection = async () => {
    try {
        await sequelizeInstance.sync({ alter: false, force: false});
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.log('Unable to establish a connection.', error);
    }
}

// export default testConnection;
export default dbConnection;