
import auth from "@/middlewares/auth"
import connectDB from '@/middlewares/connectDB';
import Session from '@/models/Session';
import jwt from 'jsonwebtoken';
const moment = require('moment');
async function handler(req, res) {

    if (req.method === 'POST') {
        try {
    const { authorization } = req.headers;
    const token = authorization?.split(' ')[1];
    const decoded = jwt.decode(token);
    const { username } = decoded;
    console.log(username)

    await Session.aggregate([
        {
          $match: {
            start: {
              $gte: moment().startOf('month').toDate(),
              $lte: moment().endOf('month').toDate()
            },
            username: username
          }
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$start" } }, // Group by date (format YYYY-MM-DD)
            sessionCount: { $sum: 1 } // Count the number of sessions
          }
        },
        {
          $project: {
            _id: 0, // Exclude the _id field
            x: "$_id", // Rename _id to date
            y: "$sessionCount"  // Include the sessionCount field
          }
        }
      ])
      .then(results => {
        return res.status(201).json({type: "success", data: results})

      })
      .catch(error => {
        console.error(error);
        return res.status(500).json({type: "error", message: "Something went wrong"})

      });
      
        }
    catch (error) {
    return res.status(500).json({ type: "error", message: 'Something went wrong' });
        }
  } else {
    return res.status(405).json({ type: "error", message: 'Only POST method is allowed' });
  }
}


const applyMiddlewares = (...middlewares) => (handler) => {
    return middlewares.reduce((acc, middleware) => middleware(acc), handler);
  };
  
  
  export default applyMiddlewares(connectDB, auth)(handler);