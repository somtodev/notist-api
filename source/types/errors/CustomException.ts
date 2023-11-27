export default class CustomException extends Error {
  constructor(
    public code: number,
    public message: string,
  ) {
    super(message);
  }
}
