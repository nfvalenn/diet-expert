// src/pages/AdminHba1cPage.js
import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/modals/AdminLayout';
import DataTable from '../components/modals/DataTable';
import AddHba1cModal from '../components/modals/AddHbcA1Modal';
import EditHba1cModal from '../components/modals/EditHbAc1Modal';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const AdminHba1cPage = () => {
  const [conditions, setConditions] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetch('/api/conditions/hba1c')
      .then(response => response.json())
      .then(data => setConditions(data))
      .catch(error => console.error('Error fetching conditions:', error));
  }, []);

  const handleAddCondition = (newCondition) => {
    fetch('/api/conditions/hba1c', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCondition),
    })
      .then(response => response.json())
      .then(condition => {
        setConditions([...conditions, condition]);
        setIsAddModalOpen(false);
      })
      .catch(error => console.error('Error adding condition:', error));
  };

  const handleEditCondition = (updatedCondition) => {
    fetch(`/api/conditions/hba1c/${updatedCondition.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedCondition),
    })
      .then(response => response.json())
      .then(updated => {
        setConditions(conditions.map(condition => (condition.id === updated.id ? updated : condition)));
        setIsEditModalOpen(false);
      })
      .catch(error => console.error('Error updating condition:', error));
  };

  const handleDeleteCondition = (id) => {
    fetch(`/api/conditions/hba1c/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setConditions(conditions.filter(condition => condition.id !== id));
      })
      .catch(error => console.error('Error deleting condition:', error));
  };

  const columns = [
    { Header: 'Code', accessor: 'code' },
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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">HbA1c Conditions</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-500 text-white p-2 rounded flex items-center"
        >
          <FaPlus className="mr-2" /> Add New
        </button>
      </div>
      <DataTable columns={columns} data={conditions} />
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
