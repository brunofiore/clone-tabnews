import database from "infra/database.js";
import orchestrator from "tests/integration/api/v1/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public;");
});
describe("GET /api/v1/migrations", () => {
  describe("Usuário anonimo", () => {
    test("Rodar migrações pendentes", async () => {
      //Valida resposta 200 do http
      const response = await fetch("http://localhost:3000/api/v1/migrations");

      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(Array.isArray(responseBody)).toBe(true);
      //console.log(responseBody);
      expect(responseBody.length).toBeGreaterThan(0);
    });
  });
});
