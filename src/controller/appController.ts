import { Request, Response } from "express";
import Producto from "../models/Producto";

const obtenerProductos = async (req: Request, res: Response) => {

    try {
        const productos = await Producto.findAll({
            order: [
                ['price', 'DESC']
            ],
            attributes: {exclude: ['updatedAt']}
        });

        return res.json({
            data: productos,
            msg: 'Productos Obtenidos'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Hubo un error al obtener los productos'
        })
    }
    
}

const obtenerProducto = async (req: Request, res: Response) => {

    const producto = req.producto!; 
    try {

        return res.json({
            data: producto,
            msg: 'Producto obtenido correctamente'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Hubo un error al obtener el producto'
        })
    }
   
}

const crearProducto = async (req: Request, res: Response) => {
    console.log(req.body);
    
    try {
        const producto = await Producto.create(req.body)

        return res.status(201).json({
            data: producto,
            msg: 'Producto Agregado Correctamente'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Hubo un error al crear el producto'
        });
    }
}

const editarProducto = async (req: Request, res: Response) => {

    const producto = req.producto;
    try {

        //Actualizar Producto
        await producto.update(req.body);
        const productoAlmacenado = await producto.save();

        return res.json({
            data: productoAlmacenado,
            msg: 'Producto actualizado correctamente'
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Hubo un error al actualizar el producto'
        })
    }
}

const habilitarProducto = async (req: Request, res: Response) => {

    const producto = req.producto;

    try {
        
        //Actualizar Producto
        producto.disponibilidad = !producto.dataValues.disponibilidad;
        await producto.save();

        return res.json({
            data: producto,
            msg: 'Producto actualizado correctamente'
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Hubo un error al actualizar el producto'
        })
    }
}

const eliminarProducto = async (req: Request, res: Response) => {

    const producto = req.producto;

    try {
        
        await producto.destroy();

        return res.json({
            data: producto,
            msg: 'Producto eliminado correctamente'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Hubo un error al actualizar el producto'
        })
    }

}


export {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    editarProducto,
    eliminarProducto,
    habilitarProducto
}