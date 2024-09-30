import React, { useState, useEffect } from 'react';
import AddIndeksMassaTubuhModal from '../components/modals/AddIndeksMassaTubuhModal';
import EditIndeksMassaTubuhModal from '../components/modals/EditIndeksMassaTubuhModal';
import DataTable from '../components/modals/DataTable'; // Ensure this path is correct
import AdminLayout from '../components/modals/AdminLayout'; // Ensure this path is correct
import api from '../services/api'; // Ensure the correct Axios instance is imported
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const AdminIndeksMassaTubuh = () => {
  const [indeksMassaTubuh, setIndeksMassaTubuh] = useState([]);
  const [selectedIndeksMassaTubuh, setSelectedIndeksMassaTubuh] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fetch data from the API
  const fetchIndeksMassaTubuh = async () => {
    try {
      const { data } = await api.get('/iconditions'); // Destructure data directly
      setIndeksMassaTubuh(data);
    } catch (error) {
      console.error('Error fetching Indeks Massa Tubuh data:', error);
      // Optional: Add user feedback
    }
  };

  useEffect(() => {
    fetchIndeksMassaTubuh();
  }, []);

  const handleAddIndeksMassaTubuh = async (newIndeksMassaTubuh) => {
    try {
      await api.post('/iconditions', newIndeksMassaTubuh);
      setIsAddModalOpen(false);
      fetchIndeksMassaTubuh(); // Refresh data after adding
    } catch (error) {
      console.error('Error adding Indeks Massa Tubuh:', error);
      // Optional: Add user feedback
    }
  };

  const handleEditImt = async (updatedIndeksMassaTubuh) => {
    try {
      await api.put(`/iconditions/${updatedIndeksMassaTubuh.id}`, updatedIndeksMassaTubuh);
      setIsEditModalOpen(false);
      fetchIndeksMassaTubuh(); // Refresh data after editing
    } catch (error) {
      console.error('Error updating Indeks Massa Tubuh:', error);
      // Optional: Add user feedback
    }
  };

  const handleDeleteIndeksMassaTubuh = async (id) => {
    try {
      await api.delete(`/iconditions/${id}`);
      fetchIndeksMassaTubuh(); // Refresh data after deleting
    } catch (error) {
      console.error('Error deleting Indeks Massa Tubuh:', error);
      // Optional: Add user feedback
    }
  };

  const columns = [
    {
      Header: () => <div className="text-center">Kode</div>,
      accessor: 'condition_code',
    },
    {
      Header: () => <div className="text-center">Kategori</div>,
      accessor: 'category',
    },
    {
      Header: () => <div className="text-center">Deskripsi</div>,
      accessor: 'description',
    },
    {
      Header: () => <div className="text-center">CF</div>,
      accessor: 'cf',
    },
    {
      Header: () => <div className="text-center">Actions</div>,
      accessor: 'actions',
      Cell: ({ row }) => (
        <div className="flex justify-center space-x-2">
          <button
            onClick={() => {
              setSelectedIndeksMassaTubuh(row.original); // Set selected item
              setIsEditModalOpen(true);
            }}
            style={{ color: 'blue' }}
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDeleteIndeksMassaTubuh(row.original.id)}
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
      <h2 className="text-3xl font-bold text-gray-700">Indeks Massa Tubuh</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-500 text-white p-2 rounded flex items-center ml-auto"
        >
          <FaPlus className="mr-2" /> Tambah Indeks Massa Tubuh
        </button>
      </div>
        <DataTable data={indeksMassaTubuh} columns={columns} />
      </div>
      {isAddModalOpen && (
        <AddIndeksMassaTubuhModal
          isOpen={isAddModalOpen}
          onRequestClose={() => setIsAddModalOpen(false)}
          onAddIndeksMassaTubuh={handleAddIndeksMassaTubuh}
        />
      )}
      {isEditModalOpen && selectedIndeksMassaTubuh && (
        <EditIndeksMassaTubuhModal
          isOpen={isEditModalOpen}
          onRequestClose={() => setIsEditModalOpen(false)}
          condition={selectedIndeksMassaTubuh}
          onEditImt={handleEditImt}
        />
      )}
    </AdminLayout>
  );
};

export default AdminIndeksMassaTubuh;
