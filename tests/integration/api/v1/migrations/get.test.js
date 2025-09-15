import database from "infra/database.js";

const { resolve } = require("styled-jsx/css");

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

test("GET no /api/v1/migrations deve retornar 200", async () => {
  //Valida resposta 200 do http
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  expect(Array.isArray(responseBody)).toBe(true);
  //console.log(responseBody);
  expect(responseBody.length).toBeGreaterThan(0);
});
