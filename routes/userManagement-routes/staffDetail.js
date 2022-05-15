const router = require('express').Router();
let StaffDetail = require('../../models/userManagement-models/staffDetail.model');

// get all employee details
router.route('/').get((req, res) => {
    StaffDetail.find()
        .then(staffDetails => res.json(staffDetails))
        .catch(err => res.status(400).json('Error: ' + err));
});

// add employee details
router.route('/add-employee').post((req, res) => {
    const staffID = req.body.staffID;
    const employeefirstName = req.body.employeefirstName;
    const employeelastName = req.body.employeelastName;
    const employeeEmail = req.body.employeeEmail;
    const employeePassword = req.body.employeePassword;
    const employeeType = req.body.employeeType;

    const newStaffDetail = new StaffDetail({
        staffID,
        employeefirstName,
        employeelastName,
        employeeEmail,
        employeePassword,
        employeeType,
    });

    newStaffDetail.save()
        .then(() => res.json('Employee details are added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// get employee details by id 
router.route('/:id').get((req, res) => {
    StaffDetail.findById(req.params.id)
        .then(staffDetails => res.json(staffDetails))
        .catch(err => res.status(400).json('Error: ' + err));
});

// delete employee details by id
router.route('/:id').delete((req, res) => {
    StaffDetail.findByIdAndDelete(req.params.id)
        .then(() => res.json('Employee details are deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// update employee details
router.route('/update-employee/:id').post((req, res) => {
    StaffDetail.findById(req.params.id)
        .then(staffDetails => {
            staffDetails.staffID = req.body.staffID;
            staffDetails.employeefirstName = req.body.employeefirstName;
            staffDetails.employeelastName = req.body.employeelastName;
            staffDetails.employeeEmail = req.body.employeeEmail;
            staffDetails.employeePassword = req.body.employeePassword;
            staffDetails.employeeType = req.body.employeeType;

            staffDetails.save()
                .then(() => res.json('Employee details are updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;