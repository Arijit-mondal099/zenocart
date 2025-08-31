class ApiError extends Error {
  constructor(status, massage = "something went wrong!", errors = [], stack = "") {
    super(massage);
    this.status = status;
    this.message = massage;
    this.succuss = false;
    this.errors = errors;
    this.data = null;
  }
}

export default ApiError;
