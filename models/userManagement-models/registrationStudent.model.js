const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const studentRegistrationSchema = new mongoose.Schema({
  stdID: { type: String, required: true},
  studentfirstName: { type: String, required: true },
  studentlastName: { type: String, required: true },
  studentEmail: { type: String, required: true },
  studentPassword: { type: String, required: true },
  studentGrpID: { type: String, required: true },
});

studentRegistrationSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY, {expiresIn: "30d"});
    return token
 }

 const Student = mongoose.model("registrationStudent", studentRegistrationSchema);

const validate = (data) => {
  const schema = joi.object({
    stdID: joi.string().required().label("Student ID"),
    studentfirstName: joi.string().required().label("first name"),
    studentlastName: joi.string().required().label("last name"),
    studentEmail: joi.string().email().required().label("email"),
    studentPassword: passwordComplexity().required().label("password"),
    studentGrpID: joi.string().required().label("group ID")
  });

  return schema.validate(data)
};

module.exports = {Student, validate};

