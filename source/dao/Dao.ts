import { database } from "../db";
import Note from "../models/Note";
import { CustomException } from "../types/errors";
import ICommon from "./types/ICommon";

export default class Dao implements ICommon {
  findAllByFK(sql: string, params: Record<any, any>): Promise<Array<Note>> {
    return new Promise(function (resolve, reject) {
      let stmt = database.prepare(sql);
      stmt.all(params, function (err, rows) {
        if (err) {
          reject(new CustomException(400, "Invalid arguments"));
        } else {
          resolve(rows as Array<Note>);
        }
      });
    });
  }

  findAll(sql: string): Promise<Array<any>> {
    return new Promise(function (resolve, reject) {
      database.all(sql, function (err, rows) {
        if (err) {
          reject(new Error("Internal server error"));
        } else if (rows === null || rows.length === 0) {
          reject(new Error("Entity not found"));
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
          reject(new CustomException(400, "Invalid arguments"));
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
          reject(new Error("Internal server error"));
        } else if (row) {
          let count = row["found"];
          if (count > 0) resolve(true);
          resolve(false);
        } else {
          reject(new Error("Entity not found"));
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
          reject(new Error("Entity Not Found"));
        } else {
          reject(new Error("Invalid Arguments"));
        }
      });
    });
  }
}
