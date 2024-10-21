import fs from 'fs/promises';
import path from 'path';
import zlib from 'zlib';
import { promisify } from 'util';
import { BusinessError } from '~/utils/error';
import config from '~/config';

const brotliDecompress = promisify(zlib.brotliDecompress);

const getFile = async (
  filename: string | undefined,
  decompress = config.fileCompression,
) => {
  if (!filename) {
    throw new BusinessError('Filename must be provided');
  }

  try {
    if (decompress) {
      const filePath = path.join(config.uploadDir, `${filename}.br`);
      const compressedFile = await fs.readFile(filePath);
      const decompressedFile = await brotliDecompress(compressedFile);
      return decompressedFile;
    }
    const filePath = path.join(config.uploadDir, filename);
    const file = await fs.readFile(filePath);
    return file;
  } catch (error) {
    throw new BusinessError('File not found');
  }
};
export default getFile;
