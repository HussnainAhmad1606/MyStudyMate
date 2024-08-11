import { verifyToken } from '@/utils/jwt';
import auth from "@/middlewares/auth"
import connectDB from '@/middlewares/connectDB';
import User from '@/models/User';
import Session from '@/models/Session';
import jwt from 'jsonwebtoken';
const mongoose = require('mongoose');


const dataHandler = async (req, res) => {

  try {
      const { authorization } = req.headers;
      const token = authorization.split(' ')[1];
    const decoded = jwt.decode(token); // Use environment variable for secret
    const { id } = decoded;
    const timeSpend = await User.findOne({username: id}).select('timeSpend');
    const sessions = await Session.find({ username: id });
    const totalSessions = sessions.length;
    const completedSessions = sessions.filter(session => session.status === "completed").length;
    
 
    return res.status(200).json({ type: "success", message: 'Got Analytics', timeSpend: timeSpend.timeSpend, totalSessions: totalSessions, completedSessions: completedSessions });


  } catch (error) {
    console.log(error)
    return res.status(401).json({ type: "error", message: 'Something Went wrong' });
  }
};

const applyMiddlewares = (...middlewares) => (handler) => {
  return middlewares.reduce((acc, middleware) => middleware(acc), handler);
};


export default applyMiddlewares(connectDB, auth)(dataHandler);