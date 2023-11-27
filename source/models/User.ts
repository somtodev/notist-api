export default class User {
  public id: number;
  constructor(
    public firstname: string,
    public lastname: string,
    public email: string,
    public password: string,
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = this.hash(password);
  }

  private hash(password: string) {
    return password;
  }
}
