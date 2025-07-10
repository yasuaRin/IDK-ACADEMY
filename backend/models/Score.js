const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    subject: { type: String, required: true },
    score: { type: Number, required: true },
    feedback: { type: String },
    date: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Score', scoreSchema);
