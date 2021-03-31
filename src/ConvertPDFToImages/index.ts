import gm from 'gm';
// tslint:disable-next-line: no-var-requires
const pdfjsLib = require('pdfjs-dist/es5/build/pdf.js');

class ConvertPDFToImages {
  private file: Buffer;
  private imageFormat: string;

  constructor(file: Buffer, imageFormat: string = 'png') {
    this.file = file;
    this.imageFormat = imageFormat;
  }

  private async getTotalPages (file: Buffer): Promise<number> {
    const pdf = await pdfjsLib.getDocument(file).promise;
    return pdf.numPages;
  }

  private convertPageToImage = (file: Buffer, page: number): Promise<Buffer> => {
    gm.subClass({ imageMagick: true });

    return new Promise<Buffer>((resolve, reject) => (
      gm(file)
        .selectFrame(page)
        .quality(100)
        .density(200, 200) // Variant
        .compress('None')
        .flatten()
        .trim()
        .toBuffer(this.imageFormat, async (err, buffer) => {
          if (err) return reject(err);
          return resolve(buffer);
        })
    ));
  }

  async convert(): Promise<Buffer[]> {
    const pages = await this.getTotalPages(this.file);
    const images = await Promise.all(
      Array(pages)
        .fill(undefined)
        .map(async (value, index) => {
          const image = await this.convertPageToImage(this.file, index);
          return image;
        })
    );
    return images;
  }
}

export default ConvertPDFToImages;
