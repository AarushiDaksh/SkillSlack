import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  email: String,
  name: String,
  image: String,
  location: String,
  language: String,
  skills: [String],
  learning: [String],
});

export default mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);
