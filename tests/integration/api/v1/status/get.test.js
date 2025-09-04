const { resolve } = require("styled-jsx/css");

test("GET no /api/v1/status deve retornar 200", async () => {
  //Valida resposta 200 do http
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
  //Valida recebimento do updatedAt da API
  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  //Valida a versão do banco de dados retornada

  expect(responseBody.dependencies.database.db_version).toEqual(
    expect.any(String),
  );
  expect(responseBody.dependencies.database.db_version.length).toBeGreaterThan(
    0,
  );

  //valida a quantidade maxima de conexões ao banco

  expect(responseBody.dependencies.database.db_max).toEqual(expect.any(Number));
  expect(responseBody.dependencies.database.db_max).toBeGreaterThan(0);

  //valida númerom de conexoes ativas do banco

  expect(responseBody.dependencies.database.db_used).toEqual(
    expect.any(Number),
  );
  expect(responseBody.dependencies.database.db_used).toBeGreaterThan(0);
});
