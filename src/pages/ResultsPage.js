// src/pages/Results.js
import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/modals/AdminLayout';
import DataTable from '../components/modals/DataTable';
import AddResultModal from '../components/modals/AddResultModal';
//import EditResultModal from '../components/modals/edi'; // Add this import if needed for editing results
import api from '../services/api'; // Correct instance of Axios
import { FaClipboardList, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const Results = () => {
  const [data, setData] = useState([]);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    api.get('/results')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching consultation data:', error));
  }, []);

  const handleAddResult = async (newResult) => {
    try {
      const response = await api.post('/results', newResult);
      setData([...data, response.data]);
      setModalIsOpen(false);
    } catch (error) {
      console.error('Error adding consultation result:', error);
    }
  };

  const handleEditResult = async (updatedResult) => {
    try {
      const response = await api.put(`/results/${updatedResult.id}`, updatedResult);
      setData(data.map(result => (result.id === response.data.id ? response.data : result)));
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating consultation result:', error);
    }
  };

  const handleDeleteResult = async (id) => {
    try {
      await api.delete(`/results/${id}`);
      setData(data.filter(result => result.id !== id));
    } catch (error) {
      console.error('Error deleting consultation result:', error);
    }
  };

  const handleSelectConsultation = (consultation) => {
    setSelectedConsultation(consultation);
    setIsEditModalOpen(true);
  };

  const columns = [
    { Header: 'Code', accessor: 'code' },
    { Header: 'Category', accessor: 'category' },
    { Header: 'Calorie Range', accessor: 'calorie_range' },
    { Header: 'Description', accessor: 'description' },
    {
      Header: 'Actions',
      Cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleSelectConsultation(row.original)}
            className="text-blue-500"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDeleteResult(row.original.id)}
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
          <h1 className="text-3xl font-bold text-gray-700">Data Kalori</h1>
          <button 
            onClick={() => setModalIsOpen(true)} 
            className="bg-blue-500 text-white p-2 rounded flex items-center"
          >
            <FaPlus className="mr-2" /> Add Result
          </button>
        </div>
        <DataTable data={data} columns={columns} />
      </div>
      {selectedConsultation && (
        <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Consultation Summary</h2>
          <div>
            <p><strong>Code:</strong> {selectedConsultation.code}</p>
            <p><strong>Category:</strong> {selectedConsultation.category}</p>
            <p><strong>Calorie Range:</strong> {selectedConsultation.calorie_range}</p>
            <p><strong>Description:</strong> {selectedConsultation.description}</p>
            {selectedConsultation.dietPlan && selectedConsultation.dietPlan.length > 0 && (
              <>
                <h3 className="text-lg font-semibold mt-4 text-gray-700">Recommended Diet Plan</h3>
                <ul className="list-disc ml-5">
                  {selectedConsultation.dietPlan.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
      <AddResultModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        onAddResult={handleAddResult}
      />
      {/* {selectedConsultation && (
        <EditResultModal
          isOpen={isEditModalOpen}
          onRequestClose={() => setIsEditModalOpen(false)}
          result={selectedConsultation}
          onEditResult={handleEditResult}
        />
      )} */}
    </AdminLayout>
  );
};

export default Results;
