const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const submissionSchema = new Schema({
  submissionName: {
    type: String,
    required: true,
    trim: true,
    unique:true
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  deadline: {
    type: Date,
    required: true
  },
}, {
  timestamps: true,
});

const SubmissionType = mongoose.model('SubmissionType', submissionSchema);

module.exports = SubmissionType;