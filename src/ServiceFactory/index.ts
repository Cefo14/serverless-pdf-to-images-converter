import Service from './Service';
import AWSService from './AWSService';
import InvalidServiceTypeError from './errors/InvalidServiceTypeError';

class ServiceFactory {
  private type: string;

  constructor(type: string) {
    this.type = type;
  }

  initialize(): Service {
    switch(this.type.toLowerCase()) {
      case 'aws':
        return new AWSService();
      default:
        throw new InvalidServiceTypeError();
    }
  }
}

export default ServiceFactory;
