const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Event = require('./eventsModel');

const FinesSchema = new Schema({
  name: String,
  organization: { type: Schema.Types.ObjectId, ref: 'Organization' },
  event: { type: Schema.Types.ObjectId, ref: 'Event' },
  date_of_penalty: Date,
  amount: Number,
  student: { type: Schema.Types.ObjectId, ref: 'Student' },
  description: String,
  status: Boolean,
  // Other fields
});

FinesSchema.pre('save', async function (next) {
  try {
    // If the name is not provided, fetch it from the related event
    if (!this.name && this.event) {
      const relatedEvent = await Event.findById(this.event);
      if (relatedEvent) {
        this.name = relatedEvent.name;
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Fines = mongoose.model('Fines', FinesSchema);

module.exports = { Fines };
