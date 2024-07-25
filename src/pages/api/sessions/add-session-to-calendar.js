import auth from "@/middlewares/auth"
import connectDB from '@/middlewares/connectDB';
import User from '@/models/User';
import Session from '@/models/Session';
import jwt from 'jsonwebtoken';
import { addDays } from "date-fns";
const dataHandler = async (req, res) => {

  try {
      const { authorization } = req.headers;
      const token = authorization.split(' ')[1];
    const decoded = jwt.decode(token); // Use environment variable for secret
    const { id } = decoded;

   

    const {sessions} = req.body;
    let taskAdded;
    let currentDate;
    let startDate;
    let endDate;

    for (const element of sessions) {

      console.log("Parsing ")
      console.log(element)
      taskAdded = false;
      currentDate = new Date();
      currentDate = currentDate.setHours(element.startTime.split(':')[0], element.startTime.split(':')[1], 0);
      
      
      

  

      while(!taskAdded){
        let session = await Session.findOne({startTime: new Date(currentDate), username: id});
        if(session){
          // increment 1 day to current date
          currentDate = currentDate.setDate(currentDate.getDate() + 1);
          console.log("Incrementing date")
      }
      else{
        startDate = new Date();
        startDate = startDate.setHours(element.startTime.split(':')[0], element.startTime.split(':')[1], 0);
      

      endDate = new Date();
      endDate = endDate.setHours(element.endTime.split(':')[0], element.endTime.split(':')[1], 0);
        const newSession = new Session({
          title: element.topic,
          username: id,
          start: startDate,
          end: endDate,
          subject: element.subject,
          status: 'pending'
        });
        console.log(newSession)
        await newSession.save();
        taskAdded = true;
        console.log("Task added")
      }
    }
      
  }
    

  
    return res.status(200).json({ type: "success", message: 'Sessions added to calendar', sessions: sessions });
   


  } catch (error) {
    console.log(error)
    return res.status(401).json({ type: "error", message: 'Something Went wrong' });
  }
};

const applyMiddlewares = (...middlewares) => (handler) => {
  return middlewares.reduce((acc, middleware) => middleware(acc), handler);
};


export default applyMiddlewares(connectDB, auth)(dataHandler);