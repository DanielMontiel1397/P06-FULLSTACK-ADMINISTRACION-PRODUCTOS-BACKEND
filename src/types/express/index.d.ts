import Producto from "../../models/Producto";

export {}

declare global {
    namespace Express {
        interface Request {
            producto?: Producto;
        }
    }
}