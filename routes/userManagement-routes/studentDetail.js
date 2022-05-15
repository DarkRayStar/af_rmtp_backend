const router = require('express').Router();
let StudentDetail = require('../../models/userManagement-models/studentDetail.model');


// get all student details
router.route('/').get((req, res) => {
    StudentDetail.find()
        .then(studentDetails => res.json(studentDetails))
        .catch(err => res.status(400).json('Error: ' + err));
});

// add student details
router.route('/add-student').post((req, res) => {
    const stdID = req.body.stdID;
    const studentfirstName = req.body.studentfirstName;
    const studentlastName = req.body.studentlastName;
    const studentEmail = req.body.studentEmail;
    const studentPassword = req.body.studentPassword;
    const studentGrpID = req.body.studentGrpID;

    const newStudentDetail = new StudentDetail({
        stdID,
        studentfirstName,
        studentlastName,
        studentEmail,
        studentPassword,
        studentGrpID,
    });

    newStudentDetail.save()
        .then(() => res.json('Student details are added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// get studet details by id
router.route('/:id').get((req, res) => {
    StudentDetail.findById(req.params.id)
        .then(studentDetails => res.json(studentDetails))
        .catch(err => res.status(400).json('Error: ' + err));
});

// delete studet details
router.route('/:id').delete((req, res) => {
    StudentDetail.findByIdAndDelete(req.params.id)
        .then(() => res.json('Student details are deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// update studet details
router.route('/update-student/:id').post((req, res) => {
    StudentDetail.findById(req.params.id)
        .then(studentDetails => {
            studentDetails.stdID = req.body.stdID;
            studentDetails.studentfirstName = req.body.studentfirstName;
            studentDetails.studentlastName = req.body.studentlastName;
            studentDetails.studentEmail = req.body.studentEmail;
            studentDetails.studentPassword = req.body.studentPassword;
            studentDetails.studentGrpID = req.body.studentGrpID;

            studentDetails.save()
                .then(() => res.json('Student details are updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;