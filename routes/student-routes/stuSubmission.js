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
                groupname: groupname,
                submissionType: submissionName,
                feedback: 'N/A',

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

Router.get('/getAllFiles', async (req, res) => {
    try {
        const files = await StuSubmission.find({});
        const sortedByCreationDate = files.sort(
            (a, b) => b.createdAt - a.createdAt
        );
        res.send(sortedByCreationDate);
    } catch (error) {
        res.status(400).send('Error while getting list of files. Try again later.');
    }
});

Router.get('/getFeedback/:id', async (req, res) => {
    try {
        const file = await StuSubmission.findById(req.params.id);
        res.send(file);
    } catch (error) {
        res.status(400).send('Error while getting the file. Try again later.');
    }
});

Router.route('/update/:id').post((req, res) => {
    StuSubmission.findById(req.params.id)
        .then(file => {
            file.feedback = req.body.feedback;
            file.save()
                .then(() => res.json('StuSubmission updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

Router.get('/download/:id', async (req, res) => {
    try {
        let downloadDirectory = __dirname;
        downloadDirectory = downloadDirectory.replace('routes\\student-routes', ' ');
        console.log('DownDirectory', downloadDirectory);
        const file = await StuSubmission.findById(req.params.id);
        res.set({
            'Content-Type': file.file_mimetype
        });
        res.sendFile(path.join(downloadDirectory, '..', file.file_path));
    } catch (error) {
        res.status(400).send('Error while downloading file. Try again later.');
    }
});

Router.post("/researchSubmission", async (req, res) => {
    try {

        const groups = req.body.theGroup;

        const group = await StuSubmission.find({
            groupname: groups
        })

        if (group) {
            res.json({ group })
        }
        else {
            return res.json("Invalid User").status(401);
        }

    } catch (error) {
        // res.status(500).send({ message: "Internal Server Error" });
    }

});



module.exports = Router;