
import bcrypt from 'bcryptjs';
import User from "@/models/User"
const signupHandler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { username, password } = req.body;

  const user = await User.findOne({username: username})

  if (user) {
    return res.status(400).json({message: "User already exists", type: "error"})
  }

  else {



    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

        let user = new User({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hashedPassword
        })
    
        await user.save();
      res.status(201).json({ message: 'User created successfully' });
    }
};

export default signupHandler;
