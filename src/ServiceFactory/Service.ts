abstract class Service {
  abstract download(url: string): Promise<Buffer>;
  abstract upload(file: Buffer): Promise<string>;
}

export default Service;
