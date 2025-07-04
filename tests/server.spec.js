const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    //Test 1: verificar que ruta GET/cafes funcione correctamente
    it('GET / cafes debería retornar status 200 y un array de al menos 1 objeto', async () => {
        const response = await request(server).get('/cafes')
        //verificar que el status sea 200
        expect(response.status).toBe(200);
        //verificar que el body de la respuesta sea un array
        expect(Array.isArray(response.body)).toBe(true)
        //verificar que el array tenga al menos 1 objeto
        expect(response.body.length).toBeGreaterThan(0);
    });

    //Test 2: comprobar que se devuelve un código 404 al intentar eliminar un café con id que no existe
    it('Al intentar eliminar un café con id que no existe se debería obtener un error', async () => {
        //petición con id que no existe, en este caso 10
        const response = await request(server).delete('/cafes/10')
        //verificar que el status code sea de 404
        expect(response.status).toBeGreaterThanOrEqual(400);
    });

    //Test 3: comprobar que la ruta POST / cafes agregue un nuevo café y devuelva un código 201
    it('Al agregar un nuevo café con la ruta POST/cafes, debería devolver un código 201', async () => {
        //definir los datos del nuevo café
        const nuevoCafe = {
            nombre: "Latte"
        }

        //petición post enviando datos en el body
        const response = await request(server)
            .post('/cafes')
            .send(nuevoCafe);

        //verificar que el status sea 201
        expect(response.status).toBe(201);
    });

    //Test 4: comprobar que la ruta PUT / cafes devuelva un status code 400 si se intenta actualizar un café con id diferente al del payload
    it('Si el ID de los parámetros es diferente al ID del payload debería arrojar un status code 400', async () => {
        const datosCafe = {
            id: 5,
            cafe: "Caramel Macchiato"
        };

        //petición put a /cafes/3 (id diferente) pero el body tiene id = 5
        const response = await request(server)
            .put('/cafes/3')
            .send(datosCafe)

        //verificar que retorne status code 400
        expect(response.status).toBe(400)
    });
});
