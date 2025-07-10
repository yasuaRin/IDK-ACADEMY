const Score = require('../models/Score');
exports.createScore = async (req, res) => {
  const { studentName, subject, score } = req.body;
  const sc = await Score.create({ studentName, subject, score, user: req.user.id });
  res.json(sc);
};
exports.getScores = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const scores = await Score.find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);
  const count = await Score.countDocuments({ user: req.user.id });
  res.json({ scores, totalPages: Math.ceil(count / limit), currentPage: +page });
};

exports.createScore = async (req, res) => {
  const { studentName, subject, score, feedback, date } = req.body;
  const sc = await Score.create({
    studentName,
    subject,
    score,
    feedback,
    date,
    user: req.user.id
  });
  res.json(sc);
};

exports.updateScore = async (req, res) => {
  const { id } = req.params;
  const updated = await Score.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
};

exports.deleteScore = async (req, res) => {
  await Score.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Deleted' });
};
