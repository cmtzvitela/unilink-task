import express from 'express';
import Task from '../models/task.js';

const taskRouter = express.Router();

taskRouter.post('/newTask', async (req, res) => {
  const newTask = new Task(req.body);
  console.log('🚀 ~ newTask:', newTask);
  try {
    await newTask.save();
    console.log('Successfully added a task');
    res.status(201).send(newTask);
  } catch (error) {
    console.log('🚀 ~ error:', error);
    res.status(500).send(error);
  }
});

taskRouter.get('/task/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOne({ _id });
    console.log('🚀 ~ task:', task);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

taskRouter.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    console.log('🚀 ~ tasks:', tasks);
    if (!tasks) {
      return res.status(404).send();
    }
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

taskRouter.patch('/task/:id', async (req, res) => {
  console.log('🚀 ~ req:', req.body);
  const _id = req.params.id;
  try {
    const task = await Task.findOne({ _id });
    console.log('🚀 ~ task before', task);

    if (!task) {
      return res.status(404).send();
    }

    task.title = req.body.title;
    task.completed = req.body.completed;
    await task.save();
    console.log('🚀 ~ task after', task);

    console.log('Successfully updated the task');
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

taskRouter.delete('/task/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOneAndDelete({ _id });
    if (!task) {
      return res.status(404).send();
    }
    console.log('Successfully deleted the task');
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default taskRouter;
