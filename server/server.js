const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const MONGO_URI = process.env.MONGODB_URI;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.use(cors({
  origin: process.env.CLIENT_URL,
  method: "PUT,DELETE,POST,GET"
}));
app.use(bodyParser.json());

app.get('/health', async (req, res) => {
  try {
    const dbStatus = mongoose.connection.readyState === 1 ? 'Up' : 'Down';
    
    res.json({
      backend: 'Up',  
      database: dbStatus,
      llm: 'Not implemented (placeholder)' 
    });
  } catch (error) {
    res.status(500).json({ backend: 'Down', database: 'Down', llm: 'N/A' });
  }
});

app.use("/api", require("./routes/index"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});