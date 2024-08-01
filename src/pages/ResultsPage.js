import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/modals/AdminLayout';
import DataTable from '../components/modals/DataTable';
import AddResultModal from '../components/modals/AddResultModal';
import { FaClipboardList, FaPlus } from 'react-icons/fa';

const Results = () => {
  const [data, setData] = useState([]);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    fetch('/api/consultations')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching consultation data:', error));
  }, []);

  const handleAddResult = (newResult) => {
    fetch('/api/consultations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newResult),
    })
    .then(response => response.json())
    .then(result => {
      setData([...data, result]);
      setModalIsOpen(false);
    })
    .catch(error => console.error('Error adding consultation result:', error));
  };

  const handleSelectConsultation = (consultation) => {
    setSelectedConsultation(consultation);
  };

  const columns = [
    { Header: 'Code', accessor: 'code' },
    { Header: 'Category', accessor: 'category' },
    { Header: 'Calorie Range', accessor: 'calorie_range' },
    { Header: 'Description', accessor: 'description' },
    {
      Header: 'Actions',
      Cell: ({ row }) => (
        <button
          onClick={() => handleSelectConsultation(row.original)}
          style={{ color: 'blue' }}
        >
          <FaClipboardList />
        </button>
      ),
    },
  ];

  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold mb-6 text-gray-700">Data Kalori</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-700">Data Kalori</h3>
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
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Consultation Summary</h3>
          <div>
            <p><strong>Code:</strong> {selectedConsultation.code}</p>
            <p><strong>Category:</strong> {selectedConsultation.category}</p>
            <p><strong>Calorie Range:</strong> {selectedConsultation.calorie_range}</p>
            <p><strong>Description:</strong> {selectedConsultation.description}</p>
            <h4 className="text-lg font-semibold mt-4 text-gray-700">Recommended Diet Plan</h4>
            <ul className="list-disc ml-5">
              {selectedConsultation.dietPlan.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <AddResultModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        onAddResult={handleAddResult}
      />
    </AdminLayout>
  );
};

export default Results;
