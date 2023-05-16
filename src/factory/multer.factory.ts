import { diskStorage } from 'multer';
import { HttpException, HttpStatus } from '@nestjs/common';
export class MulterHandler {
  constructor() {}
  static createDiskStorage(path: string) {
    try {
      return diskStorage({
        destination: path,
        filename: (req, file, cb) => {
          const ext = file.originalname.split('.').pop();
          const newName = Date.now() + '.' + ext;
          cb(null, newName);
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static videoMulterFilter = (req, file, cb) => {
    try {
      if (!file.originalname.match(/\.(mp4|webm)$/)) {
        return cb(
          new HttpException('Must Upload a video File (mp4|webm)', 400),
          false,
        );
      }
      return cb(null, true);
    } catch (error) {
      return cb(error, false);
    }
  };

  static fileMulterFilter = (req, file, cb) => {
    try {
      if (!file.originalname.match(/\.(pdf|docs|txt)$/)) {
        return cb(
          new HttpException('Must Upload a File (pdf|docs|txt)', 400),
          false,
        );
      }
      return cb(null, true);
    } catch (error) {
      return cb(error, false);
    }
  };
}
