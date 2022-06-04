const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const researchTopicSchema = new Schema({
  groupName: { type: String, required: true, unique: true },
  topic: { type: String },
  state: { type: String },
  csState: { type: String },
}, {
  timestamps: true,
});

const ResearchTopic = mongoose.model('researchTopic', researchTopicSchema);

module.exports = ResearchTopic;