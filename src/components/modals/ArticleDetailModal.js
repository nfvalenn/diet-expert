import React from 'react';
import Modal from 'react-modal';

const ArticleDetailModal = ({ isOpen, onRequestClose, article }) => {
  if (!article) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Article Details"
      className="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto my-10"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <h2 className="text-2xl font-bold mb-4">{article.title}</h2>
      {article.imageUrl && (
        <img
          src={`http://localhost:5001${article.imageUrl}`}
          alt={article.title}
          className="w-full h-64 object-cover mb-4 rounded"
        />
      )}
      <p>{article.content}</p>
      <button
        onClick={onRequestClose}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Close
      </button>
    </Modal>
  );
};

export default ArticleDetailModal;
