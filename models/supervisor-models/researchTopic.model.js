const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const researchTopicSchema = new Schema({
  topic: { type: String },
  groupName: { type: String, required: true, unique: true },
  state: { type: String },
}, {
  timestamps: true,
});

const ResearchTopic = mongoose.model('researchTopic', researchTopicSchema);

module.exports = ResearchTopic;