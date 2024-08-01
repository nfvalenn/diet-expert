import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/modals/AdminLayout';
import DataTable from '../components/modals/DataTable';
import { FaEye, FaTrash } from 'react-icons/fa';

const AdminConsultationHistoryPage = () => {
  const [consultations, setConsultations] = useState([]);

  useEffect(() => {
    fetch('/api/consultations')
      .then(response => response.json())
      .then(data => setConsultations(data))
      .catch(error => console.error('Error fetching consultations:', error));
  }, []);

  const handleDelete = (id) => {
    fetch(`/api/consultations/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setConsultations(consultations.filter(consultation => consultation.id !== id));
      })
      .catch(error => console.error('Error deleting consultation:', error));
  };

  const columns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'User', accessor: 'user' },
    { Header: 'Date', accessor: 'date' },
    { Header: 'Details', accessor: 'details' },
    {
      Header: 'Actions',
      Cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            onClick={() => console.log('View details:', row.original)}
            className="text-blue-500"
          >
            <FaEye />
          </button>
          <button
            onClick={() => handleDelete(row.original.id)}
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
      <h1 className="text-3xl font-bold mb-4">Consultation History</h1>
      <DataTable columns={columns} data={consultations} />
    </AdminLayout>
  );
};

export default AdminConsultationHistoryPage;
