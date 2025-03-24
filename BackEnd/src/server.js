import express from 'express';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import dotenv from 'dotenv';
import { connectToDatabase } from './lib/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { app, server } from './lib/socket.js'; // Import WebSocket server

dotenv.config();

const PORT = process.env.PORT || 5001;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173"; // Define frontend URL

// Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Updated CORS Configuration
app.use(cors({
    origin: [FRONTEND_URL], // Allow frontend domain (update in .env for deployment)
    credentials: true
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// ✅ Only serve static files if backend & frontend are in the same deployment
// Remove if frontend is hosted separately (e.g., on Vercel, Netlify)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "../../FrontEnd/dist")));
  }
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../FrontEnd/dist", "index.html"));
  });
  
// Start server
server.listen(PORT, () => {
    console.log(`✅ Server is running on port: ${PORT}`);
    connectToDatabase();
});
