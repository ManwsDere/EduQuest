// import cors from 'cors';
// import dotenv from 'dotenv';
// import express from 'express';
// import mongoose from 'mongoose';
// import authRoute from './routes/authRoute.js';
// import schemaRoutes from './routes/schemaRoute.js';

// // Initialize environment variables
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5001;

// // Middleware
// app.use(cors({
//   origin: 'http://localhost:5500',  // frontend running on port 5500
//   credentials: true
// }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Database connection
// mongoose.connect(
//   process.env.MONGODB_URI || 'mongodb+srv://manasdere2004:upP2DLeTJeeUS9GL@eduquest-cluster.48gxqjy.mongodb.net/?retryWrites=true&w=majority&appName=EduQuest-Cluster'
// )
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Routes
// app.use('/api/auth', authRoute);
// app.use('/api/route', schemaRoutes);

// // Example test route
// app.get('/get', (req, res) => {
//   res.json({ message: "Data from backend" });
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running at: http://localhost:${PORT}`);
// });

// export default app;


import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import authRoute from './routes/authRoute.js';
import schemaRoutes from './routes/schemaRoute.js';

const app = express();

// Hardcoded port (since you're not using .env)
const PORT = 5001;

// Middleware
app.use(cors({
  origin: 'http://52.206.207.179:80',  // frontend exposed on port 80 in Docker
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection (Docker Compose will use service name "mongodb")
mongoose.connect('mongodb://mongodb:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoute);
app.use('/api/route', schemaRoutes);

// Test route
app.get('/get', (req, res) => {
  res.json({ message: "Data from backend" });
});

// Start server
app.listen(PORT, () => {
  console.log('🚀 Server running at: http://localhost:${PORT}');
});

export default app;