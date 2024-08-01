// components/AdminIndeksMassaTubuh.js
import React, { useState, useEffect } from 'react';
import AddIndeksMassaTubuhModal from '../components/modals/AddIndeksMassaTubuhModal';
import EditIndeksMassaTubuhModal from '../components/modals/EditIndeksMassaTubuhModal';
import DataTable from '../components/modals/DataTable';
import AdminLayout from '../components/modals/AdminLayout';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const AdminIndeksMassaTubuh = () => {
  const [indeksMassaTubuh, setIndeksMassaTubuh] = useState([]);
  const [selectedIndeksMassaTubuh, setSelectedIndeksMassaTubuh] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetch('/api/indeks-massa-tubuh')
      .then(response => response.json())
      .then(data => setIndeksMassaTubuh(data))
      .catch(error => console.error('Error fetching Indeks Massa Tubuh data:', error));
  }, []);

  const handleAddIndeksMassaTubuh = (newIndeksMassaTubuh) => {
    fetch('/api/indeks-massa-tubuh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newIndeksMassaTubuh),
    })
      .then(response => response.json())
      .then(indeks => {
        setIndeksMassaTubuh([...indeksMassaTubuh, indeks]);
        setIsAddModalOpen(false);
      })
      .catch(error => console.error('Error adding Indeks Massa Tubuh:', error));
  };

  const handleEditIndeksMassaTubuh = (updatedIndeksMassaTubuh) => {
    fetch(`/api/indeks-massa-tubuh/${updatedIndeksMassaTubuh.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedIndeksMassaTubuh),
    })
      .then(response => response.json())
      .then(updated => {
        setIndeksMassaTubuh(indeksMassaTubuh.map(indeks =>
          indeks.id === updated.id ? updated : indeks
        ));
        setIsEditModalOpen(false);
      })
      .catch(error => console.error('Error updating Indeks Massa Tubuh:', error));
  };

  const handleDeleteIndeksMassaTubuh = (id) => {
    fetch(`/api/indeks-massa-tubuh/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setIndeksMassaTubuh(indeksMassaTubuh.filter(indeks => indeks.id !== id));
      })
      .catch(error => console.error('Error deleting Indeks Massa Tubuh:', error));
  };

  const columns = [
    { Header: 'Kode', accessor: 'kode' },
    { Header: 'Kategori', accessor: 'kategori' },
    { Header: 'Deskripsi', accessor: 'deskripsi' },
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
