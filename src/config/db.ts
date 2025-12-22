import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv'
dotenv.config();

const db = new Sequelize(process.env.BD_URL_EXTERNAL!,{
    models: [__dirname + '/../models/**/*'],
    dialectOptions: {
        ssl: process.env.NODE_ENV === 'production' ? {
            requiere: false,
            rejectUnauthorized: false
        } : false
    },
    logging: false
});

export default db;