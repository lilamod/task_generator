
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

app.use("/api", require("./routes/index"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});