'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FaUser, FaChartBar, FaTasks, FaPlus, FaPencilAlt, FaTrashAlt, FaLock, FaCheckCircle, FaExclamationTriangle, FaHourglassHalf, FaExclamationCircle, FaTimes } from 'react-icons/fa';
import Spinner from '../components/reusable/spinner/spinner';
import Alert from '../components/reusable/alert/alert';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import { IoWarningOutline } from 'react-icons/io5';
import Image from 'next/image';

interface User {
  _id: string;
  username: string;
  email: string;
  isVerified: boolean;
  createdAt: string;
  profilePicture: string;
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
    dueDate: '',
    status: 'To Do' as 'To Do' | 'In Progress' | 'Done',
  });
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showAddTask, setShowAddTask] = useState(false);
  const [{ isError, message }, setIsError] = useState({
    isError: false,
    message: '',
  });
  const [showDeleteModal, setShowDeleteModal] = useState({ show: false, taskId: '' });

  useEffect(() => {
    fetchUserDetails();
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchUserDetails() {
    setIsError({ isError: false, message: '' });
    setLoader(true);
    try {
      const response = await axios.get('/api/users/details');
      setUser(response.data.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        router.push('/logout?reason=expired');
      } else if (error instanceof Error) {
        setIsError({ isError: true, message: error.message });
      } else {
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
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        router.push('/logout?reason=expired');
      } else if (error instanceof Error) {
        setIsError({ isError: true, message: error.message });
      } else {
        setIsError({ isError: true, message: 'Sorry Something went wrong' });
      }
    }
  }

  async function handleAddTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsError({ isError: false, message: '' });
    if (!newTask.title) return;

    setLoader(true);
    try {
      const response = await axios.post('/api/users/tasks', newTask);
      setTasks([response.data.task, ...tasks]);
      setNewTask({ title: '', description: '', priority: 'Medium', dueDate: '', status: 'To Do', });
      setShowAddTask(false);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        router.push('/logout?reason=expired');
      }
    } finally {
      setLoader(false);
    }
  }

  async function handleUpdateTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsError({ isError: false, message: '' });
    if (!editingTask || !newTask.title) return;

    setLoader(true);
    try {
      const response = await axios.put(`/api/users/tasks/${editingTask._id}`, {
        title: newTask.title || editingTask.title,
        description: newTask.description || editingTask.description,
        priority: newTask.priority || editingTask.priority,
        dueDate: newTask.dueDate || editingTask.dueDate,
        status: newTask.status || editingTask.status,
      });

      setTasks(tasks.map(task =>
        task._id === editingTask._id ? response.data.task : task
      ));
      setNewTask({ title: '', description: '', priority: 'Medium', dueDate: '', status: 'To Do', });
      setEditingTask(null);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        router.push('/logout?reason=expired');
      }
    } finally {
      setLoader(false);
    }
  }

  async function handleDeleteTask(taskId: string) {
    setIsError({ isError: false, message: '' });
    setLoader(true);
    try {
      setShowDeleteModal({ show: false, taskId: '' })
      await axios.delete(`/api/users/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        router.push('/logout?reason=expired');
      }
    } finally {
      setLoader(false);
      setShowDeleteModal({ show: false, taskId: '' })
    }
  }

  function handleEditTask(task: Task) {
    setEditingTask(task);
    setNewTask({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
      status: task.status,
    });
    setShowAddTask(false);
  }

  function handleCancelEdit() {
    setEditingTask(null);
    setNewTask({ title: '', description: '', priority: 'Medium', dueDate: '', status: 'To Do', });
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-600/30 text-red-200 border border-red-500/50';
      case 'Medium': return 'bg-yellow-600/30 text-yellow-200 border border-yellow-500/50';
      case 'Low': return 'bg-green-600/30 text-green-200 border border-green-500/50';
      default: return 'bg-gray-600/30 text-gray-200 border border-gray-500/50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done': return 'bg-green-600/30 text-green-200 border border-green-500/50';
      case 'In Progress': return 'bg-blue-600/30 text-blue-200 border border-blue-500/50';
      case 'To Do': return 'bg-gray-600/30 text-gray-200 border border-gray-500/50';
      default: return 'bg-gray-600/30 text-gray-200 border border-gray-500/50';
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

      <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
        <div className='bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-8 mb-8 border border-white border-opacity-20 transition-all duration-300 hover:scale-[1.005]'>
          <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-6'>
            <div className='flex items-center space-x-4 mb-4 sm:mb-0'>
              <div className='relative w-20 h-20'>
                <Image
                  src={user?.profilePicture || 'https://avatar.iran.liara.run/public/43'}
                  alt="User Avatar"
                  width={100}
                  height={100}
                  className='w-full h-full rounded-full object-cover border-4 border-purple-500/50 shadow-lg'
                />
              </div>
              <div>
                <h1 className='text-2xl sm:text-3xl font-bold text-white'>Dashboard</h1>
                <p className='text-gray-200 text-sm'>Welcome back, {user?.username}!</p>
              </div>
            </div>
            <div className='flex items-center space-x-3 sm:space-x-4'>
              <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${user?.isVerified
                ? 'bg-green-500/20 text-green-300 border border-green-400/50'
                : 'bg-red-500/20 text-red-300 border border-red-400/50'
                }`}>
                {user?.isVerified ? (
                  <>
                    <FaCheckCircle className='w-3 h-3' />
                    <span>Verified</span>
                  </>
                ) : (
                  <>
                    <FaExclamationTriangle className='w-3 h-3' />
                    <span>Not Verified</span>
                  </>
                )}
              </span>
              {/* {user?.isVerified ? ( */}
              <Link
                href='/change-password'
                className='px-3 py-1.5 bg-gradient-to-r from-blue-500/30 to-indigo-500/30 text-white border border-indigo-400/50 rounded-full text-sm font-medium hover:from-blue-600/40 hover:to-indigo-600/40 transition-all duration-300 flex items-center space-x-1 shadow-md hover:shadow-indigo-500/30'
              >
                <FaLock className='w-3 h-3' />
                <span>Change Password</span>
              </Link>
              {/* ) : (
                  <Link
                      href='/verify-account'
                      className='px-4 py-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white border border-yellow-400/50 rounded-full text-sm font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 flex items-center space-x-1 shadow-lg hover:shadow-orange-500/50'
                  >
                      <FaInfoCircle className='w-3 h-3' />
                      <span>Verify Account</span>
                  </Link>
              )} */}
            </div>
          </div>
          {user && (
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              <div className='bg-opacity-5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-cyan-600 border-opacity-10'>
                <h3 className='text-lg font-semibold text-white mb-4 flex items-center space-x-2'>
                  <FaUser className='w-5 h-5 text-indigo-400' />
                  <span>User Information</span>
                </h3>
                <div className='space-y-3'>
                  <div className='flex items-center space-x-3 min-w-0'>
                    <span className='text-gray-300 font-medium flex-shrink-0'>Username:</span>
                    <span className='text-white flex-1 min-w-0 truncate max-w-[320px]' title={user.username}>
                      {user.username}
                    </span>
                  </div>
                  <div className='flex items-center space-x-3 min-w-0'>
                    <span className='text-gray-300 font-medium flex-shrink-0'>Email:</span>
                    <span className='text-white flex-1 min-w-0 truncate max-w-[320px]' title={user.email}>
                      {user.email}
                    </span>
                  </div>
                  <div className='flex items-center space-x-3 min-w-0'>
                    <span className='text-gray-300 font-medium flex-shrink-0'>Member since:</span>
                    <span className='text-white flex-1 min-w-0 truncate max-w-[320px]'>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className='mt-6 pt-4 border-t border-white/10'>
                  <Link
                    href='/update-profile'
                    className='w-full inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl transition-all duration-300 hover:from-purple-700 hover:to-pink-700'
                  >
                    <FaPencilAlt className='w-4 h-4 mr-2' />
                    Update Profile
                  </Link>
                </div>
              </div>
              <div className='bg-opacity-5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-cyan-600 border-opacity-10'>
                <h3 className='text-lg font-semibold text-white mb-4 flex items-center space-x-2'>
                  <FaChartBar className='w-5 h-5 text-purple-400' />
                  <span>Quick Stats</span>
                </h3>
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
                  <div className='bg-gradient-to-tr from-cyan-400/20 to-indigo-400/20 p-4 rounded-2xl text-center border border-cyan-300/50 shadow-lg hover:shadow-cyan-400/40 transition duration-300 transform hover:scale-[1.03]'>
                    <FaTasks className='w-6 h-6 text-cyan-300 mx-auto mb-2' />
                    <p className='text-3xl font-extrabold text-white'>{tasks.length}</p>
                    <p className='text-sm text-cyan-200 mt-1'>Total Tasks</p>
                  </div>
                  <div className='bg-gradient-to-tr from-teal-400/20 to-green-400/20 p-4 rounded-2xl text-center border border-teal-300/50 shadow-lg hover:shadow-teal-400/40 transition duration-300 transform hover:scale-[1.03]'>
                    <FaCheckCircle className='w-6 h-6 text-teal-300 mx-auto mb-2' />
                    <p className='text-3xl font-extrabold text-white'>
                      {tasks?.filter(task => task.status === 'Done')?.length}
                    </p>
                    <p className='text-sm text-teal-200 mt-1'>Completed</p>
                  </div>
                  <div className='bg-gradient-to-tr from-orange-400/20 to-amber-400/20 p-4 rounded-2xl text-center border border-orange-300/50 shadow-lg hover:shadow-orange-400/40 transition duration-300 transform hover:scale-[1.03]'>
                    <FaHourglassHalf className='w-6 h-6 text-orange-300 mx-auto mb-2' />
                    <p className='text-3xl font-extrabold text-white'>
                      {tasks?.filter(task => task.status === 'In Progress')?.length}
                    </p>
                    <p className='text-sm text-orange-200 mt-1'>In Progress</p>
                  </div>
                  <div className='bg-gradient-to-tr from-fuchsia-400/20 to-red-400/20 p-4 rounded-2xl text-center border border-fuchsia-300/50 shadow-lg hover:shadow-fuchsia-400/40 transition duration-300 transform hover:scale-[1.03]'>
                    <FaExclamationCircle className='w-6 h-6 text-red-300 mx-auto mb-2' />
                    <p className='text-3xl font-extrabold text-white'>
                      {tasks?.filter(task => task.priority === 'High')?.length}
                    </p>
                    <p className='text-sm text-red-200 mt-1'>High Priority</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className='bg-indigo-950/20 backdrop-blur-md shadow-2xl rounded-3xl p-6 sm:p-10 border-indigo-950/10 transition-all duration-300 hover:scale-[1.01] shadow-indigo-900/20 ring-2 ring-cyan-600/25 hover:ring-indigo-600/20'>
          <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-6'>
            <div className='flex items-center space-x-3 mb-4 sm:mb-0'>
              <div className='w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center'>
                <FaTasks className='w-5 h-5 text-white' />
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
              {(editingTask || showAddTask) ? <FaTimes className='w-4 h-4' /> : <FaPlus className='w-4 h-4' />}
              <span className='sm:inline'>{editingTask ? 'Cancel Edit' : (showAddTask ? 'Close Form' : 'Add New Task')}</span>
            </button>
          </div>
          {(showAddTask || editingTask) && (
            <form onSubmit={editingTask ? handleUpdateTask : handleAddTask} className='bg-opacity-5 backdrop-blur-sm p-4 sm:p-6 rounded-2xl mb-6 border border-white border-opacity-10' noValidate>
              <h3 className='text-xl font-semibold text-indigo-300 mb-4'>{editingTask ? 'Edit Task' : 'Create New Task'}</h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                <div>
                  <label className='block text-sm font-medium text-white mb-2' htmlFor='title'>
                    Task Title <span className='text-red-400'>*</span>
                  </label>
                  <input
                    id='title'
                    name='title'
                    type='text'
                    value={newTask.title}
                    onChange={(e) => { setNewTask({ ...newTask, title: e.target.value }); setIsError({ isError: false, message: '' }) }}
                    className='w-full px-4 py-3 border border-white border-opacity-20 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-opacity-10 backdrop-blur-sm placeholder-gray-400 text-white'
                    placeholder='Enter task title'
                  />
                  {!newTask.title &&
                    <div className='flex items-center mt-1 '>
                      <HiOutlineExclamationCircle
                        className='w-4 h-4 text-red-500 me-2 mb-0'
                        aria-label="Error"
                      />
                      <span className='text-sm text-red-400'>Task title is required</span>
                    </div>
                  }
                </div>
                <div>
                  <label className='block text-sm font-medium text-white mb-2' htmlFor='priority'>
                    Priority <span className='text-red-400'>*</span>
                  </label>
                  <select
                    id='priority'
                    name='priority'
                    value={newTask.priority}
                    onChange={(e) => { setNewTask({ ...newTask, priority: e.target.value as 'Low' | 'Medium' | 'High' }); setIsError({ isError: false, message: '' }) }}
                    className='w-full px-4 py-3 border border-white border-opacity-20 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-opacity-10 backdrop-blur-sm text-white appearance-none pr-8'
                  >
                    <option className='bg-gray-800 text-white' value='Low'>Low</option>
                    <option className='bg-gray-800 text-white' value='Medium'>Medium</option>
                    <option className='bg-gray-800 text-white' value='High'>High</option>
                  </select>
                </div>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                <div>
                  <label className='block text-sm font-medium text-white mb-2' htmlFor='description'>
                    Description
                  </label>
                  <textarea
                    id='description'
                    name='description'
                    value={newTask.description}
                    onChange={(e) => { setNewTask({ ...newTask, description: e.target.value }); setIsError({ isError: false, message: '' }) }}
                    className='w-full px-4 py-3 border border-white border-opacity-20 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-opacity-10 backdrop-blur-sm placeholder-gray-400 text-white'
                    rows={3}
                    placeholder='Enter task description'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-white mb-2' htmlFor='dueDate'>
                    Due Date <span className='text-red-400'>*</span>
                  </label>
                  <input
                    id='dueDate'
                    name='dueDate'
                    type='date'
                    value={newTask.dueDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => { setNewTask({ ...newTask, dueDate: e.target.value }); setIsError({ isError: false, message: '' }) }}
                    className='w-full px-4 py-3 border border-white border-opacity-20 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-opacity-10 backdrop-blur-sm text-white appearance-none date-icon-white'
                  />
                </div>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
                <div>
                  <label className='block text-sm font-medium text-white mb-2' htmlFor='priority'>
                    Status <span className='text-red-400'>*</span>
                  </label>
                  <select
                    id='priority'
                    name='priority'
                    value={newTask.status}
                    onChange={(e) => { setNewTask({ ...newTask, status: e.target.value as 'To Do' | 'In Progress' | 'Done' }); setIsError({ isError: false, message: '' }) }}
                    className='w-full px-4 py-3 border border-white border-opacity-20 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-opacity-10 backdrop-blur-sm text-white appearance-none pr-8'
                  >
                    <option className='bg-gray-800 text-white' value='To Do'>To Do</option>
                    <option className='bg-gray-800 text-white' value='In Progress'>In Progress</option>
                    <option className='bg-gray-800 text-white' value='Done'>Done</option>
                  </select>
                </div>
              </div>
              <div className='flex flex-col sm:flex-row sm:justify-end space-x-3 my-3 sm:my-0'>
                <button
                  type='button'
                  onClick={editingTask ? handleCancelEdit : () => setShowAddTask(false)}
                  className='px-6 py-2 bg-gray-600/20 text-gray-300 border border-gray-400/30 rounded-lg hover:bg-gray-600/40 transition duration-200 mb-3 sm:mb-0 mr-0 sm:mr-3'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold px-6 py-2 rounded-lg transition duration-200 shadow-md'
                >
                  {editingTask ? 'Update Task' : 'Add Task'}
                </button>
              </div>
            </form>
          )}
          <div className='space-y-4'>
            {tasks.length === 0 ? (
              <div className='text-center py-8 text-gray-400 bg-opacity-5 backdrop-blur-sm rounded-2xl border border-white border-opacity-10'>
                <p className='text-lg'>No tasks yet. Create your first task! 🚀</p>
              </div>
            ) : (
              tasks.map((task) => (
                <div
                  key={task._id}
                  className='bg-white/15 backdrop-blur-sm rounded-xl pl-5 pr-2 py-5 sm:p-5 border border-white/20 transition-all duration-300 hover:border-indigo-400/50 hover:shadow-xl'
                >
                  {task.priority === 'High' && (
                    <div className='absolute top-0 left-0 bottom-0 w-1 bg-red-500 rounded-l-xl'></div>
                  )}
                  {task.priority === 'Medium' && (
                    <div className='absolute top-0 left-0 bottom-0 w-1 bg-yellow-500 rounded-l-xl'></div>
                  )}
                  {task.priority === 'Low' && (
                    <div className='absolute top-0 left-0 bottom-0 w-1 bg-green-500 rounded-l-xl'></div>
                  )}
                  <div className='flex items-start justify-between'>
                    <div className='flex-1 pr-4'>
                      <h3 className='text-xl font-bold text-white mb-1.5'>{task.title}</h3>
                      {task.description && (
                        <p className='text-indigo-200 text-sm mb-4 line-clamp-2'>{task.description}</p>
                      )}
                      <div className='flex flex-wrap items-center gap-3 mt-2'>
                        <span className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                        <span className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider ${getPriorityColor(task.priority)}`}>
                          {task.priority} Priority
                        </span>
                        {task.dueDate && (
                          <span className='text-sm text-indigo-300 flex items-center space-x-1'>
                            <FaHourglassHalf className='w-3 h-3 text-indigo-400' />
                            <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                          </span>
                        )}
                      </div>
                    </div>
                    <div className='flex flex-col items-end space-y-3 pt-1'>
                      <div className='text-xs text-gray-400'>
                        Created: {new Date(task.createdAt).toLocaleDateString()}
                      </div>
                      <div className='flex space-x-2'>
                        <button
                          onClick={() => handleEditTask(task)}
                          className='p-2 rounded-full text-blue-300 hover:bg-blue-500/20 transition-colors flex items-center justify-center group'
                          title='Edit Task'
                        >
                          <FaPencilAlt className='w-4 h-4 group-hover:scale-110 transition-transform' />
                        </button>
                        <button
                          onClick={() => setShowDeleteModal({ show: true, taskId: task._id })}
                          className='p-2 rounded-full text-red-300 hover:bg-red-500/20 transition-colors flex items-center justify-center group'
                          title='Delete Task'
                        >
                          <FaTrashAlt className='w-4 h-4 group-hover:scale-110 transition-transform' />
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
      {showDeleteModal.show && (
        <div
          className='fixed inset-0 bg-black/70 z-50 flex items-center justify-center backdrop-blur-sm sm:px-6'
          onClick={() => setShowDeleteModal({ show: false, taskId: '' })}
        >
          <div
            className='bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full transform transition-all duration-300 ease-out scale-100'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='text-center'>
              <IoWarningOutline className="mx-auto h-12 w-12 text-red-600" />
              <h3 className='text-md font-bold text-gray-900 mt-3 mb-6'>
                Are you sure you want to delete this task?
              </h3>
            </div>
            <div className='flex justify-center space-x-3'>
              <button
                onClick={() => handleDeleteTask(showDeleteModal.taskId)}
                className='px-4 py-2 text-sm font-semibold rounded-lg text-white bg-red-600 hover:bg-red-700 transition duration-150 shadow-md'
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteModal({ show: false, taskId: '' })}
                className='px-4 py-2 text-sm font-semibold rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition duration-150 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}