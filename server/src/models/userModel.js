const mongoose = require('mongoose');

const { Schema } = mongoose;

const rank = new Schema({
    date: { type: Date, required: true },
    score: { type: Date, required: true },
});

const userSchema = new Schema({
    accountId: { type: Schema.Types.ObjectId, required: true },
    profileIconId: { type: String, required: true },
    date_created: { type: Date, required: true },
    date_deleted: { type: Date, required: true },
    last_modified: { type: Date, required: true },
    rank_history: { type: [rank], required: true },
    mmr: { type: Number, required: true },
    matches_id: { type: [Schema.Types.ObjectId], required: true },
});

module.exports = mongoose.model('User', userSchema);

