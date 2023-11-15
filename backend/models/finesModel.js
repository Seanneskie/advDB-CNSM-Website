const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FinesSchema = new Schema({
  name: String,
  organization: { type: Schema.Types.ObjectId, ref: 'Organization' },
  event: String,
  date_of_penalty: Date,
  amount: Number,
  student: { type: Schema.Types.ObjectId, ref: 'Student' },
  description: String,
  status: Boolean,
  // Other fields
});

const Fines = mongoose.model('Fines', FinesSchema);

module.exports = { Fines };
