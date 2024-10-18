import fs from 'fs/promises';
import fsSync from 'fs';
import crypto from 'crypto';
import path from 'path';
import multer from '@koa/multer';
import config from '~/config';
import { BusinessError } from '~/biz-utils/business-error';
import logger from '~/utils/logger';

const TEMP_FILE_PREFIX = 'temp_yx_';
let isUploadDirInit = false;

// 自定义存储引擎
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!isUploadDirInit) {
      !fsSync.existsSync(config.uploadDir) &&
        fsSync.mkdirSync(config.uploadDir, { recursive: true });
      isUploadDirInit = true;
    }
    cb(null, config.uploadDir);
  },
  filename: function (req, file, cb) {
    logger.info('[upload file]', file.originalname);
    // 暂时使用原始文件名，稍后我们会替换它
    cb(null, `${TEMP_FILE_PREFIX}${file.originalname}`);
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

const upload = async (file: multer.File | undefined) => {
  if (!file) {
    throw new BusinessError('No file uploaded');
  }
  const oldPath = file.path;
  const fileExtension = path.extname(file.originalname);

  // 生成文件哈希
  const fileHash = await generateFileHash(oldPath);

  // 新的文件名 = 哈希值 + 原始扩展名
  const newFilename = `${fileHash}${fileExtension}`;
  const newPath = path.join(config.uploadDir, newFilename);

  // 重命名文件
  await fs.rename(oldPath, newPath);
};
export default upload;
