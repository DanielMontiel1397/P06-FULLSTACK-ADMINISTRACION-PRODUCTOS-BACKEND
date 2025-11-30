import { Router } from "express";
import { obtenerProductos, obtenerProducto, crearProducto, editarProducto, eliminarProducto, habilitarProducto } from "../controller/appController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware";
import { validarProducto } from "../middleware/validarProductoExistente";

const route = Router();

//////SCHEMAS SWAGGER////

/** 
*@swagger
*components:
*   schemas:
*       Producto:
*           type: object
*           properties:
*               data: 
*                   type: object
*                   description: Informacion de Producto
*                   properties:
*                       id:
*                           type: integer
*                           description: The Product ID
*                           example: 1
*                       name:
*                           type: string
*                           description:   Nombre del Producto
*                           example: Monitor Curbo de 49 pulgadas
*                       price:
*                           type: number
*                           description:  Precio del Producto
*                           example: 559
*                       disponibilidad:
*                           type: boolean
*                           description:    Disponibilidad del Producto
*                           example: true
*               msg:
*                   type: string
*                   description: Mensaje de respuesta
*                   example: Producto Eliminado Correctamente
*       ProductoEliminado:
*           type: object 
*           properties:
*               msg:
*                   type: string
*                   description: Mensaje de respuesta
*                   example: Producto Eliminado Correctamente
* 
*/

///////DOCUMENTACION OBTENER PRODUCTOS////

/**
 * @swagger
 * /api/productos:
 *      get:
 *          summary: Obtener una lista de Productos
 *          tags: 
 *              - Productos
 *          description: Retorna una lista de Productos
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                   $ref: '#/components/schemas/Producto'
 */

///////OBTENER CREAR PRODUCTO////

/**
 * @swagger
 * /api/productos/{id}:
 *      get:
 *          summary: Obtener un Producto por ID
 *          tags: 
 *              - Productos
 *          description: Retornamos información de un Producto básdado por su ID
 *          parameters: 
 *          - in: path
 *            name: id
 *            description: El ID del producto a obtener
 *            required: true
 *            schema:
 *              type: integer
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Producto'
 *              404:
 *                  description: Producto no Encontrado
 *              400:
 *                  description: ID Inválido
 *                  
 *              
 */

///////DOCUMENTACION CREAR PRODUCTO////

/**
 * @swagger
 * /api/productos:
 *      post:
 *          summary: Crear un Producto
 *          tags: 
 *              - Productos
 *          description: Devuelve un nuevo registro en la base de datos
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor Curvo 49 Pulgadas"
 *                              price:
 *                                  type: number
 *                                  example: 599
 *          responses:
 *              201:
 *                  description: Producto creado correctamente
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Producto'
 *              400:
 *                  description: Producto no encontrado - Inputs inválidos
 *                  
 *              
 */


///////DOCUMENTACION ACTUALIZAR UN PRODUCTO////

/**
 * @swagger
 * /api/productos/{id}:
 *      put:
 *          summary: Actualizar un Producto por ID
 *          tags: 
 *              - Productos
 *          description: Devuelve un Producto actualizado por su ID
 *          parameters:
 *              - in: path
 *                name: id
 *                description: El ID del producto a obtener
 *                required: true
 *                schema:
 *                    type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor Curvo 49 Pulgadas"
 *                              price:
 *                                  type: number
 *                                  example: 599
 *                              disponibilidad:
 *                                  type: boolean
 *                                  example: true
 *          responses:
 *              200:
 *                  description: Producto Actualizado Correctamente
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Producto'
 *              400:
 *                  description: Producto no encontrado - Inputs inválidos o ID inválido
 *              404:
 *                  description: Producto no encontrado
 *                  
 *              
 */

///////DOCUMENTACION DISPONIBILIDAD DE UN PRODUCTO////

/**
 * @swagger
 * /api/productos/{id}:
 *      patch:
 *          summary: Actualizar Disponibilidad de un Producto por ID
 *          tags: 
 *              - Productos
 *          description: Devuelve un Producto actualizado por su ID
 *          parameters:
 *              - in: path
 *                name: id
 *                description: El ID del producto a obtener
 *                required: true
 *                schema:
 *                    type: integer
 *          responses:
 *              200:
 *                  description: Producto Actualizado Correctamente
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Producto'
 *              400:
 *                  description: Producto no encontrado - Inputs inválidos o ID inválido
 *              404:
 *                  description: Producto no encontrado
 *                  
 *              
 */

///////DOCUMENTACION ELIMINAR UN PRODUCTO////

/**
 * @swagger
 * /api/productos/{id}:
 *      delete:
 *          summary: Eliminar un Producto por ID
 *          tags: 
 *              - Productos
 *          description: Elimina un Producto de la Base de Datos
 *          parameters:
 *              - in: path
 *                name: id
 *                description: El ID del producto a obtener
 *                required: true
 *                schema:
 *                    type: integer
 *          responses:
 *              200:
 *                  description: Producto Actualizado Correctamente
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Producto'
 *              400:
 *                  description: Producto no encontrado - Inputs inválidos o ID inválido
 *              404:
 *                  description: Producto no encontrado
 *                  
 *              
 */

route.get('/', obtenerProductos);
route.get('/:id',
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    validarProducto,
    obtenerProducto);

route.post('/',
    body('name')
        .notEmpty().withMessage('El nombre del Producto no puede ir vacio'),
    body('price')
        .notEmpty().withMessage('El precio del Producto no puede ir vacio')
        .isNumeric().withMessage('Valor no válido')
        .custom(value => value > 0).withMessage('Precio no válido'),
    handleInputErrors,
    crearProducto
);

route.put('/:id',
    param('id').isInt().withMessage('ID no válido'),
    body('name')
        .notEmpty().withMessage('El nombre del Producto no puede ir vacio'),
    body('price')
        .notEmpty().withMessage('El precio del Producto no puede ir vacio')
        .isNumeric().withMessage('Valor no válido')
        .custom(value => value > 0).withMessage('Precio no válido'),
    body('disponibilidad')
        .isBoolean().withMessage('Valor para disponibilidad no válido'),
    handleInputErrors,
    validarProducto,
    editarProducto
);

route.patch('/:id',
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    validarProducto,
    habilitarProducto);


route.delete('/:id',
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    validarProducto,
    eliminarProducto)


export default route;