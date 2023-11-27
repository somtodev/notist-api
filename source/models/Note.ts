export default class Note {
  constructor(
    public content: string,
    public user_id: number,
    public id?: number,
  ) {}
}
