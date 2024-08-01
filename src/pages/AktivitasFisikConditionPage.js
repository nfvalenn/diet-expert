import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/modals/AdminLayout';
import DataTable from '../components/modals/DataTable';
import AddAktivitasFisikModal from '../components/modals/AddAktivitasFisikModal';
import EditAktivitasFisikModal from '../components/modals/EditAktivitasFisikModal';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const AdminAktivitasFisik = () => {
  const [aktivitasFisiks, setAktivitasFisiks] = useState([]);
  const [selectedAktivitasFisik, setSelectedAktivitasFisik] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetch('/api/aktivitas-fisik')
      .then(response => response.json())
      .then(data => setAktivitasFisiks(data))
      .catch(error => console.error('Error fetching aktivitas fisik data:', error));
  }, []);

  const handleAddAktivitasFisik = (newAktivitasFisik) => {
    fetch('/api/aktivitas-fisik', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAktivitasFisik),
    })
      .then(response => response.json())
      .then(aktivitas => {
        setAktivitasFisiks([...aktivitasFisiks, aktivitas]);
        setIsAddModalOpen(false);
      })
      .catch(error => console.error('Error adding aktivitas fisik:', error));
  };

  const handleEditAktivitasFisik = (updatedAktivitasFisik) => {
    fetch(`/api/aktivitas-fisik/${updatedAktivitasFisik.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedAktivitasFisik),
    })
      .then(response => response.json())
      .then(updated => {
        setAktivitasFisiks(aktivitasFisiks.map(aktivitas =>
          aktivitas.id === updated.id ? updated : aktivitas
        ));
        setIsEditModalOpen(false);
      })
      .catch(error => console.error('Error updating aktivitas fisik:', error));
  };

  const handleDeleteAktivitasFisik = (id) => {
    fetch(`/api/aktivitas-fisik/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setAktivitasFisiks(aktivitasFisiks.filter(aktivitas => aktivitas.id !== id));
      })
      .catch(error => console.error('Error deleting aktivitas fisik:', error));
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
              setSelectedAktivitasFisik(row.original);
              setIsEditModalOpen(true);
            }}
            style={{ color: 'blue' }}
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDeleteAktivitasFisik(row.original.id)}
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
      <h2 className="text-3xl font-bold mb-6 text-gray-700">Aktivitas Fisik</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-700">Aktivitas Fisik Data</h3>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-500 text-white p-2 rounded flex items-center"
          >
            <FaPlus className="mr-2" /> Add Aktivitas Fisik
          </button>
        </div>
        <DataTable data={aktivitasFisiks} columns={columns} />
      </div>
      {isAddModalOpen && (
        <AddAktivitasFisikModal
          isOpen={isAddModalOpen}
          onRequestClose={() => setIsAddModalOpen(false)}
          onAddAktivitasFisik={handleAddAktivitasFisik}
        />
      )}
      {isEditModalOpen && selectedAktivitasFisik && (
        <EditAktivitasFisikModal
          isOpen={isEditModalOpen}
          onRequestClose={() => setIsEditModalOpen(false)}
          aktivitasFisik={selectedAktivitasFisik}
          onEditAktivitasFisik={handleEditAktivitasFisik}
        />
      )}
    </AdminLayout>
  );
};

export default AdminAktivitasFisik;
