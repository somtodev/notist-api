import { DaoError } from "../../types/errors";

export default interface IDao<T> {
  create(object: T): Promise<boolean | DaoError>;
  update(object: T): Promise<boolean | DaoError>;
  exists(key: string): Promise<boolean>;
}
