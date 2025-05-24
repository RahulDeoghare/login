import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Edit2, Loader2, Trash2 } from 'lucide-react';
import { deleteTask, getTask } from '../../api/tasks';
import { Task } from '../../types/task';
import TaskStatusBadge from '../../components/Tasks/TaskStatusBadge';
import TaskPriorityBadge from '../../components/Tasks/TaskPriorityBadge';
import { toast } from 'react-toastify';

const TaskDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!id) return;
    
    const fetchTask = async () => {
      try {
        setIsLoading(true);
        const data = await getTask(parseInt(id));
        setTask(data);
      } catch (error) {
        toast.error('Failed to fetch task details');
        navigate('/tasks');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTask();
  }, [id, navigate]);
  
  const handleDelete = async () => {
    if (!task || !confirm('Are you sure you want to delete this task?')) {
      return;
    }
    
    try {
      await deleteTask(task.id);
      toast.success('Task deleted successfully');
      navigate('/tasks');
    } catch (error) {
      toast.error('Failed to delete task');
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
        <Link to="/tasks" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to tasks
        </Link>
      </div>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{task.title}</h1>
            <div className="mt-2 flex space-x-2">
              <TaskStatusBadge status={task.status} />
              <TaskPriorityBadge priority={task.priority} />
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Link
              to={`/tasks/${task.id}/edit`}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Edit2 className="h-4 w-4 mr-1" />
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </button>
          </div>
        </div>
        
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Created at</dt>
              <dd className="mt-1 text-sm text-gray-900 flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                {new Date(task.created_at).toLocaleString()}
              </dd>
            </div>
            
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Due date</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {task.due_date ? (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-gray-400" />
                    {new Date(task.due_date).toLocaleDateString()}
                  </div>
                ) : (
                  <span className="text-gray-400">Not set</span>
                )}
              </dd>
            </div>
            
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900 whitespace-pre-line rounded-md bg-gray-50 p-4 border border-gray-100">
                {task.description || <span className="text-gray-400">No description provided</span>}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;