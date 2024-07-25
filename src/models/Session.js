import mongoose from 'mongoose';
const { Schema } = mongoose;

const sessionSchema = new Schema({
  username: { type: String },
  title: { type: String },
  start: { type: Date },
  end: { type: Date },
  subject: { type: String },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  }
}, { timestamps: true });



mongoose.models = {}

export default mongoose.model("Session", sessionSchema);