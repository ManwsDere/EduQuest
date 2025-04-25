import express from 'express';
import University from '../models/University.js';

const router = express.Router();

// Get all universities
router.get('/universities', async (req, res) => {
  try {
    const universities = await University.find();
    res.json(universities);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch universities', details: err.message });
  }
});

// Add a new university
router.post('/universities', async (req, res) => {
  try {
    const university = new University(req.body);
    const saved = await university.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create university', details: err.message });
  }
});

// Get university by ID
router.get('/universities/:id', async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    if (!university) {
      return res.status(404).json({ error: 'University not found' });
    }
    res.json(university);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch university', details: err.message });
  }
});

// Get all courses for a university
router.get('/universities/:id/courses', async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    if (!university) {
      return res.status(404).json({ error: 'University not found' });
    }
    res.json(university.courses || []);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch courses', details: err.message });
  }
});

// Get specific course from a university
router.get('/universities/:id/courses/:courseIndex', async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    if (!university) {
      return res.status(404).json({ error: 'University not found' });
    }
    
    const courseIndex = parseInt(req.params.courseIndex);
    if (courseIndex < 0 || courseIndex >= university.courses.length) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    res.json(university.courses[courseIndex]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch course', details: err.message });
  }
});

// Get specific subject from a course
router.get('/universities/:id/courses/:courseIndex/subjects/:subjectIndex', async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    if (!university) {
      return res.status(404).json({ error: 'University not found' });
    }
    
    const courseIndex = parseInt(req.params.courseIndex);
    if (courseIndex < 0 || courseIndex >= university.courses.length) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    const subjectIndex = parseInt(req.params.subjectIndex);
    if (subjectIndex < 0 || subjectIndex >= university.courses[courseIndex].subjects.length) {
      return res.status(404).json({ error: 'Subject not found' });
    }
    
    res.json(university.courses[courseIndex].subjects[subjectIndex]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch subject', details: err.message });
  }
});

// Get resources by type for a specific subject
router.get('/universities/:id/courses/:courseIndex/subjects/:subjectIndex/resources/:type', async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    if (!university) {
      return res.status(404).json({ error: 'University not found' });
    }
    
    const courseIndex = parseInt(req.params.courseIndex);
    if (courseIndex < 0 || courseIndex >= university.courses.length) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    const subjectIndex = parseInt(req.params.subjectIndex);
    if (subjectIndex < 0 || subjectIndex >= university.courses[courseIndex].subjects.length) {
      return res.status(404).json({ error: 'Subject not found' });
    }
    
    const subject = university.courses[courseIndex].subjects[subjectIndex];
    const { type } = req.params;
    
    // Filter elements by the requested type
    const resources = subject.elements.filter(element => element.type === type);
    
    res.json({
      universityName: university.name,
      courseName: university.courses[courseIndex].name,
      subjectName: subject.name,
      resources: resources
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch resources', details: err.message });
  }
});

// Get quiz questions from a specific subject
router.get('/universities/:id/courses/:courseIndex/subjects/:subjectIndex/quiz', async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    if (!university) {
      return res.status(404).json({ error: 'University not found' });
    }
    
    const courseIndex = parseInt(req.params.courseIndex);
    if (courseIndex < 0 || courseIndex >= university.courses.length) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    const subjectIndex = parseInt(req.params.subjectIndex);
    if (subjectIndex < 0 || subjectIndex >= university.courses[courseIndex].subjects.length) {
      return res.status(404).json({ error: 'Subject not found' });
    }
    
    const subject = university.courses[courseIndex].subjects[subjectIndex];
    
    // Filter quiz elements
    const quizElements = subject.elements.filter(element => element.type === 'quiz');
    const quizQuestions = quizElements.map(element => element.content);
    
    res.json({
      universityName: university.name,
      courseName: university.courses[courseIndex].name,
      subjectName: subject.name,
      questions: quizQuestions
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch quiz questions', details: err.message });
  }
});

// Get test questions from a specific subject
router.get('/universities/:id/courses/:courseIndex/subjects/:subjectIndex/test', async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    if (!university) {
      return res.status(404).json({ error: 'University not found' });
    }
    
    const courseIndex = parseInt(req.params.courseIndex);
    if (courseIndex < 0 || courseIndex >= university.courses.length) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    const subjectIndex = parseInt(req.params.subjectIndex);
    if (subjectIndex < 0 || subjectIndex >= university.courses[courseIndex].subjects.length) {
      return res.status(404).json({ error: 'Subject not found' });
    }
    
    const subject = university.courses[courseIndex].subjects[subjectIndex];
    
    // Filter test elements
    const testElements = subject.elements.filter(element => element.type === 'test');
    const testQuestions = testElements.map(element => element.content);
    
    res.json({
      universityName: university.name,
      courseName: university.courses[courseIndex].name,
      subjectName: subject.name,
      questions: testQuestions
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch test questions', details: err.message });
  }
});

// Get flashcards from a specific subject
router.get('/universities/:id/courses/:courseIndex/subjects/:subjectIndex/flashcards', async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    if (!university) {
      return res.status(404).json({ error: 'University not found' });
    }
    
    const courseIndex = parseInt(req.params.courseIndex);
    if (courseIndex < 0 || courseIndex >= university.courses.length) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    const subjectIndex = parseInt(req.params.subjectIndex);
    if (subjectIndex < 0 || subjectIndex >= university.courses[courseIndex].subjects.length) {
      return res.status(404).json({ error: 'Subject not found' });
    }
    
    const subject = university.courses[courseIndex].subjects[subjectIndex];
    
    // Filter flashcard elements
    const flashcardElements = subject.elements.filter(element => element.type === 'flashcard');
    const flashcards = flashcardElements.map(element => element.content);
    
    res.json({
      universityName: university.name,
      courseName: university.courses[courseIndex].name,
      subjectName: subject.name,
      flashcards: flashcards
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch flashcards', details: err.message });
  }
});

// Add a new element to a subject
router.post('/universities/:id/courses/:courseIndex/subjects/:subjectIndex/elements', async (req, res) => {
  try {
    const { type, content } = req.body;
    
    if (!type || !content) {
      return res.status(400).json({ error: 'Type and content are required' });
    }
    
    const university = await University.findById(req.params.id);
    if (!university) {
      return res.status(404).json({ error: 'University not found' });
    }
    
    const courseIndex = parseInt(req.params.courseIndex);
    if (courseIndex < 0 || courseIndex >= university.courses.length) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    const subjectIndex = parseInt(req.params.subjectIndex);
    if (subjectIndex < 0 || subjectIndex >= university.courses[courseIndex].subjects.length) {
      return res.status(404).json({ error: 'Subject not found' });
    }
    
    // Add the new element
    university.courses[courseIndex].subjects[subjectIndex].elements.push({ type, content });
    
    // Save the updated university
    await university.save();
    
    res.status(201).json({
      message: 'Element added successfully',
      element: { type, content }
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add element', details: err.message });
  }
});

export default router;