import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/modals/AdminLayout';
import DataTable from '../components/modals/DataTable';
import AddFoodRecommendationModal from '../components/modals/AddFoodRecomendationModal';
import EditFoodRecommendationModal from '../components/modals/EditFoodRecomendationModal';
import api from '../services/api';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const FoodRecommendationPage = () => {
  const [foodRecommendations, setFoodRecommendations] = useState([]);
  const [selectedFoodRecommendation, setSelectedFoodRecommendation] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchFoodRecommendations = async () => {
      try {
        const response = await api.get(`/foods?page=${page}&limit=${pageSize}`);
        
        if (response.data && response.data.items) {
          setFoodRecommendations(response.data.items);
          setTotalCount(response.data.totalCount);
        } else {
          console.error('Unexpected response format', response.data);
        }
      } catch (error) {
        console.error('Error fetching food recommendations:', error);
        setErrorMessage('Failed to fetch food recommendations.');
      }
    };

    fetchFoodRecommendations();
  }, [page, pageSize]);

  const handleAddFoodRecommendation = async (newFoodRecommendation) => {
    setErrorMessage('');
    try {
      const response = await api.post('/foods', newFoodRecommendation);
      setFoodRecommendations([...foodRecommendations, response.data]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Error adding food recommendation:', error);
      setErrorMessage(error.response?.data.error || 'Failed to add food recommendation.');
    }
  };

  const handleEditFoodRecommendation = async (updatedFoodRecommendation) => {
    setErrorMessage('');
    try {
      const response = await api.put(`/foods/${updatedFoodRecommendation.id}`, updatedFoodRecommendation);
      setFoodRecommendations(foodRecommendations.map(fr => (fr.id === response.data.id ? response.data : fr)));
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating food recommendation:', error);
      setErrorMessage(error.response?.data.error || 'Failed to update food recommendation.');
    }
  };

  const handleDeleteFoodRecommendation = async (id) => {
    if (window.confirm("Are you sure you want to delete this food recommendation?")) {
      try {
        await api.delete(`/foods/${id}`);
        setFoodRecommendations(foodRecommendations.filter(fr => fr.id !== id));
      } catch (error) {
        console.error('Error deleting food recommendation:', error);
      }
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (event) => {
    const newSize = Number(event.target.value);
    setPageSize(newSize);
    setPage(1);
  };

  const pageCount = Math.ceil(totalCount / pageSize);

  const columns = [
    { Header: 'Nama', accessor: 'name' },
    { Header: 'Porsi', accessor: 'porsi' },
    { Header: 'Berat (gr)', accessor: 'weight' },
    { Header: 'Kalori', accessor: 'calories' },
    { Header: 'Protein', accessor: 'protein' },
    { Header: 'Lemak', accessor: 'fat' },
    { Header: 'Waktu', accessor: 'time' },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <div className="flex justify-center space-x-2">
          <button
            onClick={() => {
              setSelectedFoodRecommendation(row.original);
              setIsEditModalOpen(true);
            }}
            className="text-blue-500 hover:text-blue-700"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDeleteFoodRecommendation(row.original.id)}
            className="text-red-500 hover:text-red-700"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-700">Rekomendasi Makanan</h2>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded flex items-center"
          >
            <FaPlus className="mr-2" /> Tambah Makanan
          </button>
        </div>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <div className="bg-white p-4 rounded-lg shadow-md">
          <DataTable
            columns={columns}
            data={foodRecommendations}
            onPageChange={handlePageChange}
            page={page}
            pageCount={pageCount}
            onPageSizeChange={handlePageSizeChange}
            pageSize={pageSize}
          />
        </div>
      </div>

      <AddFoodRecommendationModal
        isOpen={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddFoodRecommendation}
      />

      {selectedFoodRecommendation && (
        <EditFoodRecommendationModal
          isOpen={isEditModalOpen}
          onRequestClose={() => {
            setSelectedFoodRecommendation(null);
            setIsEditModalOpen(false);
          }}
          foodRecommendation={selectedFoodRecommendation}
          onEdit={handleEditFoodRecommendation}
        />
      )}
    </AdminLayout>
  );
};

export default FoodRecommendationPage;
