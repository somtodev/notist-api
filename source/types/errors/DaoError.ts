import { CustomException } from ".";

export default class DaoError extends CustomException {
  constructor(
    public code: number,
    public message: string,
  ) {
    super(code, message);
  }
}
