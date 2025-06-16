import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  q: String,
  a: String,
}, { _id: false });

const UserProfileSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  image: String,
  location: String,
  language: String,
  skills: [String],
  learning: [String],
  questions: [QuestionSchema],
});

export default mongoose.models.UserProfile || mongoose.model('UserProfile', UserProfileSchema);
