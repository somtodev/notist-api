import { Database } from "sqlite3";

const database = new Database("./instance/sqlite.db");

function init() {
  database.run(
    "CREATE TABLE if not exists users(" +
      "id INTEGER PRIMARY KEY AUTOINCREMENT," +
      "email VARCHAR(255) UNIQUE ," +
      "firstname VARCHAR(100)," +
      "lastname VARCHAR(100)," +
      "password VARCHAR(255)" +
      ")",
  );

  database.run(
    `
      CREATE TABLE IF NOT EXISTS notes(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT,
        user_id INTEGER
      );
    `,
  );
}

export { database, init };
