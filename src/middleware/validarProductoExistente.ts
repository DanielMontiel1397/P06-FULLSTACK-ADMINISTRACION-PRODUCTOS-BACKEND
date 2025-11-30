import { Request, Response, NextFunction } from "express";
import Producto from "../models/Producto";

export const validarProducto = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;

    try {
        const producto = await Producto.findByPk(id);
        if(!producto){
            return res.status(404).json({
                msg: 'Producto no encontrado'
            })
        }
        req.producto = producto;
        next()
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hubo un error al encontrar el producto'
        })
    }
}