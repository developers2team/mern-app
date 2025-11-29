// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Example simple model
const userSchema = new mongoose.Schema({
  name: String,
  email: String
});
const User = mongoose.model('User', userSchema);

// Example routes
app.get('/', (req, res) => res.send('Hello from backend'));
app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});
app.post('/api/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

// Connect to MongoDB
const uri = 'mongodb+srv://ankitMern:AnkitMern@cluster0.ieaiau3.mongodb.net/?appName=Cluster0' || 'mongodb://localhost:27017/mern_demo';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> {
    console.log('MongoDB connected');
    const port = 8000;
    app.listen(port, ()=> console.log(`Server listening ${port}`));
  })
  .catch(err => console.error('Mongo connect error:', err));


// const mongoose = require('mongoose');
// require('dotenv').config();

// const connectDB = async (dbname) => {
//   const mongoURI = `${'mongodb+srv://ankitMern:AnkitMern@cluster0.ieaiau3.mongodb.net/?appName=Cluster0'}?authSource=admin&w=majority`;

//   const connection = await mongoose.createConnection(mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   });

//   return connection;
// };

// module.exports = connectDB;