const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentDetailSchema = new Schema({
  stdID: { type: String, required: true},
  studentfirstName: { type: String, required: true },
  studentlastName: { type: String, required: true },
  studentEmail: { type: String, required: true },
  studentPassword: { type: String, required: true },
  studentGrpID: { type: String, required: true },
}, {
  timestamps: true,
});

const StudentDetail = mongoose.model('studentDetail', studentDetailSchema);

module.exports = StudentDetail;