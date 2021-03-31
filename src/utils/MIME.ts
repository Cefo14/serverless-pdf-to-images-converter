import FileType from 'file-type';

export const isPDF = (mime: string): boolean => (
  mime === 'application/pdf'
);

export const fileIsPDF =  async (file: Buffer): Promise<boolean> => {
  const { mime } = await FileType.fromBuffer(file);
  return isPDF(mime);
};

export const isImage = (mime: string): boolean => (
  /^image\/*/ig.test(mime)
);

export const fileIsImage =  async (file: Buffer): Promise<boolean> => {
  const { mime } = await FileType.fromBuffer(file);
  return isImage(mime);
};

export const isPNG = (mime: string): boolean => (
  mime === 'image/png'
);

export const fileIsPNG =  async (file: Buffer): Promise<boolean> => {
  const { mime } = await FileType.fromBuffer(file);
  return isPNG(mime);
};

export const isJPEG = (mime: string): boolean => (
  mime === 'image/jpeg'
);

export const fileIsJPEG =  async (file: Buffer): Promise<boolean> => {
  const { mime } = await FileType.fromBuffer(file);
  return isJPEG(mime);
};

export const isWEBP = (mime: string): boolean => (
  mime === 'image/webp'
);

export const fileIsWEBP =  async (file: Buffer): Promise<boolean> => {
  const { mime } = await FileType.fromBuffer(file);
  return isWEBP(mime);
};

export default {
  isImage,
  fileIsImage,
  isPDF,
  fileIsPDF,
  isPNG,
  fileIsPNG,
  isJPEG,
  fileIsJPEG,
  isWEBP,
  fileIsWEBP,
};
