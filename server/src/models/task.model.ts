import pool from '../db/pool.js';
import { TaskStatus, TaskPriority } from '../types/task.js';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  due_date: Date | null;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateTaskData {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  due_date?: Date | null;
  user_id: number;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  due_date?: Date | null;
}

export class TaskModel {
  /**
   * Create a new task
   */
  static async create(taskData: CreateTaskData): Promise<Task> {
    try {
      const { title, description, status, priority, due_date, user_id } = taskData;
      
      const result = await pool.query(
        `INSERT INTO tasks 
         (title, description, status, priority, due_date, user_id) 
         VALUES ($1, $2, $3, $4, $5, $6) 
         RETURNING *`,
        [title, description, status, priority, due_date, user_id]
      );
      
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Get all tasks for a user
   */
  static async findAllByUser(userId: number): Promise<Task[]> {
    try {
      const result = await pool.query(
        'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
        [userId]
      );
      
      return result.rows;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Get a task by ID
   */
  static async findById(id: number, userId: number): Promise<Task | null> {
    try {
      const result = await pool.query(
        'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',
        [id, userId]
      );
      
      if (result.rows.length === 0) {
        return null;
      }
      
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Update a task
   */
  static async update(id: number, userId: number, updateData: UpdateTaskData): Promise<Task | null> {
    try {
      // Build update query dynamically
      const updates: string[] = [];
      const values: any[] = [];
      let paramIndex = 1;
      
      // Add fields to update
      if (updateData.title !== undefined) {
        updates.push(`title = $${paramIndex++}`);
        values.push(updateData.title);
      }
      
      if (updateData.description !== undefined) {
        updates.push(`description = $${paramIndex++}`);
        values.push(updateData.description);
      }
      
      if (updateData.status !== undefined) {
        updates.push(`status = $${paramIndex++}`);
        values.push(updateData.status);
      }
      
      if (updateData.priority !== undefined) {
        updates.push(`priority = $${paramIndex++}`);
        values.push(updateData.priority);
      }
      
      if ('due_date' in updateData) {
        updates.push(`due_date = $${paramIndex++}`);
        values.push(updateData.due_date);
      }
      
      // Add updated_at timestamp
      updates.push(`updated_at = $${paramIndex++}`);
      values.push(new Date());
      
      // Add where conditions
      values.push(id);
      values.push(userId);
      
      // Execute query if there are fields to update
      if (updates.length === 0) {
        return null;
      }
      
      const query = `
        UPDATE tasks 
        SET ${updates.join(', ')} 
        WHERE id = $${paramIndex++} AND user_id = $${paramIndex++}
        RETURNING *
      `;
      
      const result = await pool.query(query, values);
      
      if (result.rows.length === 0) {
        return null;
      }
      
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Delete a task
   */
  static async delete(id: number, userId: number): Promise<boolean> {
    try {
      const result = await pool.query(
        'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING id',
        [id, userId]
      );
      
      return result.rowCount > 0;
    } catch (error) {
      throw error;
    }
  }
}