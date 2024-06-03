import { Sequelize } from "sequelize";
// import from env

export const sequelizeInstance = new Sequelize('b7i6rj0ervgyebzboxpk', 'uzwauddfyqd6e4b8', 'UyNriJISspfaYI6BFSpn', {
    host: 'b7i6rj0ervgyebzboxpk-mysql.services.clever-cloud.com',
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
        await sequelizeInstance.sync({ alter: false, force: false });
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.log('Unable to establish a connection.', error);
    }
}

// export default testConnection;
export default dbConnection;