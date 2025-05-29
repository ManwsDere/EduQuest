import mongoose from 'mongoose';

// ====== Quiz & Test Question Schema ======
const qaSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String }],
  answer: { type: String, required: true },
}, { _id: false });

// ====== Flashcard Schema ======
const flashcardSchema = new mongoose.Schema({
  front: { type: String, required: true },
  back: { type: String, required: true },
}, { _id: false });

// ====== Element Schema ======
const elementSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['quiz', 'flashcard', 'note', 'video', 'test'],
    required: true,
  },
  content: {
    type: mongoose.Schema.Types.Mixed, // Content format depends on the 'type'
    required: true,
  },
}, { _id: false });

// ====== Subject Schema ======
const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  elements: [elementSchema],
}, { _id: false });

// ====== Course Schema ======
const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subjects: [subjectSchema],
}, { _id: false });

// ====== University Schema ======
const universitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  courses: [courseSchema],
});

const University = mongoose.model('University', universitySchema);
export default University;