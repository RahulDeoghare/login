import React from 'react';
import { Flag } from 'lucide-react';
import { TaskPriority } from '../../types/task';

interface TaskPriorityBadgeProps {
  priority: TaskPriority;
}

const TaskPriorityBadge = ({ priority }: TaskPriorityBadgeProps) => {
  let badgeClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  
  switch (priority) {
    case 'low':
      badgeClasses += ' bg-gray-100 text-gray-800';
      return (
        <span className={badgeClasses}>
          <Flag className="w-3 h-3 mr-1" />
          Low
        </span>
      );
    case 'medium':
      badgeClasses += ' bg-orange-100 text-orange-800';
      return (
        <span className={badgeClasses}>
          <Flag className="w-3 h-3 mr-1" />
          Medium
        </span>
      );
    case 'high':
      badgeClasses += ' bg-red-100 text-red-800';
      return (
        <span className={badgeClasses}>
          <Flag className="w-3 h-3 mr-1" />
          High
        </span>
      );
    default:
      return null;
  }
};

export default TaskPriorityBadge;