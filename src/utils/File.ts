import fs from 'fs';

export const read = (path: string) => (
  new Promise<Buffer>((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  })
);

export const write = (path: string, data: any) => (
  new Promise<string>((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) return reject(err);
      return resolve(data);
    });
  })
);

export const remove = (path: string) => (
  new Promise<string>((resolve, reject) => {
    fs.unlink(path, (err) => {
      if (err) return reject(err);
      return resolve(path);
    })
  })
);

export default {
  read,
  write,
  remove,
};
