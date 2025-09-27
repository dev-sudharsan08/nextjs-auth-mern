'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Spinner from '../components/reusable/spinner/spinner';
import Alert from '../components/reusable/alert/alert';

interface User {
  _id: string;
  username: string;
  email: string;
  isVerified: boolean;
  createdAt: string;
}

interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Done';
  priority: 'Low' | 'Medium' | 'High';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'Medium' as 'Low' | 'Medium' | 'High',
    dueDate: ''
  });
  const [showAddTask, setShowAddTask] = useState(false);
  const [{ isError, message }, setIsError] = useState({
    isError: false,
    message: '',
  });

  useEffect(() => {
    fetchUserDetails();
    fetchTasks();
  }, []);

  async function fetchUserDetails() {
    setIsError({ isError: false, message: '' });
    setLoader(true);
    try {
      const response = await axios.get('/api/users/details');
      console.log(response);
      setUser(response.data.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.error || 'Sorry Something went wrong';
        console.log(errorMessage);
        setIsError({ isError: true, message: errorMessage });
      } else if (error instanceof Error) {
        console.log(error);
        setIsError({ isError: true, message: error.message });
      } else {
        console.log('Unknown error', error);
        setIsError({ isError: true, message: 'Sorry Something went wrong' });
      }
    } finally {
      setLoader(false);
    }
  }

  async function fetchTasks() {
    try {
      const response = await axios.get('/api/users/tasks');
      setTasks(response.data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }

  async function handleAddTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoader(true);
    try {
      const response = await axios.post('/api/users/tasks', newTask);
      setTasks([response.data.task, ...tasks]);
      setNewTask({ title: '', description: '', priority: 'Medium', dueDate: '' });
      setShowAddTask(false);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.error || 'Sorry Something went wrong';
        setIsError({ isError: true, message: errorMessage });
      }
    } finally {
      setLoader(false);
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'To Do': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Spinner loading={loader} />
      {isError && (
        <div className='flex justify-center'>
          <Alert
            message={message}
            type='error'
            style={{ minWidth: '350px' }}
            className='mb-7 text-center'
          />
        </div>
      )}

      <div className='max-w-6xl mx-auto px-4 py-8'>
        {/* User Profile Section */}
        <div className='bg-white rounded-xl shadow-lg p-6 mb-8'>
          <div className='flex items-center justify-between mb-4'>
            <h1 className='text-3xl font-bold text-slate-800'>Dashboard</h1>
            <div className='flex items-center space-x-4'>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${user?.isVerified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                {user?.isVerified ? 'Verified' : 'Not Verified'}
              </span>
            </div>
          </div>

          {user && (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <h3 className='text-lg font-semibold text-slate-700 mb-2'>User Information</h3>
                <div className='space-y-2'>
                  <p><span className='font-medium'>Username:</span> {user.username}</p>
                  <p><span className='font-medium'>Email:</span> {user.email}</p>
                  <p><span className='font-medium'>Member since:</span> {new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div>
                <h3 className='text-lg font-semibold text-slate-700 mb-2'>Quick Stats</h3>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='bg-blue-50 p-3 rounded-lg text-center'>
                    <p className='text-2xl font-bold text-blue-600'>{tasks.length}</p>
                    <p className='text-sm text-blue-800'>Total Tasks</p>
                  </div>
                  <div className='bg-green-50 p-3 rounded-lg text-center'>
                    <p className='text-2xl font-bold text-green-600'>
                      {tasks.filter(task => task.status === 'Done').length}
                    </p>
                    <p className='text-sm text-green-800'>Completed</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tasks Section */}
        <div className='bg-white rounded-xl shadow-lg p-6'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-2xl font-bold text-slate-800'>My Tasks</h2>
            <button
              onClick={() => setShowAddTask(!showAddTask)}
              className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200'
            >
              {showAddTask ? 'Cancel' : 'Add New Task'}
            </button>
          </div>

          {/* Add Task Form */}
          {showAddTask && (
            <form onSubmit={handleAddTask} className='bg-gray-50 p-4 rounded-lg mb-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Task Title *
                  </label>
                  <input
                    type='text'
                    required
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    placeholder='Enter task title'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Priority
                  </label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as 'Low' | 'Medium' | 'High' })}
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  >
                    <option value='Low'>Low</option>
                    <option value='Medium'>Medium</option>
                    <option value='High'>High</option>
                  </select>
                </div>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Description
                  </label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    rows={3}
                    placeholder='Enter task description'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Due Date
                  </label>
                  <input
                    type='date'
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
              </div>
              <div className='flex justify-end space-x-3'>
                <button
                  type='button'
                  onClick={() => setShowAddTask(false)}
                  className='px-4 py-2 text-gray-600 hover:text-gray-800 transition duration-200'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition duration-200'
                >
                  Add Task
                </button>
              </div>
            </form>
          )}

          {/* Tasks List */}
          <div className='space-y-4'>
            {tasks.length === 0 ? (
              <div className='text-center py-8 text-gray-500'>
                <p className='text-lg'>No tasks yet. Create your first task!</p>
              </div>
            ) : (
              tasks.map((task) => (
                <div key={task._id} className='border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-200'>
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <h3 className='text-lg font-semibold text-slate-800 mb-2'>{task.title}</h3>
                      {task.description && (
                        <p className='text-gray-600 mb-3'>{task.description}</p>
                      )}
                      <div className='flex items-center space-x-4'>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority} Priority
                        </span>
                        {task.dueDate && (
                          <span className='text-sm text-gray-500'>
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className='text-sm text-gray-500'>
                      {new Date(task.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
