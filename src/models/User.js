import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, unique:true },
  firstName: { type: String },
  lastName: { type: String },
  password: { type: String }
}, { timestamps: true });



mongoose.models = {}

export default mongoose.model("User", userSchema);