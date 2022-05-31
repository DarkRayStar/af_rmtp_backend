const path = require('path');
const multer = require('multer');
const StuSubmission = require('../../models/student-models/stuSubmission.model');
const Router = require('express').Router();
const ObjectId = require('mongodb').ObjectID;

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, './stuSubmissions');
        },
        filename(req, file, cb) {
            cb(null, `${new Date().getTime()}_${file.originalname}`);
        }
    }),
    limits: {
        fileSize: 10000000 // max file size 10MB = 1000000 bytes
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls|ppt|pptx)$/)) {
            return cb(
                new Error(
                    'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
                )
            );
        }
        cb(undefined, true); // continue with upload
    }
});

Router.post('/upload',
    upload.single('file'),
    async (req, res) => {
        try {
            const { groupname, submissionName } = req.body;
            const { path, mimetype } = req.file;
            const file = new StuSubmission({
                groupname : groupname,
                submissionType: submissionName,
                feedback: 'abc',
                file_path: path,
                file_mimetype: mimetype
            });
            await file.save();
            res.send('file uploaded successfully.');
        } catch (error) {
            res.status(400).send('Error while uploading file. Try again later.');
        }
    },
    (error, req, res, next) => {
        if (error) {
            res.status(500).send(error.message);
        }
    }
);

module.exports = Router;