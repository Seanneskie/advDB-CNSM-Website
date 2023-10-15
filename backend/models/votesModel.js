const mongoose = require('mongoose');

const Schema = mongoose.Schema;


// model imports for foreign keys
const Voting = require('./votingModel')


const VotesSchema = new Schema ({
    Agree: Number,
    Disagree: Number,
    voting : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Voting'
    }
    
})

const Vote = mongoose.model('Votes', VotesSchema);
module.exports = {Vote}