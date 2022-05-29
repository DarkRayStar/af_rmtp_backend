const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const groupSchema = new Schema({
  groupname: { type: String, required: true ,unique: true},
  groupleader: { type: String, required: true, unique: true },
  member02: { type: String, required: true },
  member03: { type: String, required: true },
  member04: { type: String, required: true },
  supervisor: { type: String },
  cosupervisor: { type: String },
  topic: { type: String },
  status: { type: String }
}, {
  timestamps: true,
  
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;