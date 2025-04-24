import express from 'express';
import University from '../models/University.js'; // Adjust the path accordingly

const router = express.Router();

router.get('/universities', async (req, res) => {
  try {
    const universities = await University.find();
    res.json(universities);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch universities' });
  }
});

// ====== Sample Route: Add a university with nested structure ======
router.post('/universities', async (req, res) => {
  try {
    const university = new University(req.body);
    const saved = await university.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create university', details: err });
  }
});

// ====== Get a University by ID ======
router.get('/universities/:id', async (req, res) => {
  try {
    const university = await University.findById(req.params.id);

    if (!university) {
      return res.status(404).json({ error: 'University not found' });
    }

    res.json(university);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch university', details: err });
  }
});


export default router;
