
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('assignment6', "root", "", {
    host : "localhost",
    dialect : "mysql"
})

    sequelize.authenticate()
    .then(() => {
        console.log(`DB connection Done....! Host: ${sequelize.config.host}`)
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });



export default sequelize;