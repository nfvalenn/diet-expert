import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import UserNavbar from '../components/NavbarUser';
import Footer from '../components/modals/Footer';

const ArticlesPageUser = () => {
  const [articles, setArticles] = useState([]);
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

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <UserNavbar />

      {/* Main content */}
      <main className="flex-grow p-6 bg-gray-100">
        <h1 className="text-3xl font-bold text-center mb-6">Articles</h1>
        {loading ? (
          <div className="text-center text-lg text-gray-700">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {articles.map(article => (
              <div
                key={article.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:shadow-xl hover:scale-105"
              >
                <Link to={`/articlesuser/${article.id}`} className="block">
                  <div className="w-full h-40 border-b border-gray-300 overflow-hidden">
                    <img
                      src={article.imageUrl ? `http://localhost:5001${article.imageUrl}` : 'https://via.placeholder.com/400x300'}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{article.title}</h2>
                    <p className="text-gray-600 text-sm">{article.content.substring(0, 150)}...</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ArticlesPageUser;
