import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Star Wars Tactical Map API is running',
    timestamp: new Date().toISOString()
  });
});

// Placeholder routes for future API
app.get('/api/planets', (req, res) => {
  res.json({ message: 'Planets API - Coming soon' });
});

app.get('/api/fleets', (req, res) => {
  res.json({ message: 'Fleets API - Coming soon' });
});

app.get('/api/territories', (req, res) => {
  res.json({ message: 'Territories API - Coming soon' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
});
