import zlib from 'zlib';
import fs from 'fs/promises';
import { promisify } from 'util';

// Compress file
const brotliCompress = promisify(zlib.brotliCompress);
export async function compressFile(fileBuffer: Buffer, outputPath: string) {
  const compressionOptions = {
    [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY,
    [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
  };
  const compressed = await brotliCompress(fileBuffer, compressionOptions);
  // // compare compression ratio
  // const compressionRatio = compressed.length / fileBuffer.length;
  // logger.trace('[upload file] compression ratio', compressionRatio);
  await fs.writeFile(`${outputPath}.br`, compressed);
}
