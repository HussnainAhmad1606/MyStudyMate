import { verifyToken } from '@/utils/jwt';
import auth from "@/middlewares/auth"
import connectDB from '@/middlewares/connectDB';
import Session from '@/models/Session';
import jwt from 'jsonwebtoken';

const dataHandler = async (req, res) => {

  try {
      const { authorization } = req.headers;
      const token = authorization.split(' ')[1];
    const decoded = jwt.decode(token); // Use environment variable for secret
    const { id } = decoded;

    const sessions = await Session.find({ username: id });
    return res.status(200).json({ type: "success", message: 'Sessions Found', sessions: sessions });
   


  } catch (error) {
    console.log(error)
    return res.status(401).json({ type: "error", message: 'Something Went wrong' });
  }
};

const applyMiddlewares = (...middlewares) => (handler) => {
  return middlewares.reduce((acc, middleware) => middleware(acc), handler);
};


export default applyMiddlewares(connectDB, auth)(dataHandler);