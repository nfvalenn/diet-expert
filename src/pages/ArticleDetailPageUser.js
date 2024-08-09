import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import UserNavbar from '../components/NavbarUser';

const ArticleDetailPageUser = () => {
  const { id } = useParams(); // Mendapatkan ID artikel dari URL
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/articles/${id}`);
        console.log('Article data:', response.data); // Debugging log
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return <div className="text-center text-lg text-gray-700">Loading...</div>;
  }

  if (!article) {
    return <div className="text-center text-lg text-gray-700">Article not found</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <UserNavbar />
      
      {/* Main content */}
      <main className="flex-grow p-6 bg-gray-100">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
          {article.imageUrl && (
            <div className="flex justify-center mb-4">
              <img
                src={`http://localhost:5001${article.imageUrl}`}
                alt={article.title}
                className="max-w-full h-auto rounded-lg"
                style={{ maxHeight: '400px' }} // Optional: Limit the height of the image
              />
            </div>
          )}
          <div className="text-gray-800 text-lg text-justify">
            {article.content}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArticleDetailPageUser;
