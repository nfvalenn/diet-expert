import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/modals/AdminLayout';
import DataTable from '../components/modals/DataTable';
import AddUserModal from '../components/modals/AddUserModal';
import EditUserModal from '../components/modals/EditUserModal'; // Import the EditUserModal component
import { FaEdit, FaTrash } from 'react-icons/fa';

const AdminUsers = () => {
  const [data, setData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetch('/api/users')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const handleAddUser = (newUser) => {
    fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    })
    .then(response => response.json())
    .then(user => {
      setData([...data, user]);
      setModalIsOpen(false);
    })
    .catch(error => console.error('Error creating user:', error));
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setEditModalIsOpen(true);
  };

  const handleUpdateUser = (updatedUser) => {
    fetch(`/api/users/${updatedUser.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUser)
    })
    .then(response => response.json())
    .then(() => {
      setData(data.map(user => (user.id === updatedUser.id ? updatedUser : user)));
      setEditModalIsOpen(false);
    })
    .catch(error => console.error('Error updating user:', error));
  };

  const handleDeleteUser = (userId) => {
    fetch(`/api/users/${userId}`, {
      method: 'DELETE'
    })
    .then(() => {
      setData(data.filter(user => user.id !== userId));
    })
    .catch(error => console.error('Error deleting user:', error));
  };

  const columns = [
    { Header: 'Name', accessor: 'name' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Role', accessor: 'role' },
    {
      Header: 'Actions',
      Cell: ({ row }) => (
        <div className="flex justify-center space-x-2">
          <button 
            onClick={() => handleEditUser(row.original)} 
            style={{ color: 'blue', marginRight: '0.5rem' }}
          >
            <FaEdit />
          </button>
          <button 
            onClick={() => handleDeleteUser(row.original.id)}
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
      <h2 className="text-3xl font-bold mb-6 text-gray-700">Manage Users</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-700">User List</h3>
          <button 
            onClick={() => setModalIsOpen(true)} 
            className="bg-blue-500 text-white py-2 px-8 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add User
          </button>
        </div>
        <DataTable 
          data={data}
          columns={columns}
        />
        <AddUserModal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          onAddUser={handleAddUser}
        />
        {currentUser && (
          <EditUserModal
            isOpen={editModalIsOpen}
            onRequestClose={() => setEditModalIsOpen(false)}
            onUpdateUser={handleUpdateUser}
            user={currentUser}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
