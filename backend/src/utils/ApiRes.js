class ApiResponse {
  constructor(status, message = "success", value = {}) {
    this.status = status;
    this.message = message;
    this.success = status < 400;
    this.value = value;
  }
}

export default ApiResponse;
