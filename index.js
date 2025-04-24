import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authRoute from './routes/authRoute.js';
import schemaRoutes from './routes/schemaRoute.js';

// Initialize environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//manasdere2004
//upP2DLeTJeeUS9GL

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://manasdere2004:upP2DLeTJeeUS9GL@eduquest-cluster.48gxqjy.mongodb.net/?retryWrites=true&w=majority&appName=EduQuest-Cluster')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoute);
app.use('/api/route', schemaRoutes);


// Start server
app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
});

export default app;