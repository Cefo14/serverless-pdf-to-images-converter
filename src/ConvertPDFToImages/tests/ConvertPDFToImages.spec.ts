import path from 'path';
import 'jest-extended';

import ConvertPDFToImages from '..';

import File from '../../utils/File';
import MIME from '../../utils/MIME';

jest.setTimeout(60 * 1000);

const readFile = async (name = 'dummy.pdf') => {
  const BASE_PATH = path.join(__dirname, 'mocks');
  const FILE_PATH = path.join(BASE_PATH, name);
  const file = await File.read(FILE_PATH);
  return file;
};

describe('ConvertPDFToImages Class', () => {
  describe('when is ok', () => {
    it('should return an array of png images', async () => {
      const file = await readFile();

      const convertPDFToImages = new ConvertPDFToImages(file);
      const images = await convertPDFToImages.convert();

      expect(images).toBeArray();
      expect(images.length).toBeGreaterThanOrEqual(1);

      await Promise.all(
        images.map(async (image) => {
          const isPNG = await MIME.fileIsPNG(image);
          expect(isPNG).toBeTrue();
        })
      );
    });
  });

  describe('when is ok and imageType is jpeg', () => {
    it('should return an array of jpeg images', async () => {
      const file = await readFile();

      const convertPDFToImages = new ConvertPDFToImages(file, 'jpeg');
      const images = await convertPDFToImages.convert();

      expect(images).toBeArray();
      expect(images.length).toBeGreaterThanOrEqual(1);

      await Promise.all(
        images.map(async (image) => {
          const isJPEG = await MIME.fileIsJPEG(image);
          expect(isJPEG).toBeTrue();
        })
      );
    });
  });

  describe('when is ok and imageType is webp', () => {
    it('should return an array of webp images', async () => {
      const file = await readFile();

      const convertPDFToImages = new ConvertPDFToImages(file, 'webp');
      const images = await convertPDFToImages.convert();

      expect(images).toBeArray();
      expect(images.length).toBeGreaterThanOrEqual(1);

      await Promise.all(
        images.map(async (image) => {
          const isWEBP = await MIME.fileIsWEBP(image);
          expect(isWEBP).toBeTrue();
        })
      );
    });
  });
});
