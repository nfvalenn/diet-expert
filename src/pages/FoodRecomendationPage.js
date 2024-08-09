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
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchFoodRecommendations = async () => {
      try {
        const response = await api.get(`/foods?page=${page}&limit=${pageSize}`);
        setFoodRecommendations(response.data.items);
        setTotalCount(response.data.totalCount);
      } catch (error) {
        console.error('Error fetching food recommendations:', error);
      }
    };

    fetchFoodRecommendations();
  }, [page, pageSize]);

  const handleAddFoodRecommendation = (newFoodRecommendation) => {
    api.post('/foods', newFoodRecommendation)
      .then(response => {
        setFoodRecommendations([...foodRecommendations, response.data]);
        setIsAddModalOpen(false);
      })
      .catch(error => console.error('Error adding food recommendation:', error));
  };

  const handleEditFoodRecommendation = (updatedFoodRecommendation) => {
    api.put(`/foods/${updatedFoodRecommendation.id}`, updatedFoodRecommendation)
      .then(response => {
        setFoodRecommendations(foodRecommendations.map(fr => (fr.id === response.data.id ? response.data : fr)));
        setIsEditModalOpen(false);
      })
      .catch(error => console.error('Error updating food recommendation:', error));
  };

  const handleDeleteFoodRecommendation = (id) => {
    api.delete(`/foods/${id}`)
      .then(() => {
        setFoodRecommendations(foodRecommendations.filter(fr => fr.id !== id));
      })
      .catch(error => console.error('Error deleting food recommendation:', error));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setPage(1); // Reset to the first page
  };

  const pageCount = Math.ceil(totalCount / pageSize);

  // Define columns here
  const columns = [
    { Header: 'Name', accessor: 'name' },
    { Header: 'Porsi', accessor: 'porsi' },
    { Header: 'Weight', accessor: 'weight' },
    { Header: 'Calories', accessor: 'calories' },
    { Header: 'Protein', accessor: 'protein' },
    { Header: 'Fat', accessor: 'fat' },
    { Header: 'Time', accessor: 'time' },
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
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow p-6 bg-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Food Recommendations</h1>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded flex items-center"
            >
              <FaPlus className="mr-2" /> Add New
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <DataTable
              columns={columns}
              data={foodRecommendations}
              onEdit={(item) => {
                setSelectedFoodRecommendation(item);
                setIsEditModalOpen(true);
              }}
              onDelete={(id) => handleDeleteFoodRecommendation(id)}
              onPageChange={handlePageChange}
              page={page}
              pageCount={pageCount}
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
            onRequestClose={() => setIsEditModalOpen(false)}
            foodRecommendation={selectedFoodRecommendation}
            onEdit={handleEditFoodRecommendation}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default FoodRecommendationPage;
