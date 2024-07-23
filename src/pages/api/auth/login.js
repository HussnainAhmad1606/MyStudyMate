import bcrypt from 'bcryptjs';
import { signToken } from '@/utils/jwt';
import User from '@/models/User';

const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET;
const REFRESH_SECRET_KEY = process.env.NEXT_PUBLIC_JWT_REFRESH_SECRET;

const loginHandler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { username, password } = req.body;
  const user = await User.findOne({username: username})

  if (!user) {
    return res.status(401).json({ type: "error",message: 'Invalid username or password' });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(401).json({ type: "error", message: 'Invalid username or password' });
  }

  const token = signToken({ id: user.username }, SECRET_KEY, '1h');
  const refreshToken = signToken({ id: user.username }, REFRESH_SECRET_KEY, '7d');

  res.status(200).json({ type: "success", message: "Logged in Sucess", token: token, refreshToken: refreshToken });
};

export default loginHandler;
