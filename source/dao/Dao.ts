import { database } from "../db";
import { CustomException } from "../types/errors";
import DaoException from "../types/errors/DaoException";
import SqlImp from "./types/SqlImp";

export default class Dao<T> implements SqlImp<T> {
  findAllByFK(sql: string, params: Record<any, any>): Promise<Array<T>> {
    return new Promise(function (resolve, reject) {
      let stmt = database.prepare(sql);
      stmt.all(params, function (err, rows) {
        if (err) {
          reject(new DaoException(11));
        } else {
          resolve(rows as Array<T>);
        }
      });
    });
  }

  findAll(sql: string): Promise<Array<any>> {
    return new Promise(function (resolve, reject) {
      database.all(sql, function (err, rows) {
        if (err) {
          reject(new CustomException(500, "Internal server error"));
        } else if (rows === null || rows.length === 0) {
          reject(new DaoException(21));
        } else {
          resolve(rows);
        }
      });
    });
  }

  findOne(sql: string, params: Record<any, any>): Promise<T> {
    return new Promise(function (resolve, reject) {
      let stmt = database.prepare(sql);
      stmt.all(params, function (err, rows) {
        if (err) {
          reject(new DaoException(11));
        } else {
          let row = rows[0] as T;
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
          reject(new CustomException(500, "Internal server error"));
        } else if (row) {
          let count = row["found"];
          if (count > 0) resolve(true);
          resolve(false);
        } else {
          reject(new DaoException(21));
        }
      });
    });
  }

  run(sql: string, params: Record<any, any>): Promise<boolean> {
    return new Promise(function (resolve, reject) {
      let statement = database.prepare(sql);
      statement.run(params, function (error) {
        if (this.changes >= 1) {
          resolve(true);
        } else if (this.changes === 0) {
          reject(new DaoException(21));
        } else {
          reject(new DaoException(11));
        }
      });
    });
  }
}
