import React, { useState, useEffect } from 'react';
import AddIndeksMassaTubuhModal from '../components/modals/AddIndeksMassaTubuhModal';
import EditIndeksMassaTubuhModal from '../components/modals/EditIndeksMassaTubuhModal';
import DataTable from '../components/modals/DataTable';
import AdminLayout from '../components/modals/AdminLayout';
import api from '../services/api'; // Pastikan Anda mengimpor instance Axios yang benar
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const AdminIndeksMassaTubuh = () => {
  const [indeksMassaTubuh, setIndeksMassaTubuh] = useState([]);
  const [selectedIndeksMassaTubuh, setSelectedIndeksMassaTubuh] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    api.get('/iconditions')
      .then(response => {
        setIndeksMassaTubuh(response.data);
      })
      .catch(error => console.error('Error fetching Indeks Massa Tubuh data:', error));
  }, []);

  const handleAddIndeksMassaTubuh = (newIndeksMassaTubuh) => {
    api.post('/iconditions', newIndeksMassaTubuh)
      .then(response => {
        setIndeksMassaTubuh([...indeksMassaTubuh, response.data]);
        setIsAddModalOpen(false);
      })
      .catch(error => console.error('Error adding Indeks Massa Tubuh:', error));
  };

  const handleEditIndeksMassaTubuh = (updatedIndeksMassaTubuh) => {
    api.put(`/iconditions/${updatedIndeksMassaTubuh.id}`, updatedIndeksMassaTubuh)
      .then(response => {
        setIndeksMassaTubuh(indeksMassaTubuh.map(indeks =>
          indeks.id === response.data.id ? response.data : indeks
        ));
        setIsEditModalOpen(false);
      })
      .catch(error => console.error('Error updating Indeks Massa Tubuh:', error));
  };

  const handleDeleteIndeksMassaTubuh = (id) => {
    api.delete(`/iconditions/${id}`)
      .then(() => {
        setIndeksMassaTubuh(indeksMassaTubuh.filter(indeks => indeks.id !== id));
      })
      .catch(error => console.error('Error deleting Indeks Massa Tubuh:', error));
  };

  const columns = [
    { Header: 'Kode', accessor: 'condition_code' },
    { Header: 'Kategori', accessor: 'category' },
    { Header: 'Deskripsi', accessor: 'description' },
    { Header: 'CF (Certainty Factor)', accessor: 'cf' },
    {
      Header: 'Actions',
      Cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setSelectedIndeksMassaTubuh(row.original);
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
      <h2 className="text-3xl font-bold mb-6 text-gray-700">Indeks Massa Tubuh</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-700">Indeks Massa Tubuh Data</h3>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-500 text-white p-2 rounded flex items-center"
          >
            <FaPlus className="mr-2" /> Add Indeks Massa Tubuh
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
          indeksMassaTubuh={selectedIndeksMassaTubuh}
          onEditIndeksMassaTubuh={handleEditIndeksMassaTubuh}
        />
      )}
    </AdminLayout>
  );
};

export default AdminIndeksMassaTubuh;
