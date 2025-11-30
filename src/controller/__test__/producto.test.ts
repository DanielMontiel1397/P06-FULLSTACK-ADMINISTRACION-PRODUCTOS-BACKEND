import request from 'supertest';
import app from '../../server'

//TEST PARA LA CREACION DE PRODUCTOS
describe('POST /api/productos', () => {

    //Validación de campos
    it('should display validation errors', async () => {
        const response = await request(app).post('/api/productos').send({});
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveLength(4)

        expect(response.status).not.toBe(404);
        expect(response.body.error).not.toHaveLength(2)
    })

    //Validar el precio
    it('should validated that the price is greater than 0', async () => {
        const response = await request(app).post('/api/productos').send({
            name: 'Monitor Curvo - test',
            price: 0
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveLength(1)

        expect(response.status).not.toBe(404);
        expect(response.body.error).not.toHaveLength(2)
    })

    //Validar precio mayor a 0 y number
    it('should validated that the price is greater than 0', async () => {
        const response = await request(app).post('/api/productos').send({
            name: 'Monitor Curvo - test',
            price: "hola"
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toHaveLength(2)

        expect(response.status).not.toBe(404);
        expect(response.body.error).not.toHaveLength(3)
    })

    //Validar producto creado correctamente
    it('shound create a new product', async () => {
        const response = await request(app).post('/api/productos').send({
            name: "Mouse - Testing",
            price: 50
        })

        expect(response.status).toEqual(201);
        expect(response.body).toHaveProperty('data');
        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('error')
    })
})

//TEST PARA LA OBTENCIÓN DE PRODUCTOS
describe('GET /api/productos', () => {

    it('should check if api/products url existes', async () => {
        const response = await request(app).get('/api/productos')
        expect(response.status).not.toBe(404);
    })
    it('GET a JSON response with products', async () => {
        const response = await request(app).get('/api/productos')

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveLength(1);

        expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveProperty('error')
    })

})

//TEST PARA LA OBTENCIÓN DE UN SOLO PRODUCTO
describe('GET /api/productos:id', () => {
    it('Should return a 404 response for a non-existent product', async () => {
        const productId = 35;
        const response = await request(app).get(`/api/productos/${productId}`);

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Producto no encontrado')
    })

    it('should check a valid ID in the url', async () => {
        const response = await request(app).get('/api/productos/not-valid-url');

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toHaveLength(1);
        expect(response.body.error[0].msg).toBe('ID no válido')
    })

    it('get a JSON response for a single product', async () => {
        const response = await request(app).get('/api/productos/1');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');

    })

})

//TEST PARA LA ACTUALIZACIÓN DE PRODUCTOS
describe('PUT /api/productos:id', () => {

    //Validar que el parametro este correcto
    it('should check a valid ID in the url', async () => {
        const response = await request(app)
                                    .put('/api/productos/not-valid-url')
                                    .send({
                                        name: 'Monitor Curvo 25 pulgadas',
                                        disponibilidad: false,
                                        price: 300
                                    });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toHaveLength(1);
        expect(response.body.error[0].msg).toBe('ID no válido')
    })

    //Validar que los campos esten llenos
    it('should display validation error messages when updating a product', async () => {
        const productID = 2;
        const response = await request(app).put('/api/productos/1').send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBeTruthy();
        expect(response.body.error).toHaveLength(5);

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    })

    //Validar que el precio sea un valor válido
    it('should validate that the price is grater than 0', async () => {
        const productID = 2;
        const response = await request(app)
            .put('/api/productos/1')
            .send({
                name: 'Monitor Curvo 25 pulgadas',
                disponibilidad: false,
                price: -300
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBeTruthy();
        expect(response.body.error).toHaveLength(1);

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    })

    //Validar que el producto existe
    it('Should return a 404 response for a non-existent product', async () => {
        const productID = 354
        const response = await request(app)
                                .put(`/api/productos/${productID}`)
                                .send({
                                    name: 'Monitor Curvo 25 pulgadas',
                                    disponibilidad: false,
                                    price: 300
                                });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Producto no encontrado');

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');

    })

    //Validar que el producto se actualizo correctamente
    it('Should update an existing product with valid data', async () => {
        const productID = 1;
        const response = await request(app)
                                .put(`/api/productos/${productID}`)
                                .send({
                                    name: 'Monitor Curvo 25 pulgadas',
                                    disponibilidad: true,
                                    price: 300
                                });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.msg).toBe('Producto actualizado correctamente');

        expect(response.status).not.toBe(400);
        expect(response.body).not.toHaveProperty('error');

    })
   
})

//TEST PARA EL PATCH DE PRODUCTOS
describe('PATCH /api/productos/:id', () => {
    it('should return a 404 response for a non-existing product', async () => {
        const productID =2000;
        const response = await request(app).patch(`/api/productos/${productID}`);
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Producto no encontrado');
        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    })
    
    it('should update the product availability', async ()=> {
        const response = await request(app).patch('/api/productos/1')
        expect(response.status).toBe(200);
        expect(response.body.msg).toBe('Producto actualizado correctamente')
        expect(response.body).toHaveProperty('data');
        expect(response.body.data.disponibilidad).toBe(false);

        expect(response.body).not.toHaveProperty('error');
        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)
    })
})

//TEST PARA LA ELIMINACIÓN DE PRODUCTOS
describe('DELETE /api/productos/id', () => {

    //VALIDAR PARAMETRO DE LA URL
    it('should check a valid ID',async () => {
        const response = await request(app).delete('/api/productos/not-valid');
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error[0].msg).toBe('ID no válido');
    })

    //VERIFICAR QUE EL PRODUCO EXISTE
    it('should return a 404 response for a non-existent product', async() => {
        const productID = 2000;
        const response = await request(app).delete(`/api/productos/${productID}`);

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Producto no encontrado');

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');expect
    })

    //PRODUCTO ELIMINADO CORRECTAMENTE
    it('should delete a product', async () => {
        const response = await request(app).delete('/api/productos/1');

        expect(response.status).toBe(200);
        expect(response.body.msg).toBe('Producto eliminado correctamente');

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)
    })
})

