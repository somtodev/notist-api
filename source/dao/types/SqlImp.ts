export default interface SqlImp<T> {
  run(sql: string, params: Record<any, any>): Promise<boolean>;
  findAll(sql: string): Promise<Array<T>>;
  findOne(sql: string, params: Record<any, any>): Promise<T>;
  existsOne(sql: string, params: Record<any, any>): Promise<boolean>;
}
