import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/modals/AdminLayout';
import DataTable from '../components/modals/DataTable';
import AddRuleModal from '../components/modals/AddRulesModal'; // Ensure path is correct
import api from '../services/api'; // Correct instance of Axios
import { FaClipboardList, FaPlus } from 'react-icons/fa';

const Rules = () => {
  const [rules, setRules] = useState([]);
  const [selectedRule, setSelectedRule] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(6); // Number of items per page

  useEffect(() => {
    fetchRules();
  }, [currentPage]);

  const fetchRules = () => {
    api.get(`/rules?page=${currentPage}&limit=${itemsPerPage}`)
      .then(response => {
        setRules(response.data.rules); // Adjust based on your API response structure
        setTotalPages(response.data.totalPages); // Adjust based on your API response structure
      })
      .catch(error => console.error('Error fetching rules data:', error));
  };

  const handleAddRule = (newRule) => {
    api.post('/rules', newRule)
      .then(response => {
        fetchRules(); // Refresh rules after adding a new one
        setModalIsOpen(false);
      })
      .catch(error => console.error('Error adding rule:', error));
  };

  const handleSelectRule = (rule) => {
    setSelectedRule(rule);
    setModalIsOpen(true); // Open modal with selected rule data
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const columns = [
    { Header: 'I Condition ID', accessor: 'i_condition_id' },
    { Header: 'AF Condition ID', accessor: 'af_condition_id' },
    { Header: 'KG Condition ID', accessor: 'kg_condition_id' },
    { Header: 'TS Condition ID', accessor: 'ts_condition_id' },
    { Header: 'H Condition ID', accessor: 'h_condition_id' },
    { Header: 'Result ID', accessor: 'result_id' },
    { Header: 'CF', accessor: 'cf' },
    {
      Header: 'Actions',
      Cell: ({ row }) => (
        <button
          onClick={() => handleSelectRule(row.original)}
          style={{ color: 'blue' }}
        >
          <FaClipboardList />
        </button>
      ),
    },
  ];

  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold mb-6 text-gray-700">Manage Rules</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-700">Rules List</h3>
          <button 
            onClick={() => setModalIsOpen(true)} 
            className="bg-blue-500 text-white p-2 rounded flex items-center"
          >
            <FaPlus className="mr-2" /> Add Rule
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
        selectedRule={selectedRule} // Pass selectedRule to modal
      />
    </AdminLayout>
  );
};

export default Rules;
