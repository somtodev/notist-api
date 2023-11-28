export default interface CommonOperations<T> {
  create(object: T): Promise<boolean>;
  update(object: T): Promise<boolean>;

  retreiveAll(pk: string | number): Promise<Array<T>>;
  retreiveOne(id: string, pk: string): Promise<T>;

  deleteOne(id: string | number): Promise<boolean>;
  exists(key: string): Promise<boolean>;
}
