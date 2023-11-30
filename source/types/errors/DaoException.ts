export default class DaoException extends Error {
  constructor(public code: number) {
    super("Database Error");
  }

  getMessage() {
    switch (this.code) {
      case 11:
        return "Invalid Arguments";
      case 21:
        return "Entity Not Found";
      default:
        return "Server Error";
    }
  }
}
