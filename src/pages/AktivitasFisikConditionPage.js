import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/modals/AdminLayout'; // Corrected path
import DataTable from '../components/modals/DataTable'; // Corrected path
import AddAktivitasFisikModal from '../components/modals/AddAktivitasFisikModal';
import EditAktivitasFisikModal from '../components/modals/EditAktivitasFisikModal';
import api from '../services/api'; // Correct instance of Axios
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const AdminAktivitasFisik = () => {
  const [aktivitasFisiks, setAktivitasFisiks] = useState([]);
  const [selectedAktivitasFisik, setSelectedAktivitasFisik] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    api.get('/afconditions')
      .then(response => setAktivitasFisiks(response.data))
      .catch(error => console.error('Error fetching aktivitas fisik data:', error));
  }, []);

  const handleAddAktivitasFisik = (newAktivitasFisik) => {
    api.post('/afconditions', newAktivitasFisik)
      .then(response => {
        setAktivitasFisiks([...aktivitasFisiks, response.data]);
        setIsAddModalOpen(false);
      })
      .catch(error => console.error('Error adding aktivitas fisik:', error));
  };

  const handleEditAktivitasFisik = (updatedAktivitasFisik) => {
    api.put(`/afconditions/${updatedAktivitasFisik.id}`, updatedAktivitasFisik)
      .then(response => {
        setAktivitasFisiks(aktivitasFisiks.map(aktivitas =>
          aktivitas.id === response.data.id ? response.data : aktivitas
        ));
        setIsEditModalOpen(false);
      })
      .catch(error => console.error('Error updating aktivitas fisik:', error));
  };

  const handleDeleteAktivitasFisik = (id) => {
    api.delete(`/afconditions/${id}`)
      .then(() => {
        setAktivitasFisiks(aktivitasFisiks.filter(aktivitas => aktivitas.id !== id));
      })
      .catch(error => console.error('Error deleting aktivitas fisik:', error));
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
