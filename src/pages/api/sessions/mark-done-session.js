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
    const sessionId = req.body.sessionId;
    const duration = req.body.duration;
    const session_id = new mongoose.Types.ObjectId(sessionId);
    console.log(session_id, duration, id)
    const session = await Session.findById(session_id);
    if (session.status === "completed") {
        console.log("Session is already completed. Performing additional action.");
        
      } else {
        await Session.updateOne({ _id: session_id }, { status: "completed" });
    await User.updateOne({ username: id }, { $inc: { timeSpend: duration } })
      }
    
 
    return res.status(200).json({ type: "success", message: 'Session marked as completed' });


  } catch (error) {
    console.log(error)
    return res.status(401).json({ type: "error", message: 'Something Went wrong' });
  }
};

const applyMiddlewares = (...middlewares) => (handler) => {
  return middlewares.reduce((acc, middleware) => middleware(acc), handler);
};


export default applyMiddlewares(connectDB, auth)(dataHandler);