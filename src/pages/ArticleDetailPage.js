import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminLayout from '../components/modals/AdminLayout'; // Import AdminLayout
import api from '../services/api';

const ArticleDetailPage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/articles/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <div className="text-center text-lg">Loading...</div>;

  if (!article) return <div className="text-center text-lg">Article not found</div>;

  return (
    <AdminLayout>
      <div className="flex flex-col h-full p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">{article.title}</h1>
        {article.imageUrl && (
          <div className="flex justify-center mb-6">
            <img
              src={`http://localhost:5001${article.imageUrl}`}
              alt={article.title}
              className="w-full md:w-2/3 lg:w-1/2 h-auto object-cover rounded-lg shadow-md"
              style={{ maxWidth: '600px' }} // Set maximum width for the image
            />
          </div>
        )}
        <div className="flex-1 overflow-y-auto">
          <p className="text-lg leading-relaxed text-justify">
            {article.content}
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ArticleDetailPage;
