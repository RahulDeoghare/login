import React from 'react';
import { TaskStatus } from '../../types/task';

interface TaskStatusBadgeProps {
  status: TaskStatus;
}

const TaskStatusBadge = ({ status }: TaskStatusBadgeProps) => {
  let badgeClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  
  switch (status) {
    case 'todo':
      badgeClasses += ' bg-blue-100 text-blue-800';
      return <span className={badgeClasses}>Todo</span>;
    case 'in_progress':
      badgeClasses += ' bg-yellow-100 text-yellow-800';
      return <span className={badgeClasses}>In Progress</span>;
    case 'completed':
      badgeClasses += ' bg-green-100 text-green-800';
      return <span className={badgeClasses}>Completed</span>;
    default:
      return null;
  }
};

export default TaskStatusBadge;