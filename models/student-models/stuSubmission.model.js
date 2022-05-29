const mongoose = require('mongoose');

const stuSubmissionSchema = mongoose.Schema(
    {
        groupname: {
            type: String,
            required: true,
            trim: true
        },
        submissionType: {
            type: String,
            required: true,
            trim: true
        },
        file_path: {
            type: String,
            required: true
        },
        file_mimetype: {
            type: String,
            required: true
        },
        feedback: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

const StuSubmission = mongoose.model('stuSubmission', stuSubmissionSchema);

module.exports = StuSubmission;