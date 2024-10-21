import fs from 'fs/promises';
import path from 'path';
import { BusinessError } from '~/utils/error';
import config from '~/config';

const getFile = async (filename: string | undefined) => {
  if (!filename) {
    throw new BusinessError('Filename must be provided');
  }

  const filePath = path.join(config.uploadDir, filename);
  try {
    const file = await fs.readFile(filePath);
    return file;
  } catch (error) {
    throw new BusinessError('File not found');
  }
};
export default getFile;
