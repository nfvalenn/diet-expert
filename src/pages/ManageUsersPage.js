import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/modals/AdminLayout';
import DataTable from '../components/modals/DataTable';
import AddUserModal from '../components/modals/AddUserModal'; // Ensure the path is correct
import EditUserModal from '../components/modals/EditUserModal'; // Ensure the path is correct
import api from '../services/api'; // Ensure this is the correct Axios instance
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users'); // Ensure '/users' is the correct endpoint
        setUsers(response.data.users); // Adjust based on the actual response structure
      } catch (error) {
        console.error('Error fetching users:', error);
        alert('Error fetching users');
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = async (newUser) => {
    try {
      const response = await api.post('/users', newUser); // Ensure this is the correct endpoint
      setUsers([...users, response.data]); // Adjust based on the actual response structure
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Error adding user');
    }
  };

  const handleEditUser = async (updatedUser) => {
    try {
      const response = await api.put(`/users/${updatedUser.id}`, updatedUser); // Ensure this is the correct endpoint
      setUsers(users.map(user => (user.id === response.data.id ? response.data : user))); // Adjust based on the actual response structure
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Error updating user');
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await api.delete(`/users/${id}`); // Ensure this is the correct endpoint
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error deleting user');
    }
  };

  const columns = [
    { Header: 'Username', accessor: 'username' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Role', accessor: 'role' },
    {
      Header: 'Actions',
      Cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setSelectedUser(row.original);
              setIsEditModalOpen(true);
            }}
            className="text-blue-500"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDeleteUser(row.original.id)}
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
          <h1 className="text-3xl font-bold text-gray-700">Manage Users</h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-500 text-white p-2 rounded flex items-center"
          >
            <FaPlus className="mr-2" /> Add New
          </button>
        </div>
        <DataTable columns={columns} data={users} />
      </div>
      <AddUserModal
        isOpen={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
        onAddUser={handleAddUser}
      />
      {selectedUser && (
        <EditUserModal
          isOpen={isEditModalOpen}
          onRequestClose={() => setIsEditModalOpen(false)}
          user={selectedUser}
          onUpdateUser={handleEditUser} // Ensure this matches the prop name used in EditUserModal
        />
      )}
    </AdminLayout>
  );
};

export default AdminUsersPage;
