import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/user.model.js';

const router = Router();


router.post('/register', async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;

    const exists = await UserModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await UserModel.create({
      first_name,
      last_name,
      email,
      age,
      password: hashedPassword
    });

    res.status(201).json({ status: 'success', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  const token = jwt.sign(
    { sub: req.user._id },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  });

  res.json({ status: 'success', message: 'Logged in successfully' });
});


router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ user: req.user });
});


router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ status: 'success', message: 'Logged out successfully' });
});

export default router;