const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const submissionSchema = new Schema(
  {
    submissionName: { type: String, required: true },
    regNo: { type: String, required: true },
    remarks: { type: Number, required: true },
    file_path: {
      type: String,
      required: true,
    },
    file_mimetype: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const NewSubmission = mongoose.model("Submission", submissionSchema);

module.exports = NewSubmission;
