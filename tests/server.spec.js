const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    //Test 1: verificar que ruta GET/cafes funcione correctamente
    it('GET / cafes debería retornar status 200 y un array de al menos 1 objeto', async () => {
        const response = await request(server).get('/cafes')
        //verifica que el status sea 200
        expect(response.status).toBe(200);
        //verifica que el body de la respuesta sea un array
        expect(Array.isArray(response.body)).toBe(true)
        //verifica que el array tenga al menos 1 objeto
        expect(response.body.length).toBeGreaterThan(0);
    });

    //Test 2: comprobar que se devuelve un código 404 al intentar eliminar un café con id que no existe
    it('Al intentar eliminar un café con id que no existe se debería obtener un error', async () => {
        //petición con id que no existe, en este caso 10
        const response = await request(server).delete('/cafes/10')
        //verifica que el status code sea de 404
        expect(response.status).toBeGreaterThanOrEqual(400);
    });
});
