export class ApiError extends Error {
    statusCode: number;
  
    constructor(statusCode: number, message: string) {
      super(message);
      this.statusCode = statusCode;
  
      // Set the prototype explicitly (important for extending built-ins like Error)
      Object.setPrototypeOf(this, ApiError.prototype);
    }
  }
  