import React from 'react';

interface ValidationErrorModalProps {
  show: boolean;
  handleClose: () => void;
}

const ValidationErrorModal: React.FC<ValidationErrorModalProps> = ({ show, handleClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={handleClose}></div>
      <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md mx-auto z-50">
        <div className="p-4">
          <h2 className="text-xl font-semibold">Error</h2>
          <p className="mt-2">Por favor, complete todos los campos antes de enviar el formulario.</p>
        </div>
        <div className="p-4 flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ValidationErrorModal;
