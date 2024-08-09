import React, { useState } from 'react';
import Modal from 'react-modal';

const DeleteArticleModal = ({ isOpen, onRequestClose, article, onSave }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:5001/api/articles/${article.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      onSave();
      onRequestClose();
    } catch (error) {
      console.error('Error deleting article:', error);
      setError('Failed to delete article. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="w-full max-w-md p-8 mx-auto bg-white rounded shadow-md">
      <h2 className="text-xl text-center font-bold mb-4">Delete Article</h2>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <p className='text-center'>Apakah anda yakin menghapus article ini?</p>
      <div className="flex justify-center gap-4 mt-4">
      <button
          type="button"
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded w-1/4"
          disabled={loading}
        >
          {loading ? 'Deleting...' : 'Delete'}
        </button>
        <button
          type="button"
          onClick={onRequestClose}
          className="bg-gray-400 hover:bg-gray-500 text-white p-2 rounded w-1/4"
        >
          Cancel
        </button>
       
      </div>
    </Modal>
  );
};

export default DeleteArticleModal;
