import React, { useState, useEffect, FormEvent } from 'react';
import { Task } from '../api/api';
import ValidationErrorModal from '../components/ValidationErrorModal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import {
  handleFetchTasks,
  handleAddTask,
  handleEditTask,
  handleUpdateTask,
  handleDeleteTask,
  handleToggleCompletion,
  handleSubmit
} from '../handlers/handlers';

const ToDo: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentTaskId, setCurrentTaskId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  useEffect(() => {
    handleFetchTasks(setTasks);
  }, []);

  const handleConfirmDelete = (taskId: number) => {
    setTaskToDelete(taskId);
    setShowConfirmDelete(true);
  };

  const confirmDeleteTask = async () => {
    if (taskToDelete !== null) {
      await handleDeleteTask(taskToDelete, setTasks);
      setTaskToDelete(null);
      setShowConfirmDelete(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-4">Lista de Tareas</h1>
        <form onSubmit={(e) => handleSubmit(e, isEditing, () => handleUpdateTask(currentTaskId, title, description, score, setTasks, setTitle, setDescription, setScore, setIsEditing, setCurrentTaskId, setShowModal), () => handleAddTask(title, description, score, setTasks, setTitle, setDescription, setScore, setShowModal))} className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded w-full mb-2"
            placeholder="Título"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded w-full mb-2"
            placeholder="Descripción"
          ></textarea>
          <input
            type="number"
            value={score}
            onChange={(e) => setScore(Number(e.target.value))}
            className="border p-2 rounded w-full mb-2"
            placeholder="Puntuación"
          />
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            {isEditing ? 'Actualizar Tarea' : 'Agregar Tarea'}
          </button>
        </form>
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`p-4 border rounded flex justify-between items-center ${
                task.completed ? 'bg-green-100' : 'bg-red-100'
              }`}
            >
              <div className="flex-1 mr-4" onClick={() => handleEditTask(task.id, task.title, task.description, task.score, task.completed, setTitle, setDescription, setScore, setIsEditing, setCurrentTaskId)}>
                <h3 className="font-semibold">{task.title}</h3>
                <p className="text-sm">{task.description}</p>
                <p className="text-sm">Puntuación: {task.score}</p>
                <p className={`text-sm ${task.completed ? 'text-green-600' : 'text-red-600'}`}>
                  {task.completed ? 'Completada' : 'Incompleta'}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditTask(task.id, task.title, task.description, task.score, task.completed, setTitle, setDescription, setScore, setIsEditing, setCurrentTaskId)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleToggleCompletion(task, setTasks)}
                  className={`px-2 py-1 rounded ${task.completed ? 'bg-green-500' : 'bg-gray-500'} text-white`}
                >
                  {task.completed ? 'Marcar como Incompleta' : 'Marcar como Completada'}
                </button>
                <button
                  onClick={() => handleConfirmDelete(task.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ValidationErrorModal show={showModal} handleClose={() => setShowModal(false)} />
      <ConfirmDeleteModal
        show={showConfirmDelete}
        handleClose={() => setShowConfirmDelete(false)}
        handleConfirm={confirmDeleteTask}
      />
    </div>
  );
};

export default ToDo;
