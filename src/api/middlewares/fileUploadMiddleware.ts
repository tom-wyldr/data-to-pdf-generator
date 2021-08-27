import multer from 'multer';
import fse from 'fs-extra';
import {HttpError} from "routing-controllers";
import os from "os";

const allowedFileMimeTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

export default (inputName: string, maxFileSize: number) => {
	return multer({
		fileFilter: (req, file, cb) => {
			if (allowedFileMimeTypes.indexOf(file.mimetype) === -1) {
				return cb(new HttpError(400, 'File type is not allowed'));
			}
			cb(null, true);
		},
		limits: {
			fileSize: maxFileSize,
		},
		storage: multer.diskStorage({
			destination: (req, file, cb) => {
				const uploadFolder = os.tmpdir();
				(fse.ensureDir as any)(uploadFolder, null, (err: any) => cb(err, uploadFolder));
			},
			filename: (req, file, cb) => {
				cb(null, `xlsxFigmaRecipeFile.xlsx`);
			},
		}),
	}).single(inputName);
};
