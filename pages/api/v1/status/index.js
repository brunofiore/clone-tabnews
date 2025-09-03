import database from "infra/database.js";
import { TRACE_OUTPUT_VERSION } from "next/dist/shared/lib/constants";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const dbName = process.env.POSTGRES_DB;
  const dbVersion = await database.query("SHOW server_version;");
  const dbMaxConnection = await database.query("SHOW max_connections;");
  const dbUsedConnection = await database.query({
    text: "SELECT COUNT(*)::int AS total_connections FROM pg_stat_activity WHERE state = 'active' AND datname = $1;",
    values: [dbName],
  });
  response.status("200").json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        db_version: dbVersion.rows[0].server_version,
        db_max: parseInt(dbMaxConnection.rows[0].max_connections),
        db_used: dbUsedConnection.rows[0].total_connections,
      },
    },
  });
}

export default status;
