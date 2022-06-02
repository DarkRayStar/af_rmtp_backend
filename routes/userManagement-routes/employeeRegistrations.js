const router = require("express").Router();
const { User, validate } = require("../../models/userManagement-models/employeeRegistration.model");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	try {
		//calling validate method created in employeeRegistration model class
		const { error } = validate(req.body);
		if (error) {
			return res.status(400).send({ message: error.details[0].message });
		}

		//check employee ID already in database (check unique or not)
		const userID = await User.findOne({ empID: req.body.empID });
		if (userID) {
			return res.json('User with given Employee ID is already Exist!').status(401);
		}

		//check email is already in database
		const user = await User.findOne({ email: req.body.email });
		if (user) {
			return res.json('User with given email already Exist!!').status(400);
		}

		//user entered password converted in to hash password
		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		//save all details
		await new User({ ...req.body, password: hashPassword }).save()
			.then(() => res.json('Employee Registration successfully!'))
			.catch(err => res.status(400).json('Error: ' + err));

	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

// get all employee details
router.route('/').get((req, res) => {
	User.find()
		.then(empDetails => res.json(empDetails))
		.catch(err => res.status(400).json('Error: ' + err));
});

// get employee details by id
router.route('/:id').get((req, res) => {
	User.findById(req.params.id)
		.then(empDetails => res.json(empDetails))
		.catch(err => res.status(400).json('Error: ' + err));
});

// delete employee details
router.route('/:id').delete((req, res) => {
	User.findByIdAndDelete(req.params.id)
		.then(() => res.json('Employee details are deleted.'))
		.catch(err => res.status(400).json('Error: ' + err));
});

// update employee details
router.route('/update-employee/:id').post((req, res) => {
	User.findById(req.params.id)
		.then(empDetails => {
			empDetails.empID = req.body.empID;
			empDetails.firstName = req.body.firstName;
			empDetails.lastName = req.body.lastName;
			empDetails.image = req.body.image;
			empDetails.password = req.body.password;
			empDetails.email = req.body.email;
			empDetails.researchField = req.body.researchField;

			empDetails.save()
				.then(() => res.json('Employee details are updated!'))
				.catch(err => res.status(400).json('Error: ' + err));
		})
		.catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;

