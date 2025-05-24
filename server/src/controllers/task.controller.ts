import { Request, Response } from 'express';
import { TaskModel, CreateTaskData, UpdateTaskData } from '../models/task.model.js';

export class TaskController {
  /**
   * Get all tasks for the authenticated user
   */
  static async getAllTasks(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
      }
      
      const tasks = await TaskModel.findAllByUser(req.user.id);
      res.json(tasks);
    } catch (error) {
      console.error('Get all tasks error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
  
  /**
   * Get a single task by ID
   */
  static async getTaskById(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
      }
      
      const taskId = parseInt(req.params.id);
      
      if (isNaN(taskId)) {
        return res.status(400).json({ message: 'Invalid task ID' });
      }
      
      const task = await TaskModel.findById(taskId, req.user.id);
      
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      
      res.json(task);
    } catch (error) {
      console.error('Get task by ID error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
  
  /**
   * Create a new task
   */
  static async createTask(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
      }
      
      const { title, description, status, priority, due_date } = req.body;
      
      const taskData: CreateTaskData = {
        title,
        description,
        status,
        priority,
        due_date: due_date ? new Date(due_date) : null,
        user_id: req.user.id
      };
      
      const task = await TaskModel.create(taskData);
      res.status(201).json(task);
    } catch (error) {
      console.error('Create task error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
  
  /**
   * Update a task
   */
  static async updateTask(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
      }
      
      const taskId = parseInt(req.params.id);
      
      if (isNaN(taskId)) {
        return res.status(400).json({ message: 'Invalid task ID' });
      }
      
      // Check if task exists and belongs to user
      const existingTask = await TaskModel.findById(taskId, req.user.id);
      
      if (!existingTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
      
      const { title, description, status, priority, due_date } = req.body;
      
      const updateData: UpdateTaskData = {};
      
      if (title !== undefined) updateData.title = title;
      if (description !== undefined) updateData.description = description;
      if (status !== undefined) updateData.status = status;
      if (priority !== undefined) updateData.priority = priority;
      if (due_date !== undefined) {
        updateData.due_date = due_date ? new Date(due_date) : null;
      }
      
      const updatedTask = await TaskModel.update(taskId, req.user.id, updateData);
      
      if (!updatedTask) {
        return res.status(500).json({ message: 'Failed to update task' });
      }
      
      res.json(updatedTask);
    } catch (error) {
      console.error('Update task error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
  
  /**
   * Delete a task
   */
  static async deleteTask(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
      }
      
      const taskId = parseInt(req.params.id);
      
      if (isNaN(taskId)) {
        return res.status(400).json({ message: 'Invalid task ID' });
      }
      
      // Check if task exists and belongs to user
      const existingTask = await TaskModel.findById(taskId, req.user.id);
      
      if (!existingTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
      
      const deleted = await TaskModel.delete(taskId, req.user.id);
      
      if (!deleted) {
        return res.status(500).json({ message: 'Failed to delete task' });
      }
      
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error('Delete task error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}