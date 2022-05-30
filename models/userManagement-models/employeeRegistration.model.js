const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	empID: { type: String, required: true , unique:true},
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	empType: { type: String, required: true },
	password: { type: String, required: true },
	image: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("employeeRegistration", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		empID: Joi.string().required().label("Employee ID"),
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		empType: Joi.string().required().label("Employee Type"),
		password: passwordComplexity().required().label("Password"),
		image: Joi.string().required().label("Image URL"),
	});
	return schema.validate(data);
};

module.exports = { User, validate };