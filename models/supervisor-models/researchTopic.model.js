const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const researchTopicSchema = new Schema({
  topic: { type: String, required: true },
  groupName: { type: String, required: true },
  state: { type: String },
  researchField: { type: String, required: true }
  //marks need to add
}, {
  timestamps: true,
});

const ResearchTopic = mongoose.model('researchTopic', researchTopicSchema);

module.exports = ResearchTopic;