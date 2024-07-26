import auth from "@/middlewares/auth"
import connectDB from '@/middlewares/connectDB';
import Session from '@/models/Session';


const dataHandler = async (req, res) => {

  if (req.body.API_KEY !== process.env.API_SECRET_KEY) {
    return res.status(401).json({ type: "error", message: 'Unauthorized' });
  }
  
    const now = new Date();
    const currentYear = now.getUTCFullYear();
    const currentMonth = now.getUTCMonth() + 1;
    const currentDay = now.getUTCDate();
    const currentHour = now.getUTCHours();
    const currentMinute = now.getUTCMinutes();
  try {
    
    const sessions = await Session.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $eq: [{ $year: "$start" }, currentYear] },
              { $eq: [{ $month: "$start" }, currentMonth] },
              { $eq: [{ $dayOfMonth: "$start" }, currentDay] },
              { $eq: [{ $hour: "$start" }, currentHour] },
              { $eq: [{ $minute: "$start" }, currentMinute] }
            ]
          }
        }
      },
      {
        $lookup: {
          from: 'users', // Name of the user collection
          localField: 'username', // Field in the session collection
          foreignField: 'username', // Field in the user collection
          as: 'userDetails', // Output array field,
          pipeline: [
            {
              $project: {
                _id: 0, // Exclude the _id field
                username: 1, // Include the username field
                fcmToken: 1 // Include the email field
                // Add other fields you need
              }
            }
          ]
        }
      },
      {
        $unwind: '$userDetails' // Optional: Unwind the userDetails array to get individual objects
      }
    ])

    return res.status(200).json({ type: "success", message: 'Sessions Found', sessions: sessions });
   


  } catch (error) {
    console.log(error)
    return res.status(401).json({ type: "error", message: 'Something Went wrong' });
  }
};

const applyMiddlewares = (...middlewares) => (handler) => {
  return middlewares.reduce((acc, middleware) => middleware(acc), handler);
};


// export default applyMiddlewares(connectDB, auth)(dataHandler);
export default connectDB(dataHandler);