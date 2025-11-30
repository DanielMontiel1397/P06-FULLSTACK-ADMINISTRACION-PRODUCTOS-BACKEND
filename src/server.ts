import express from 'express';
import routeApp from "./routes/appRoutes"
import db from './config/db'
import colors from 'colors'
import morgan from 'morgan'
import cors, {CorsOptions} from 'cors'
import swaggerUI from 'swagger-ui-express'
import swaggerSpec, {swaggerUiOptions} from './config/swagger';

//Contextar a Base de Datos
export async function conectarDB() {
    try {
        await db.authenticate();
        db.sync({alter: true}); //Sincronizar BD en caso de que se creen nuevos modelos o cambios en la BD
        console.log(colors.bgGreen.white.bold('Conexión Exitosa'));
    } catch (error) {
        console.log(error);
        console.log(colors.bgRed.white('Hubo un error al conectar a la BD'));
    }
}

conectarDB();

//Crear Instancia de Express
const app = express();

//Permitir conexiones
const corsOptions : CorsOptions= {
    origin: function(origin, callback) {
        callback(null, true);
        return;
        if(origin === process.env.URL_FRONTEND){
            callback(null, true);
        } else {
            callback(new Error('Error de CORS'), false)
        }
    }
}

app.use(cors(corsOptions));

app.use(morgan('dev'))

//Leer Datos de Formularios
app.use(express.json())

//ROUTING
app.use('/api/productos', routeApp);


//Docs
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUiOptions));

export default app;