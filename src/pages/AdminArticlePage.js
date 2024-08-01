// src/pages/AdminArticles.js
import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/modals/AdminLayout';
import DataTable from '../components/modals/DataTable';
import AddArticleModal from '../components/modals/AddArticleModal';
import EditArticleModal from '../components/modals/EditArticleModal';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const AdminArticles = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetch('/api/articles')
      .then(response => response.json())
      .then(data => setArticles(data))
      .catch(error => console.error('Error fetching articles:', error));
  }, []);

  const handleAddArticle = (newArticle) => {
    fetch('/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newArticle),
    })
      .then(response => response.json())
      .then(article => {
        setArticles([...articles, article]);
        setIsAddModalOpen(false);
      })
      .catch(error => console.error('Error adding article:', error));
  };

  const handleEditArticle = (updatedArticle) => {
    fetch(`/api/articles/${updatedArticle.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedArticle),
    })
      .then(response => response.json())
      .then(updated => {
        setArticles(articles.map(article => (article.id === updated.id ? updated : article)));
        setIsEditModalOpen(false);
      })
      .catch(error => console.error('Error updating article:', error));
  };

  const handleDeleteArticle = (id) => {
    fetch(`/api/articles/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setArticles(articles.filter(article => article.id !== id));
      })
      .catch(error => console.error('Error deleting article:', error));
  };

  const columns = [
    { Header: 'Title', accessor: 'title' },
    { Header: 'Content', accessor: 'content' },
    { Header: 'Image', accessor: 'image' },
    { Header: 'Author', accessor: 'author' },
    {
      Header: 'Actions',
      Cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setSelectedArticle(row.original);
              setIsEditModalOpen(true);
            }}
            className="text-blue-500"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDeleteArticle(row.original.id)}
            className="text-red-500"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold mb-6 text-gray-700">Articles</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-700">Articles Data</h3>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-500 text-white p-2 rounded flex items-center"
          >
            <FaPlus className="mr-2" /> Add Article
          </button>
        </div>
        <DataTable data={articles} columns={columns} />
      </div>
      {isAddModalOpen && (
        <AddArticleModal
          isOpen={isAddModalOpen}
          onRequestClose={() => setIsAddModalOpen(false)}
          onAddArticle={handleAddArticle}
        />
      )}
      {isEditModalOpen && selectedArticle && (
        <EditArticleModal
          isOpen={isEditModalOpen}
          onRequestClose={() => setIsEditModalOpen(false)}
          article={selectedArticle}
          onEditArticle={handleEditArticle}
        />
      )}
    </AdminLayout>
  );
};

export default AdminArticles;
