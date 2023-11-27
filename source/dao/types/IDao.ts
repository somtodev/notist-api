export default interface IDao<T> {
  create(object: T): Promise<boolean>;
  fetchAll(pk: string | number): Promise<Array<T>>;
  update(object: T): Promise<boolean>;
  exists(key: string): Promise<boolean>;
}
