const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const researchTopicSchema = new Schema({
  topic: { type: String, required: true },
  groupName: { type: String, required: true },
  state: { type: String },
}, {
  timestamps: true,
});

const ResearchTopic = mongoose.model('researchTopic', researchTopicSchema);

module.exports = ResearchTopic;