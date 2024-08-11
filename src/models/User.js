import mongoose from 'mongoose';
const { Schema } = mongoose;
const sessionTimingSchema = new Schema({
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});
const userSchema = new Schema({
  username: { type: String, unique:true },
  firstName: { type: String },
  lastName: { type: String },
  password: { type: String },
  timeSpend: { type: Number, default: 0 },
  sessionTimings: [sessionTimingSchema],
  
}, { timestamps: true });



mongoose.models = {}

export default mongoose.model("User", userSchema);