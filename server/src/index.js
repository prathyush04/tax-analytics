import express from 'express';
import cors from 'cors';
import propertyRoutes from './routes/propertyRoutes.js';
import ChatRoutes from './routes/ChatRoute.js';
import 'dotenv/config';

const app = express();
const PORT = 3000;

app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST'],
}));
app.use(express.json());
app.use('/api', ChatRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api', propertyRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
