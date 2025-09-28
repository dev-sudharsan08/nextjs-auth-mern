'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
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
  const [editingTask, setEditingTask] = useState<Task | null>(null);
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

  async function handleUpdateTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingTask) return;

    setLoader(true);
    try {
      const response = await axios.put(`/api/users/tasks/${editingTask._id}`, {
        title: newTask.title,
        description: newTask.description,
        priority: newTask.priority,
        dueDate: newTask.dueDate,
        status: editingTask.status
      });

      setTasks(tasks.map(task =>
        task._id === editingTask._id ? response.data.task : task
      ));
      setNewTask({ title: '', description: '', priority: 'Medium', dueDate: '' });
      setEditingTask(null);
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

  async function handleDeleteTask(taskId: string) {
    if (!confirm('Are you sure you want to delete this task?')) return;

    setLoader(true);
    try {
      await axios.delete(`/api/users/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
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

  function handleEditTask(task: Task) {
    setEditingTask(task);
    setNewTask({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
    });
    setShowAddTask(false);
  }

  function handleCancelEdit() {
    setEditingTask(null);
    setNewTask({ title: '', description: '', priority: 'Medium', dueDate: '' });
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

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8'>
        {/* User Profile Section */}
        <div className='bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-8 mb-8 border border-white border-opacity-20'>
          <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-6'>
            <div className='flex items-center space-x-4 mb-4 sm:mb-0'>
              <div className='w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center'>
                <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                </svg>
              </div>
              <div>
                <h1 className='text-2xl sm:text-3xl font-bold text-white'>Dashboard</h1>
                <p className='text-slate-300 text-sm'>Welcome back, {user?.username}!</p>
              </div>
            </div>
            <div className='flex items-center space-x-4'>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${user?.isVerified ? 'bg-green-500 bg-opacity-20 text-green-300 border border-green-400' : 'bg-red-500 bg-opacity-20 text-red-300 border border-red-400'
                }`}>
                {user?.isVerified ? '✓ Verified' : '⚠ Not Verified'}
              </span>
              <Link
                href='/change-password'
                className='px-3 py-1 bg-blue-500 bg-opacity-20 text-blue-300 border border-blue-400 rounded-full text-sm font-medium hover:bg-opacity-30 transition-colors'
              >
                Change Password
              </Link>
            </div>
          </div>

          {user && (
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              <div className='bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-10'>
                <h3 className='text-lg font-semibold text-white mb-4 flex items-center space-x-2'>
                  <svg className='w-5 h-5 text-indigo-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                  </svg>
                  <span>User Information</span>
                </h3>
                <div className='space-y-3'>
                  <div className='flex items-center space-x-3'>
                    <span className='text-slate-300 font-medium'>Username:</span>
                    <span className='text-white'>{user.username}</span>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <span className='text-slate-300 font-medium'>Email:</span>
                    <span className='text-white'>{user.email}</span>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <span className='text-slate-300 font-medium'>Member since:</span>
                    <span className='text-white'>{new Date(user.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className='bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-10'>
                <h3 className='text-lg font-semibold text-white mb-4 flex items-center space-x-2'>
                  <svg className='w-5 h-5 text-purple-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' />
                  </svg>
                  <span>Quick Stats</span>
                </h3>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='bg-gradient-to-r from-blue-500 to-cyan-500 bg-opacity-20 p-4 rounded-xl text-center border border-blue-400 border-opacity-30'>
                    <p className='text-2xl font-bold text-blue-300'>{tasks.length}</p>
                    <p className='text-sm text-blue-200'>Total Tasks</p>
                  </div>
                  <div className='bg-gradient-to-r from-green-500 to-emerald-500 bg-opacity-20 p-4 rounded-xl text-center border border-green-400 border-opacity-30'>
                    <p className='text-2xl font-bold text-green-300'>
                      {tasks.filter(task => task.status === 'Done').length}
                    </p>
                    <p className='text-sm text-green-200'>Completed</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tasks Section */}
        <div className='bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-8 border border-white border-opacity-20'>
          <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-6'>
            <div className='flex items-center space-x-3 mb-4 sm:mb-0'>
              <div className='w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center'>
                <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' />
                </svg>
              </div>
              <h2 className='text-2xl font-bold text-white'>My Tasks</h2>
            </div>
            <button
              onClick={() => {
                if (editingTask) {
                  handleCancelEdit();
                } else {
                  setShowAddTask(!showAddTask);
                }
              }}
              className='bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2'
            >
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
              </svg>
              <span className='hidden sm:inline'>{editingTask ? 'Cancel Edit' : (showAddTask ? 'Cancel' : 'Add New Task')}</span>
              <span className='sm:hidden'>{editingTask ? 'Cancel' : (showAddTask ? 'Cancel' : 'Add')}</span>
            </button>
          </div>

          {/* Add/Edit Task Form */}
          {(showAddTask || editingTask) && (
            <form onSubmit={editingTask ? handleUpdateTask : handleAddTask} className='bg-white bg-opacity-5 backdrop-blur-sm p-6 rounded-2xl mb-6 border border-white border-opacity-10'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                <div>
                  <label className='block text-sm font-medium text-white mb-2'>
                    Task Title *
                  </label>
                  <input
                    type='text'
                    required
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className='w-full px-4 py-3 border border-white border-opacity-20 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white bg-opacity-10 backdrop-blur-sm placeholder-slate-300 text-white'
                    placeholder='Enter task title'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-white mb-2'>
                    Priority
                  </label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as 'Low' | 'Medium' | 'High' })}
                    className='w-full px-4 py-3 border border-white border-opacity-20 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white bg-opacity-10 backdrop-blur-sm text-white'
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
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className='w-full px-4 py-3 border border-white border-opacity-20 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white bg-opacity-10 backdrop-blur-sm text-white'
                  />
                </div>
              </div>
              <div className='flex justify-end space-x-3'>
                <button
                  type='button'
                  onClick={editingTask ? handleCancelEdit : () => setShowAddTask(false)}
                  className='px-4 py-2 text-gray-600 hover:text-gray-800 transition duration-200'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition duration-200'
                >
                  {editingTask ? 'Update Task' : 'Add Task'}
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
                    <div className='flex items-center space-x-2'>
                      <div className='text-sm text-gray-500'>
                        {new Date(task.createdAt).toLocaleDateString()}
                      </div>
                      <div className='flex space-x-2'>
                        <button
                          onClick={() => handleEditTask(task)}
                          className='text-blue-600 hover:text-blue-800 text-sm font-medium'
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task._id)}
                          className='text-red-600 hover:text-red-800 text-sm font-medium'
                        >
                          Delete
                        </button>
                      </div>
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
