
import connectDB from "@/middlewares/connectDB";

const handler = async (req, res) => {

    return res.status(200).json({message: "DB Connected"})
  
}


export default connectDB(handler);