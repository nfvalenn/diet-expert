// src/pages/AdminHba1cPage.js
import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/modals/AdminLayout';
import DataTable from '../components/modals/DataTable';
import AddHba1cModal from '../components/modals/AddHbcA1Modal'; // Ensure the path and name are correct
import EditHba1cModal from '../components/modals/EditHbAc1Modal'; // Ensure the path and name are correct
import api from '../services/api'; // Correct instance of Axios
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const AdminHba1cPage = () => {
  const [conditions, setConditions] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchConditions = async () => {
      try {
        const response = await api.get('/hconditions');
        setConditions(response.data);
      } catch (error) {
        console.error('Error fetching conditions:', error);
        alert('Error fetching conditions');
      }
    };

    fetchConditions();
  }, []);

  const handleAddCondition = async (newCondition) => {
    try {
      const response = await api.post('/hconditions', newCondition);
      setConditions([...conditions, response.data]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Error adding condition:', error);
      alert('Error adding condition');
    }
  };

  const handleEditCondition = async (updatedCondition) => {
    try {
      const response = await api.put(`/hconditions/${updatedCondition.id}`, updatedCondition);
      setConditions(conditions.map(condition => (condition.id === response.data.id ? response.data : condition)));
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating condition:', error);
      alert('Error updating condition');
    }
  };

  const handleDeleteCondition = async (id) => {
    try {
      await api.delete(`/hconditions/${id}`);
      setConditions(conditions.filter(condition => condition.id !== id));
    } catch (error) {
      console.error('Error deleting condition:', error);
      alert('Error deleting condition');
    }
  };

  const columns = [
    { Header: 'Code', accessor: 'condition_code' },
    { Header: 'Category', accessor: 'category' },
    { Header: 'Description', accessor: 'description' },
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
          <h1 className="text-3xl font-bold text-gray-700">HbA1c Conditions</h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-500 text-white p-2 rounded flex items-center"
          >
            <FaPlus className="mr-2" /> Add New
          </button>
        </div>
        <DataTable columns={columns} data={conditions} />
      </div>
      <AddHba1cModal
        isOpen={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
        onAddCondition={handleAddCondition}
      />
      {selectedCondition && (
        <EditHba1cModal
          isOpen={isEditModalOpen}
          onRequestClose={() => setIsEditModalOpen(false)}
          condition={selectedCondition}
          onEditCondition={handleEditCondition}
        />
      )}
    </AdminLayout>
  );
};

export default AdminHba1cPage;
