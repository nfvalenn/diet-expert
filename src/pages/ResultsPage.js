import React, { useState, useEffect } from 'react';
import AddResultModal from '../components/modals/AddResultModal';
import EditResultModal from '../components/modals/EditResultModal';
import DataTable from '../components/modals/DataTable';
import AdminLayout from '../components/modals/AdminLayout';
import api from '../services/api';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const Results = () => {
  const [results, setResults] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null); // for editing

  // Fetch data from the API
  const fetchResults = async () => {
    try {
      const { data } = await api.get('/results');
      setResults(data);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  // Add a new result
  const handleAddResult = async (newResult) => {
    try {
      await api.post('/results', newResult);
      setIsAddModalOpen(false);
      fetchResults(); // Refresh data after adding
    } catch (error) {
      console.error('Error adding result:', error);
    }
  };

  // Edit an existing result
  const handleEditResult = async (updatedResult) => {
    try {
      await api.put(`/results/${updatedResult.id}`, updatedResult);
      setIsEditModalOpen(false);
      setSelectedResult(null);
      fetchResults(); // Refresh data after editing
    } catch (error) {
      console.error('Error editing result:', error);
    }
  };

  // Open edit modal with selected result
  const handleOpenEditModal = (result) => {
    setSelectedResult(result);
    setIsEditModalOpen(true);
  };

  // Delete a result
  const handleDeleteResult = async (id) => {
    try {
      await api.delete(`/results/${id}`);
      fetchResults(); // Refresh data after deleting
    } catch (error) {
      console.error('Error deleting result:', error);
    }
  };

  // Define the columns for the data table
  const columns = [
    {
      Header: () => <div className="text-center">Kode</div>,
      accessor: 'code',
    },
    {
      Header: () => <div className="text-center">Kategori</div>,
      accessor: 'category',
    },
    {
      Header: () => <div className="text-center">Kalori Range</div>,
      accessor: 'calorie_range',
    },
    {
      Header: () => <div className="text-center">Deskripsi</div>,
      accessor: 'description',
    },
    {
      Header: () => <div className="text-center">Actions</div>,
      accessor: 'actions',
      Cell: ({ row }) => (
        <div className="flex justify-center space-x-2">
          <button
            onClick={() => handleOpenEditModal(row.original)}
            style={{ color: 'blue' }}
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDeleteResult(row.original.id)}
            style={{ color: 'red' }}
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
        <div className="flex items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-700">Result</h2>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-500 text-white p-2 rounded flex items-center ml-auto"
          >
            <FaPlus className="mr-2" /> Tambah Result
          </button>
        </div>
        <DataTable data={results} columns={columns} />
      </div>

      {isAddModalOpen && (
        <AddResultModal
          isOpen={isAddModalOpen}
          onRequestClose={() => setIsAddModalOpen(false)}
          onAddResult={handleAddResult}
        />
      )}

      {isEditModalOpen && selectedResult && (
        <EditResultModal
          isOpen={isEditModalOpen}
          onRequestClose={() => {
            setIsEditModalOpen(false);
            setSelectedResult(null);
          }}
          result={selectedResult}
          onEditResult={handleEditResult}
        />
      )}
    </AdminLayout>
  );
};

export default Results;
