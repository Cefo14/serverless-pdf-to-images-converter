import AWS from 'aws-sdk';
import parse from 'url-parse';
import FileType from 'file-type';
import { v4 as uuidv4 } from 'uuid';

import Service from './Service';

class AWSService extends Service {
  constructor() {
    super();

    const {
      AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY,
    } = process.env;

    AWS.config = new AWS.Config();
    AWS.config.accessKeyId = AWS_ACCESS_KEY_ID;
    AWS.config.secretAccessKey = AWS_SECRET_ACCESS_KEY;
  }

  private parseURL(url: string) {
    const parsedURL = parse(url, true);
    const { hostname, pathname } = parsedURL;

    const [bucket, , region] = hostname.split('.');
    const key = pathname.substring(1);
    const fileName = key.split('/').pop();

    return {
      key: key as string,
      fileName: fileName as string,
      bucket: bucket as string,
      region: (region === 'amazonaws' ? '' : region) as string,
    };
  };

  async download(url: string): Promise<Buffer> {
    const { AWS_BUCKET } = process.env;

    const parsedURL = this.parseURL(url);
    const { key } = parsedURL;

    const s3Bucket = new AWS.S3();

    const params = {
      Bucket: AWS_BUCKET,
      Key: key,
    };

    const s3Response = await s3Bucket.getObject(params).promise();
    const buffer = s3Response.Body as Buffer;
    return buffer;
  }

  async upload(file: Buffer): Promise<string> {
    const { AWS_BUCKET, AWS_KEY_OUTPUT } = process.env;

    const { mime, ext } = await FileType.fromBuffer(file);
    const fileName = `${uuidv4()}.${ext}`;
    const Key = AWS_KEY_OUTPUT ? `${AWS_KEY_OUTPUT}/${fileName}` : fileName;

    const params = {
      Bucket: AWS_BUCKET,
    };

    const data = {
      Key,
      ContentType: mime,
      Body: file,
      Bucket: AWS_BUCKET,
    };

    const s3Bucket = new AWS.S3({ params });

    const { Location }  = await s3Bucket.upload(data).promise();
    return Location;
  }
}

export default AWSService;
