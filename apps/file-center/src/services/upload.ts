import fs from 'fs/promises';
import crypto from 'crypto';
import path from 'path';
import { logger } from '@yx-chat/shared/logger';
import multer from '@koa/multer';
import config from '~/config';
import { BusinessError } from '~/utils/error';

const TEMP_FILE_PREFIX = 'yx';

// 自定义存储引擎
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.uploadDir);
  },
  filename: function (req, file, cb) {
    logger.info('[upload file]', file.originalname);
    // 暂时使用原始文件名，稍后我们会替换它
    cb(
      null,
      `${TEMP_FILE_PREFIX}_${new Date().valueOf()}_${file.originalname}`,
    );
  },
});

export const uploadMulter = multer({ storage });

// 生成文件哈希
async function generateFileHash(filepath: string) {
  const fileBuffer = await fs.readFile(filepath);
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
}

/** @returns filename */
const upload = async (file: multer.File | undefined): Promise<string> => {
  if (!file) {
    throw new BusinessError('No file uploaded');
  }
  const oldPath = file.path;
  const fileExtension = path.extname(file.originalname);

  // generate file hash
  const fileHash = await generateFileHash(oldPath);

  // new filename = hash + original extension
  const newFilename = `${fileHash}${fileExtension}`;
  const newPath = path.join(config.uploadDir, newFilename);

  // rename file
  await fs.rename(oldPath, newPath);
  // set file permission to readonly
  await fs.chmod(newPath, 0o444);
  logger.info('[upload file] success', newFilename);
  return newFilename;
};
export default upload;
