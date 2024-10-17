import { codesErrors } from "./codes-errors-mysql.js";

export class AppError extends Error {
  title;
  message;

  constructor(code, message) {
    super();
    this.title = codesErrors[code];
    this.message = message;

    this.kindMessage();
  }

  kindMessage() {
    throw new Error(`
      Title: ${this.title}
      Message: ${this.message}
    `)
  }
}