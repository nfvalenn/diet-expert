import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/modals/AdminLayout';
import DataTable from '../components/modals/DataTable';
import AddRuleModal from '../components/modals/AddRulesModal';
import api from '../services/api';
import { FaClipboardList, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const Rules = () => {
  const [rules, setRules] = useState([]);
  const [selectedRule, setSelectedRule] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(6);

  useEffect(() => {
    fetchRules();
  }, [currentPage]);

  const fetchRules = () => {
    api.get(`/rules?page=${currentPage}&limit=${itemsPerPage}`)
      .then(response => {
        setRules(response.data.rules);
        setTotalPages(response.data.totalPages);
      })
      .catch(error => console.error('Error fetching rules data:', error));
  };

  const handleAddRule = (newRule) => {
    api.post('/rules', newRule)
      .then(response => {
        fetchRules();
        setModalIsOpen(false);
      })
      .catch(error => console.error('Error adding rule:', error));
  };

  const handleSelectRule = (rule) => {
    setSelectedRule(rule);
    setModalIsOpen(true);
  };

  const handleDeleteRule = (ruleId) => {
    api.delete(`/rules/${ruleId}`)
      .then(response => {
        fetchRules();
      })
      .catch(error => console.error('Error deleting rule:', error));
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Helper function to concatenate condition codes
  const getConditionCodes = (rule) => {
    const codes = [
      rule?.iCondition?.condition_code || '',   // Safely access iCondition
      rule?.afCondition?.condition_code || '',  // af_condition_code directly on rule object
      rule?.kgCondition?.condition_code || '',  // kg_condition_code directly on rule object
      rule?.tsCondition?.condition_code || '',  // ts_condition_code directly on rule object
      rule?.hCondition?.condition_code || ''    // h_condition_code directly on rule object
    ];
    return codes.filter(code => code).join(', '); // Join non-empty codes with a comma
  };

  const columns = [
    {
      Header: 'Kode Kondisi',
      accessor: (row) => getConditionCodes(row), // Use the condition codes from the backend
      id: 'condition_codes', // Unique identifier for the column
    },
    { 
      Header: 'Kebutuhan Kalori', 
      accessor: (row) => row?.result?.code || '', // Display result code from the backend
      id: 'result_code'
    },
    { 
      Header: 'Certainty Factor (CF)', 
      accessor: 'cf' 
    },
    {
      Header: 'Actions',
      Cell: ({ row }) => (
        <div className="flex justify-center space-x-2">
          <button
            onClick={() => {
              setSelectedRule(row.original);
              setModalIsOpen(true);
            }}
            className="text-blue-500"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDeleteRule(row.original.id)}
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
          <h3 className="text-3xl font-bold text-gray-700">Aturan</h3>
          <button 
            onClick={() => setModalIsOpen(true)} 
            className="bg-blue-500 text-white p-2 rounded flex items-center"
          >
            <FaPlus className="mr-2" /> Tambah Aturan
          </button>
        </div>
        <DataTable data={rules} columns={columns} />
        <div className="flex justify-between mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-300 text-gray-700 p-2 rounded"
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-300 text-gray-700 p-2 rounded"
          >
            Next
          </button>
        </div>
      </div>
      <AddRuleModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        onAddRule={handleAddRule}
        selectedRule={selectedRule}
      />
    </AdminLayout>
  );
};

export default Rules;
