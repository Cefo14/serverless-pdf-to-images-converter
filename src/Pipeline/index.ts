import Joi from 'joi';

import Request from './Request';
import Response from './Response';
import InvalidFileError from './errors/InvalidFileError';

import ServiceFactory from '../ServiceFactory';
import ConvertPDFToImages from '../ConvertPDFToImages';

import MIME from '../utils/MIME';

class Pipeline {
  private input: Request;

  constructor (input: Request) {
    this.input = input
  }

  private async validateInput(input: Request): Promise<Request> {
    const SchemaValidator = Joi.object<Request>({
      pdfURL: Joi
        .alternatives()
        .try(
          Joi.string().trim().uri(),
          Joi.string().trim()
        )
        .required(),

      imageFormat: Joi
        .string()
        .trim()
        .lowercase()
        .valid(
          'jpeg',
          'jpg',
          'png',
          'webp',
        )
        .default('png')
        .optional(),
    });

    const request: Request = await SchemaValidator.validateAsync(input);
    return request;
  }

  private async validateDownloadedFile (downloadedFile: Buffer): Promise<boolean> {
    const isValid = await MIME.fileIsPDF(downloadedFile);
    return isValid;
  }

  private async downloadFile(url: string): Promise<Buffer> {
    const serviceFactory = new ServiceFactory('aws');
    const service = serviceFactory.initialize();
    const file = await service.download(url);
    return file;
  };

  private async uploadFiles(files: Buffer[]): Promise<string[]> {
    const serviceFactory = new ServiceFactory('aws');
    const service = serviceFactory.initialize();

    const urls = await Promise.all(
      files.map(async (file) => {
        const url = await service.upload(file);
        return url;
      })
    );
    return urls;
  };

  async exec(): Promise<Response> {
    const input = await this.validateInput(this.input);

    const { pdfURL, imageFormat } = input;
    const downloadedFile = await this.downloadFile(pdfURL);

    const downloadedFileIsValid = await this.validateDownloadedFile(downloadedFile);
    if (!downloadedFileIsValid) throw new InvalidFileError();

    const convertPDFToImages = new ConvertPDFToImages(downloadedFile, imageFormat);
    const images = await convertPDFToImages.convert();

    const urls = await this.uploadFiles(images);
    const response = { urls };

    return response;
  }
}

export default Pipeline;
