
import bcrypt from 'bcryptjs';
import User from "@/models/User";
import connectDB from '@/middlewares/connectDB';
const signupHandler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { Username, Password, FirstName, LastName } = req.body;

  const user = await User.findOne({username: Username})

  if (user) {
    return res.status(400).json({message: "User already exists", type: "error"})
  }

  else {



    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

        let user = new User({
            username: req.body.Username,
            firstName: req.body.FirstName,
            lastName: req.body.LastName,
            password: hashedPassword
        })
    
        await user.save();
      res.status(201).json({ message: 'User created successfully' });
    }
};

export default connectDB(signupHandler);
