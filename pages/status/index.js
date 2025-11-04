import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status:</h1>
      <UpdatedAt />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";
  let dbVersionText = "Carregando...";
  let dbMaxText = "Carregando...";
  let dbUsedText = "Carregando...";
  let dbNameText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
    dbVersionText = data.dependencies.database.db_version;
    dbMaxText = data.dependencies.database.db_max;
    dbUsedText = data.dependencies.database.db_used;
    dbNameText = data.dependencies.database.db_name;
  }
  return (
    <>
      <h2 style={{ color: "green" }}>Online</h2>
      <div>Última atualização: {updatedAtText}</div>
      <h2>Banco de dados:</h2>
      <div>Versão Banco de dados: {dbVersionText}</div>
      <div>Número máximo de usuários no Banco de dados: {dbMaxText}</div>
      <div>Número de usuários em uso no Banco de dados: {dbUsedText}</div>
      <div>Nome do Banco de dados: {dbNameText}</div>
    </>
  );
}
