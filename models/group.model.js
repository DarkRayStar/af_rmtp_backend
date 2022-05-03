const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const groupSchema = new Schema({
  groupname: { type: String, required: true ,unique: true},
  groupleader: { type: String, required: true },
  groupmembers: { type: Array, required: true },
  supervisor: { type: String, required: true },
  cosupervisor: { type: String, required: true },
}, {
  timestamps: true,
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;