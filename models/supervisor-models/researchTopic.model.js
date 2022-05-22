const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const researchTopicSchema = new Schema({
  groupName: { type: String, required: true ,unique: true},
  topic: { type: String ,unique: true},
  state: { type: String },
  // researchField: { type: String }
  //marks need to add
}, {
  timestamps: true,
});

const ResearchTopic = mongoose.model('researchTopic', researchTopicSchema);

module.exports = ResearchTopic;