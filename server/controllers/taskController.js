const { generateTasks } = require('../utils/generator');
const Task = require('../models/Task');

const generateTask = async (req, res) => {
  try {
    const { goal, users, constraints, template, risks } = req.body;
    if (!goal || !users || !constraints) {
      return res.status(400).json({ error: 'Goal, users, and constraints are required.' });
    }

    const result = generateTasks({ goal, users, constraints, template, risks }); 
     const newTask = new Task({ ...result, userId: req.user.userId }); 
    await newTask.save();

    res.json(result);
  } catch (error) {
    console.error('Error generating/saving spec:', error);
    res.status(500).json({ error: error.message });
  }
};

const getLast5Tasks = async (req, res) => {
  try {
    const userId = req.user.userId;
    const Tasks = await Task.find({ userId }).sort({ createdAt: -1 }).limit(5);
    res.json(Tasks);
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
};

module.exports = { generateTask, getLast5Tasks };