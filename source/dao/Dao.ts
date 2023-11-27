import { database } from "../db";
import { DaoError } from "../types/errors";
import ICommon from "./types/ICommon";

export default class Dao implements ICommon {
  findAll(sql: string): Promise<Array<any>> {
    return new Promise(function (resolve, reject) {
      database.all(sql, function (err, rows) {
        if (err) {
          reject(new DaoError(20, "Internal server error"));
        } else if (rows === null || rows.length === 0) {
          reject(new DaoError(21, "Entity not found"));
        } else {
          resolve(rows);
        }
      });
    });
  }

  findOne(sql: string, params: Record<any, any>): Promise<Object> {
    return new Promise(function (resolve, reject) {
      let stmt = database.prepare(sql);
      stmt.all(params, function (err, rows) {
        if (err) {
          reject(new DaoError(11, "Invalid arguments"));
        } else if (rows === null || rows.length === 0) {
          reject(new DaoError(21, "Entity not found"));
        } else {
          let row = rows[0] as Object;
          resolve(row);
        }
      });
    });
  }

  existsOne(sql: string, params: Record<any, any>): Promise<boolean> {
    return new Promise(function (resolve, reject) {
      let stmt = database.prepare(sql);
      stmt.each(params, function (err, row: Record<string, number>) {
        if (err) {
          reject(new DaoError(20, "Internal server error"));
        } else if (row) {
          let count = row["found"];
          if (count > 0) resolve(true);
          resolve(false);
        } else {
          console.trace(row);
          reject(new DaoError(21, "Entity not found"));
        }
      });
    });
  }

  run(sql: string, params: Record<any, any>): Promise<boolean> {
    return new Promise(function (resolve, reject) {
      let statement = database.prepare(sql);
      statement.run(params, function (error) {
        if (this.changes === 1) {
          resolve(true);
        } else if (this.changes === 0) {
          reject(new DaoError(21, "Entity Not Found"));
        } else {
          const errno: number = error?.errno;
          const code: string = error?.code;
          if (errno && code) {
            reject(new DaoError(errno, code));
          }
          reject(new DaoError(11, "Invalid Arguments"));
        }
      });
    });
  }
}
