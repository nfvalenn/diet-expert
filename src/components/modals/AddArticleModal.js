// src/components/modals/AddArticleModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';

const AddArticleModal = ({ isOpen, onRequestClose, onAddArticle }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newArticle = { title, content, image, author };
    onAddArticle(newArticle);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      className="modal"
      overlayClassName="overlay"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Add Article</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="flex justify-end">
          <button type="button" onClick={onRequestClose} className="bg-gray-500 text-white p-2 rounded mr-2">Cancel</button>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Save</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddArticleModal;
