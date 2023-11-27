export default interface ICommon {
  run(sql: string, params: Record<any, any>): Promise<boolean>;
  findAll(sql: string): Promise<Array<any>>;
  findOne(sql: string, params: Record<any, any>): Promise<Object>;
  existsOne(sql: string, params: Record<any, any>): Promise<boolean>;
}
