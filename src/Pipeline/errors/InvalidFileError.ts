class InvalidFileError extends Error {
  constructor(...args) {
    super(...args);
    this.name = 'InvalidFileError';
    this.message = 'the file must be a pdf';
    if (Error.captureStackTrace) Error.captureStackTrace(this, InvalidFileError);
    Object.setPrototypeOf(this, InvalidFileError.prototype);
  }
}

export default InvalidFileError;