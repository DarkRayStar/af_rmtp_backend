const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const staffDetailSchema = new Schema({
  staffID: { type: String, required: true},
  employeefirstName: { type: String, required: true },
  employeelastName: { type: String, required: true },
  employeeEmail: { type: String, required: true },
  employeePassword: { type: String, required: true },
  employeeType: { type: String, required: true },
}, {
  timestamps: true,
});

const StaffDetail = mongoose.model('staffDetail', staffDetailSchema);

module.exports = StaffDetail;
