import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import AddArticleModal from '../components/modals/AddArticleModal';
import UpdateArticleModal from '../components/modals/EditArticleModal';
import DeleteArticleModal from '../components/modals/DeleteArticleModal';
import AdminLayout from '../components/modals/AdminLayout'; // Corrected path

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await api.get('/articles');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleUpdateClick = (article) => {
    setCurrentArticle(article);
    setIsUpdateModalOpen(true);
  };

  const handleDeleteClick = (article) => {
    setCurrentArticle(article);
    setIsDeleteModalOpen(true);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await api.get('/articles');
      setArticles(response.data);
    } catch (error) {
      console.error('Error refreshing articles:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-100 min-h-screen relative">
        <h1 className="text-3xl font-bold text-center mb-6">Articles</h1>
        <div className="absolute top-16 right-6">
          <button
            onClick={handleAddClick}
            className="bg-[#7887BE] hover:bg-[#6f77a8] text-white px-6 py-3 rounded-lg shadow-md transition duration-300"
          >
            Add Article
          </button>
        </div>
        {loading ? (
          <div className="text-center text-lg text-gray-700">Loading...</div>
        ) : (
          <div className="overflow-y-auto max-h-[calc(100vh-150px)] mt-16">
            <div className="space-y-6">
              {articles.map(article => (
                <div
                  key={article.id}
                  className="relative flex bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:shadow-xl hover:scale-105"
                >
                  <div className="w-48 h-32 border border-gray-300 overflow-hidden">
                    <img
                      src={article.imageUrl ? `http://localhost:5001${article.imageUrl}` : 'https://via.placeholder.com/192x128'}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow p-4">
                    <Link to={`/articles/${article.id}`}>
                      <h2 className="text-xl font-semibold text-gray-800 mb-2">{article.title}</h2>
                      <p className="text-gray-600 text-sm">{article.content.substring(0, 150)}...</p>
                    </Link>
                    <div className="absolute top-4 right-4 flex gap-4">
                      <button
                        onClick={() => handleUpdateClick(article)}
                        className="bg-[#7887BE] hover:bg-[#6f77a8] text-white px-4 py-2 rounded-lg"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDeleteClick(article)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <AddArticleModal
          isOpen={isAddModalOpen}
          onRequestClose={() => setIsAddModalOpen(false)}
          onSave={handleSave}
        />
        <UpdateArticleModal
          isOpen={isUpdateModalOpen}
          onRequestClose={() => setIsUpdateModalOpen(false)}
          article={currentArticle}
          onSave={handleSave}
        />
        <DeleteArticleModal
          isOpen={isDeleteModalOpen}
          onRequestClose={() => setIsDeleteModalOpen(false)}
          article={currentArticle}
          onSave={handleSave}
        />
      </div>
    </AdminLayout>
  );
};

export default ArticlesPage;
