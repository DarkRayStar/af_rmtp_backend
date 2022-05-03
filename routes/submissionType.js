const router = require('express').Router();
let Submission = require('../models/submissionType.model');

router.route('/').get((req, res) => {
  Submission.find()
    .then(submissions => res.json(submissions))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const submissionName = req.body.submissionName;
  const description = req.body.description;
  const deadline = Date.parse(req.body.deadline);

  const newSubmission = new Submission({
    submissionName,
    description,
    deadline
  });

  newSubmission.save()
    .then(() => res.json('Submission Type added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/file-delete/:id', async (req, res) => {
  try {
    Submission.findByIdAndDelete(req.params.id)
    .then(() => res.json('Submission Type deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
  } catch (error) {
    res.status(400).send('Submission Type Deletion Failed');
  }
});

router.get('/getSubmission/:id', async (req, res) => {
  try {
    const file = await Submission.findById(req.params.id);
    res.send(file);
  } catch (error) {
    res.status(400).send('Error while Submission Type data. Try again later.');
  }
});

router.get('/getSubmissionId/:submissionName', async (req, res) => {
  try {
    const file = await Submission.find({"submissionName":req.params.submissionName});
    res.send(file);
  } catch (error) {
    res.status(400).send('Error while getting Submission Type data. Try again later.');
  }
});

router.route('/update/:id').post((req, res) => {
  Submission.findById(req.params.id)
    .then(file => {
      file.submissionName = req.body.submissionName;
      file.description = req.body.description;
      file.deadline = Date.parse(req.body.deadline);
      file.save()
        .then(() => res.json('Submission Type updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;