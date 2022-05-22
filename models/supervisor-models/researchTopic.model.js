const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const researchTopicSchema = new Schema({
  topic: { type: String },
  groupName: { type: String },
  state: { type: String },
  // researchField: { type: String }
  //marks need to add
}, {
  timestamps: true,
});

const ResearchTopic = mongoose.model('researchTopic', researchTopicSchema);

module.exports = ResearchTopic;