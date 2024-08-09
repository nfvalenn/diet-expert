// src/components/ArticleList.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import AddArticleModal from './AddArticleModal';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await api.get('/articles');
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const handleAddClick = () => {
    setSelectedArticle(null);
    setIsAddModalOpen(true);
  };

  const handleEditClick = (article) => {
    setSelectedArticle(article);
    setIsAddModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await api.delete(`/articles/${id}`);
      fetchArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  const handleSave = () => {
    fetchArticles();
    setIsAddModalOpen(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Articles</h1>
      <button
        onClick={handleAddClick}
        className="bg-blue-500 text-white p-2 rounded mb-4"
      >
        Add Article
      </button>
      <div className="space-y-4">
        {articles.map(article => (
          <div key={article.id} className="p-4 border border-gray-300 rounded">
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p>{article.content.substring(0, 100)}...</p>
            {article.imageUrl && (
              <img
                src={`http://localhost:5001${article.imageUrl}`} // Ganti dengan path backend Anda
                alt={article.title}
                className="w-32 h-32 object-cover mt-2"
              />
            )}
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleEditClick(article)}
                className="bg-yellow-500 text-white p-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteClick(article.id)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <AddArticleModal
        isOpen={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
        onSave={handleSave}
        article={selectedArticle}
      />
    </div>
  );
};

export default ArticleList;
