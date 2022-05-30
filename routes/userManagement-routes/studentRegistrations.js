const router = require("express").Router();
const { User, validate } = require("../../models/userManagement-models/studentRegistration.model");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error) {
			return res.status(400).send({ message: error.details[0].message });
			// return res.json('invalid password! (Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters)');
		}

		const user = await User.findOne({ email: req.body.email });

		if (user) {
			// return res
			// 	.status(409)
			// 	.send({ message: "User with given email already Exist!" });

			return res.json('User with given email already Exist!').status(400);
		}

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		// await new User({ ...req.body, password: hashPassword }).save();
		// res.status(201).send({ message: "User created successfully" });

		// res.json({message: 'User created successfully', status: 201});

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
		.then(studentDetails => res.json(studentDetails))
		.catch(err => res.status(400).json('Error: ' + err));
});

// get student details by id
router.route('/:id').get((req, res) => {
	User.findById(req.params.id)
		.then(studentDetails => res.json(studentDetails))
		.catch(err => res.status(400).json('Error: ' + err));
});

// delete student details
router.route('/:id').delete((req, res) => {
	User.findByIdAndDelete(req.params.id)
		.then(() => res.json('Student details are deleted.'))
		.catch(err => res.status(400).json('Error: ' + err));
});

// update student details
router.route('/update-student/:id').post((req, res) => {
	User.findById(req.params.id)
		.then(studentDetails => {
			studentDetails.stdID = req.body.stdID;
			studentDetails.firstName = req.body.firstName;
			studentDetails.lastName = req.body.lastName;
			studentDetails.image = req.body.image;
			studentDetails.password = req.body.password;
			studentDetails.email = req.body.email;

			studentDetails.save()
				.then(() => res.json('Student details are updated!'))
				.catch(err => res.status(400).json('Error: ' + err));
		})
		.catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

