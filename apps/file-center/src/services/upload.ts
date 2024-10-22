import fs from 'fs/promises';
import crypto from 'crypto';
import path from 'path';
import { logger } from '@yx-chat/shared/logger';
import multer from '@koa/multer';
import config from '~/config';
import { BusinessError } from '~/utils/error';
import { compressFile } from '~/utils/compress';

const TEMP_FILE_PREFIX = 'yx';

// Custom storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.uploadDir);
  },
  filename: function (req, file, cb) {
    logger.info('[upload file]', file.originalname);
    // Temporarily use the original filename, we'll replace it later
    cb(
      null,
      `${TEMP_FILE_PREFIX}_${new Date().valueOf()}_${file.originalname}`,
    );
  },
});

export const uploadMulter = multer({ storage });

// Generate file hash
async function generateFileHash(fileBuffer: Buffer) {
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
}

/** @returns filename */
const upload = async (
  file: multer.File | undefined,
  shouldCompress = config.fileCompression,
): Promise<string> => {
  if (!file) {
    throw new BusinessError('No file uploaded');
  }
  const oldPath = file.path;
  const fileExtension = path.extname(file.originalname);

  // generate file hash
  const fileBuffer = await fs.readFile(oldPath);
  const fileHash = await generateFileHash(fileBuffer);

  // new filename = hash + original extension
  const newFilename = `${fileHash}${fileExtension}`;
  const newPath = path.join(config.uploadDir, newFilename);

  if (shouldCompress) {
    // Compress file
    await compressFile(fileBuffer, newPath);
    // Delete original file
    await fs.unlink(oldPath);
  } else {
    await fs.rename(oldPath, newPath);
    // set file permission to readonly and writable, but not executable
    await fs.chmod(newPath, 0o666);
  }
  logger.info('[upload file] success', newFilename);
  return newFilename;
};

export default upload;
