import path from 'path';
import dotenv from 'dotenv';
import 'jest-extended';

const envPath = path.join(__dirname, '..', '..', '.env');
dotenv.config({ path: envPath });

import { handler } from '../index';
import File from '../utils/File';

jest.setTimeout(50 * 1000);

const readJSON = async (inputPath) =>  {
  const inputData = await File.read(inputPath);
  const input = JSON.parse(inputData.toString());
  return input;
}

describe('index.handler', () => {
  describe('when input is valid', () => {
    it('should be ok', async () => {
      const FILE_PATH = path.join(__dirname, '..', 'inputs' ,'input.pdf.to.png.json');
      const input = await readJSON(FILE_PATH);
      const response = await handler(input);

      expect(response).toHaveProperty('statusCode');
      expect(response.statusCode).toBe(200);

      expect(response).toHaveProperty('body');
      expect(response.body).toBeObject();

      expect(response.body).toHaveProperty('urls');
      expect(response.body.urls).toBeArray();

      response.body.urls.forEach((url) => {
        expect(url).toEndWith('.png');
      })
    });
  });

  describe('when input is invalid', () => {
    it('should be ok', async () => {
      const input = {}
      const response = await handler(input as any);

      expect(response).toHaveProperty('statusCode');
      expect(response.statusCode).toBe(422);

      expect(response).toHaveProperty('body');
      expect(response.body).toBeObject();
    });
  });
});
