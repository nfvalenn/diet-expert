import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/modals/AdminLayout';
import DataTable from '../components/modals/DataTable';
import AddBloodSugarModal from '../components/modals/AddBloodSugarModal';
import EditBloodSugarModal from '../components/modals/EditBloodSugarModal';
import api from '../services/api'; // Ensure this is your Axios instance
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const AdminBloodSugarPage = () => {
  const [conditions, setConditions] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const loadConditions = async () => {
      try {
        const response = await api.get('/kgconditions');
        setConditions(response.data);
      } catch (error) {
        console.error('Error fetching conditions:', error);
      }
    };
    loadConditions();
  }, []);

  const handleAddCondition = async (newCondition) => {
    try {
      const response = await api.post('/kgconditions', newCondition);
      setConditions([...conditions, response.data]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Error adding condition:', error);
    }
  };

  const handleEditBloodSugar = async (updatedCondition) => {
    try {
      const response = await api.put(`/kgconditions/${updatedCondition.id}`, updatedCondition);
      setConditions(conditions.map(condition => (condition.id === response.data.id ? response.data : condition)));
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating condition:', error);
    }
  };

  const handleDeleteCondition = async (id) => {
    try {
      await api.delete(`/kgconditions/${id}`);
      setConditions(conditions.filter(condition => condition.id !== id));
    } catch (error) {
      console.error('Error deleting condition:', error);
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
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setSelectedCondition(row.original);
              setIsEditModalOpen(true);
            }}
            className="text-blue-500"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDeleteCondition(row.original.id)}
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
          <h2 className="text-3xl font-bold text-gray-700">Kadar Gula Darah</h2>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-500 text-white p-2 rounded flex items-center"
          >
            <FaPlus className="mr-2" /> Tambah Kadar Gula Darah
          </button>
        </div>
        <DataTable data={conditions} columns={columns} />
      </div>
      {isAddModalOpen && (
        <AddBloodSugarModal
          isOpen={isAddModalOpen}
          onRequestClose={() => setIsAddModalOpen(false)}
          onAddBloodSugar={handleAddCondition}
        />
      )}
      {isEditModalOpen && selectedCondition && (
        <EditBloodSugarModal
          isOpen={isEditModalOpen}
          onRequestClose={() => setIsEditModalOpen(false)}
          condition={selectedCondition}
          onEditBloodSugar={handleEditBloodSugar}
        />
      )}
    </AdminLayout>
  );
};

export default AdminBloodSugarPage;
