const mongoose = require('mongoose');

const { Schema } = mongoose;

const matchSchema = new Schema({
    matchId: { type: Schema.Types.ObjectId, required: true },
    date_started: {
        type: Date,
        required: true,
        default: new Date('December 17, 1995 03:24:00'),
    },
    date_ended: {
        type: Date,
        required: true,
        default: new Date('December 25, 1995 03:24:00'),
    },
    players_id: {
        type: [Schema.Types.ObjectId],
        required: true,
        default: ['123', '345', '567'],
    },
    average_mmr: { type: Number, required: true, default: 1000 },
    deck_id: { type: String, required: true, default: '123456789012' },
});

module.exports = mongoose.model('Match', matchSchema);

