import React from 'react';

interface ConfirmDeleteModalProps {
  show: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ show, handleClose, handleConfirm }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-md w-1/3">
        <h2 className="text-xl font-bold mb-4">Confirmar Eliminación</h2>
        <p className="mb-4">¿Estás seguro de que deseas eliminar esta tarea?</p>
        <div className="flex justify-end space-x-2">
          <button onClick={handleClose} className="bg-gray-500 text-white px-4 py-2 rounded">Cancelar</button>
          <button onClick={handleConfirm} className="bg-red-500 text-white px-4 py-2 rounded">Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
