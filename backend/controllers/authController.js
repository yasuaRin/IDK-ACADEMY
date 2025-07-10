const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

// REGISTER
exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Cek apakah user sudah ada
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'Email sudah digunakan' });

    // Validasi kekuatan password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        msg: 'Password harus minimal 8 karakter, mengandung huruf besar, huruf kecil, angka, dan simbol.'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user ke database
    user = await User.create({
      email,
      password: hashedPassword,
      name
    });

    // Buat token verifikasi
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Kirim email verifikasi
    const url = `${process.env.CLIENT_URL}/verify/${token}`;
    await sendEmail(
      email,
      'Verifikasi Email',
      `<h2>Hai ${name}</h2><p>Silakan klik link di bawah ini untuk verifikasi akun:</p><a href="${url}">${url}</a>`
    );

    res.status(200).json({ msg: 'Registrasi berhasil! Silakan cek email Anda untuk verifikasi.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Terjadi kesalahan di server.' });
  }
};

// VERIFIKASI EMAIL
exports.verifyEmail = async (req, res) => {
  try {
    const { id } = jwt.verify(req.params.token, process.env.JWT_SECRET);
    const user = await User.findByIdAndUpdate(id, { isVerified: true });

    if (!user) return res.status(404).send('User tidak ditemukan.');

    res.send('Email berhasil diverifikasi!');
  } catch (err) {
    console.error(err);
    res.status(400).send('Link tidak valid atau sudah kadaluarsa.');
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cek user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Email atau password salah' });

    // Cek password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Email atau password salah' });

    // Buat token JWT
    const token = jwt.sign(
      { id: user._id, isVerified: user.isVerified },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Login gagal' });
  }
};
