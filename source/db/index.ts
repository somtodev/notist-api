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
        title VARCHAR(255),
        content TEXT,
        user_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
      );
    `,
  );
}

export { database, init };
