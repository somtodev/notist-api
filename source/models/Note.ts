export default class Note {
  constructor(
    public title: string,
    public content: string,
    public user_id: number,
    public id?: number,
  ) {}
}
