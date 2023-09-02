import React from 'react';

function DeleteModal({ isOpen, onClose, onDelete, deleteBookId, setIsOpen }) {

    function handleDelete() {
        onDelete(deleteBookId);
        setIsOpen(false);
    }

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-4 rounded-lg shadow-md z-10">
        <p className="mb-4">Are you sure you want to delete this item?</p>
        <div className="flex justify-end">
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-2"
            onClick={() => handleDelete(deleteBookId)}
          >
            Delete
          </button>
          <button
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
