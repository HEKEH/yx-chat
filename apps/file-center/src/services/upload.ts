import fs from 'fs/promises';
import crypto from 'crypto';
import path from 'path';
import { logger } from '@yx-chat/shared/logger';
import multer from '@koa/multer';
import config from '~/config';
import { BusinessError } from '~/utils/error';
import { compressFile } from '~/utils/compress';

// Custom storage engine
const storage = multer.memoryStorage();

export const uploadMulter = multer({
  storage,
  limits: {
    fileSize: config.uploadFileSizeLimit
      ? config.uploadFileSizeLimit * 1024 * 1024
      : undefined,
  },
});

// Generate file hash
function generateHashFileName(file: multer.File) {
  const fileExtension = path.extname(file.originalname);
  const hashSum = crypto.createHash('sha256');
  hashSum.update(file.buffer);
  const fileHash = hashSum.digest('hex');
  // new filename = hash + original extension
  const newFilename = `${fileHash}${fileExtension}`;
  return newFilename;
}

/** @returns filename */
export const uploadSingleFile = async (
  file: multer.File | undefined,
  shouldCompress = config.fileCompression,
): Promise<string> => {
  if (!file) {
    throw new BusinessError('No file uploaded');
  }
  try {
    const newFilename = generateHashFileName(file);
    const filePath = path.join(config.uploadDir, newFilename);

    if (shouldCompress) {
      await compressFile(file.buffer, filePath);
    } else {
      await fs.writeFile(filePath, file.buffer);
      await fs.chmod(filePath, 0o666);
    }

    logger.info('[upload file] success', newFilename);
    return newFilename;
  } finally {
    // Clean up memory
    file.buffer = Buffer.alloc(0);
  }
};

export const uploadFiles = async (files: multer.File[]) => {
  return await Promise.all(files.map(file => uploadSingleFile(file)));
};
