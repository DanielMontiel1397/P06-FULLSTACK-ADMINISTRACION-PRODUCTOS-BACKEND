import app from "./server";
import dotenv from 'dotenv'
import colors from 'colors'

dotenv.config();

const port = process.env.PORT || 4000;

app.listen(4000, () => {
    console.log(colors.cyan.bold(`Escuchando en el puerto ${port}`));
})