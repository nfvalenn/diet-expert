import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const UpdateArticleModal = ({ isOpen, onRequestClose, article, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setContent(article.content);
      setPreview(article.imageUrl ? `http://localhost:5001${article.imageUrl}` : null);
    }
  }, [article]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setError('Title and content are required.');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch(`http://localhost:5001/api/articles/${article.id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      onSave(data); // Call onSave with the updated article data
      onRequestClose();
    } catch (error) {
      console.error('Error updating article:', error);
      setError('Failed to update article. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="w-full max-w-2xl p-8 mx-auto bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Update Article</h2>
      {error && <div className="mb-4 text-red-500">{error}</div>}
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
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image</label>
          <input type="file" onChange={handleImageChange} />
          {preview && (
            <div className="mt-4">
              <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded" />
            </div>
          )}
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-1/4"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
          <button
            type="button"
            onClick={onRequestClose}
            className="bg-gray-400 hover:bg-gray-500 text-white p-2 rounded w-1/4"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateArticleModal;
