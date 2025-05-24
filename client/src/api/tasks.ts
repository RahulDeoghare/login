import React from 'react';
import { CreateTaskData, Task, UpdateTaskData } from '../types/task';
import apiClient from './client';

export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await apiClient.get<Task[]>('/tasks');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch tasks');
  }
};

export const getTask = async (id: number): Promise<Task> => {
  try {
    const response = await apiClient.get<Task>(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch task');
  }
};

export const createTask = async (data: CreateTaskData): Promise<Task> => {
  try {
    const response = await apiClient.post<Task>('/tasks', data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create task');
  }
};

export const updateTask = async (id: number, data: UpdateTaskData): Promise<Task> => {
  try {
    const response = await apiClient.put<Task>(`/tasks/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update task');
  }
};

export const deleteTask = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`/tasks/${id}`);
  } catch (error) {
    throw new Error('Failed to delete task');
  }
};