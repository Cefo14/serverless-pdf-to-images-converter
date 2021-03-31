class InvalidServiceTypeError extends Error {
  constructor(...args) {
    super(...args);
    this.name = 'InvalidServiceTypeError';
    this.message = 'invalid service type';
    if (Error.captureStackTrace) Error.captureStackTrace(this, InvalidServiceTypeError);
    Object.setPrototypeOf(this, InvalidServiceTypeError.prototype);
  }
}

export default InvalidServiceTypeError;
