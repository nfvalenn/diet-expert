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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAktivitasFisiks = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await api.get('/afconditions');
        setAktivitasFisiks(response.data);
      } catch (error) {
        console.error('Error fetching aktivitas fisik data:', error);
        setError('Failed to fetch data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAktivitasFisiks();
  }, []);

  const handleAddAktivitasFisik = async (newAktivitasFisik) => {
    try {
      const response = await api.post('/afconditions', newAktivitasFisik);
      setAktivitasFisiks([...aktivitasFisiks, response.data]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Error adding aktivitas fisik:', error);
    }
  };

  const handleEditPhysicalActivity = async (updatedAktivitasFisik) => {
    try {
      const response = await api.put(`/afconditions/${updatedAktivitasFisik.id}`, updatedAktivitasFisik);
      setAktivitasFisiks(aktivitasFisiks.map(aktivitas =>
        aktivitas.id === response.data.id ? response.data : aktivitas
      ));
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating aktivitas fisik:', error);
    }
  };

  const handleDeleteAktivitasFisik = async (id) => {
    try {
      await api.delete(`/afconditions/${id}`);
      setAktivitasFisiks(aktivitasFisiks.filter(aktivitas => aktivitas.id !== id));
    } catch (error) {
      console.error('Error deleting aktivitas fisik:', error);
    }
  };

  const columns = [
    { Header: 'Kode', accessor: 'condition_code' },
    { Header: 'Kategori', accessor: 'category' },
    { Header: 'Deskripsi', accessor: 'description' },
    { Header: 'CF', accessor: 'cf' },
    {
      Header: 'Actions',
      Cell: ({ row }) => (
        <div className="flex justify-center space-x-2">
          <button
            onClick={() => {
              setSelectedAktivitasFisik(row.original);
              setIsEditModalOpen(true);
            }}
            className="text-blue-500"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDeleteAktivitasFisik(row.original.id)}
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
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-700">Aktivitas Fisik</h2>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-500 text-white p-2 rounded flex items-center"
          >
            <FaPlus className="mr-2" /> Tambah Aktivitas Fisik
          </button>
        </div>
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <DataTable data={aktivitasFisiks} columns={columns} />
        )}
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
            condition={selectedAktivitasFisik}
            onEditPhysicalActivity={handleEditPhysicalActivity}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminAktivitasFisik;
