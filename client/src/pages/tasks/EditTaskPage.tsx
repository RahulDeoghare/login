import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Task, UpdateTaskData } from '../../types/task';
import { getTask, updateTask } from '../../api/tasks';
import { toast } from 'react-toastify';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  description: z.string().optional(),
  status: z.enum(['todo', 'in_progress', 'completed'] as const),
  priority: z.enum(['low', 'medium', 'high'] as const),
  due_date: z.string().optional().nullable(),
});

type TaskFormData = z.infer<typeof taskSchema>;

const EditTaskPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });
  
  useEffect(() => {
    if (!id) return;
    
    const fetchTask = async () => {
      try {
        setIsLoading(true);
        const data = await getTask(parseInt(id));
        setTask(data);
        
        // Format the date for the form
        let dueDate = null;
        if (data.due_date) {
          const date = new Date(data.due_date);
          dueDate = date.toISOString().split('T')[0];
        }
        
        // Reset form with task data
        reset({
          title: data.title,
          description: data.description,
          status: data.status,
          priority: data.priority,
          due_date: dueDate,
        });
      } catch (error) {
        toast.error('Failed to fetch task details');
        navigate('/tasks');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTask();
  }, [id, navigate, reset]);
  
  const onSubmit = async (data: TaskFormData) => {
    if (!task || !id) return;
    
    try {
      setIsSubmitting(true);
      
      const taskData: UpdateTaskData = {
        ...data,
        description: data.description || '',
      };
      
      await updateTask(parseInt(id), taskData);
      toast.success('Task updated successfully');
      navigate(`/tasks/${id}`);
    } catch (error) {
      toast.error('Failed to update task');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }
  
  if (!task) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Task not found.</p>
        <Link
          to="/tasks"
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Back to tasks
        </Link>
      </div>
    );
  }
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <Link to={`/tasks/${id}`} className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to task
        </Link>
      </div>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h1 className="text-2xl font-bold text-gray-900">Edit task</h1>
          <p className="mt-1 text-sm text-gray-500">Update the details of your task</p>
        </div>
        
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="title" className="form-label">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                className={`form-input ${errors.title ? 'border-red-300' : ''}`}
                placeholder="Task title"
                {...register('title')}
              />
              {errors.title && (
                <p className="form-error">{errors.title.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                className={`form-input ${errors.description ? 'border-red-300' : ''}`}
                placeholder="Describe the task..."
                {...register('description')}
              ></textarea>
              {errors.description && (
                <p className="form-error">{errors.description.message}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="status" className="form-label">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  id="status"
                  className={`form-input ${errors.status ? 'border-red-300' : ''}`}
                  {...register('status')}
                >
                  <option value="todo">Todo</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                {errors.status && (
                  <p className="form-error">{errors.status.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="priority" className="form-label">
                  Priority <span className="text-red-500">*</span>
                </label>
                <select
                  id="priority"
                  className={`form-input ${errors.priority ? 'border-red-300' : ''}`}
                  {...register('priority')}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                {errors.priority && (
                  <p className="form-error">{errors.priority.message}</p>
                )}
              </div>
            </div>
            
            <div>
              <label htmlFor="due_date" className="form-label">
                Due date
              </label>
              <input
                type="date"
                id="due_date"
                className={`form-input ${errors.due_date ? 'border-red-300' : ''}`}
                {...register('due_date')}
              />
              {errors.due_date && (
                <p className="form-error">{errors.due_date.message}</p>
              )}
            </div>
            
            <div className="flex justify-end space-x-3">
              <Link
                to={`/tasks/${id}`}
                className="btn btn-secondary"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="btn btn-primary inline-flex items-center"
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTaskPage;