const router = require("express").Router();
const { User, validate } = require("../../models/userManagement-models/employeeRegistration.model");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error) {
			// return res.status(400).send({ message: error.details[0].message });
			return res.json('invalid password! (Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters)');
		}


		const user = await User.findOne({ email: req.body.email });
		if (user) {
			// return res
			// 	.status(409)
			// 	.send({ message: "User with given email already Exist!" });
			return res.json('User with given email already Exist!!').status(400);
		}


		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		// await new User({ ...req.body, password: hashPassword }).save();
		// res.status(201).send({ message: "User created successfully" });

		await new User({ ...req.body, password: hashPassword }).save()
			.then(() => res.json('User created successfully!'))
			.catch(err => res.status(400).json('Error: ' + err));

	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

// get all student details
router.route('/').get((req, res) => {
	User.find()
		.then(empDetails => res.json(empDetails))
		.catch(err => res.status(400).json('Error: ' + err));
});

// get studet details by id
router.route('/:id').get((req, res) => {
	User.findById(req.params.id)
		.then(empDetails => res.json(empDetails))
		.catch(err => res.status(400).json('Error: ' + err));
});

// delete studet details
router.route('/:id').delete((req, res) => {
	User.findByIdAndDelete(req.params.id)
		.then(() => res.json('Employee details are deleted.'))
		.catch(err => res.status(400).json('Error: ' + err));
});

// update studet details
router.route('/update-employee/:id').post((req, res) => {
	User.findById(req.params.id)
		.then(empDetails => {
			empDetails.empID = req.body.empID;
			empDetails.firstName = req.body.firstName;
			empDetails.lastName = req.body.lastName;
			empDetails.image = req.body.image;
			empDetails.password = req.body.password;
			empDetails.email = req.body.email;

			empDetails.save()
				.then(() => res.json('Employee details are updated!'))
				.catch(err => res.status(400).json('Error: ' + err));
		})
		.catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;

