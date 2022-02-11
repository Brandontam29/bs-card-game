const mongoose = require('mongoose');

const { Schema } = mongoose;

const matchSchema = new Schema({
    matchId: { type: Schema.Types.ObjectId, required: true },
    date_started: { type: Date, required: true },
    date_ended: { type: Date, required: true },
    players_id: { type: [Schema.Types.ObjectId], required: true },
    average_score: { type: Number, required: true },
    average_mmr: { type: Number, required: true },
});

export default mongoose.model('Match', matchSchema);
