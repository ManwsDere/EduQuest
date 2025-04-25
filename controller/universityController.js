// controllers/universityController.js
import University from '../models/University.js';

// Get all universities
export const getAllUniversities = async (req, res) => {
  try {
    const universities = await University.find();
    res.json(universities);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch universities', details: err.message });
  }
};

// Get university by ID
export const getUniversityById = async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    if (!university) {
      return res.status(404).json({ error: 'University not found' });
    }
    res.json(university);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch university', details: err.message });
  }
};

// Get all courses for a university
export const getUniversityCourses = async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    if (!university) {
      return res.status(404).json({ error: 'University not found' });
    }
    res.json(university.courses || []);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch courses', details: err.message });
  }
};

// Get specific course from a university
export const getUniversityCourse = async (req, res) => {
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
};

// Get specific subject from a course
export const getCourseSubject = async (req, res) => {
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
};

// Get resources by type for a specific subject
export const getSubjectResources = async (req, res) => {
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
};

// Add a new university
export const createUniversity = async (req, res) => {
  try {
    const university = new University(req.body);
    const saved = await university.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create university', details: err.message });
  }
};