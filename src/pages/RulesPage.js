import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddRuleModal from '../components/modals/AddRulesModal';
import UpdateRuleModal from '../components/modals/EditRulesModal';
import DeleteRuleModal from '../components/modals/DeleteRulesModal';

const RulesPage = () => {
  const [rules, setRules] = useState([]);
  const [conditions, setConditions] = useState({}); // Store all conditions
  const [selectedRule, setSelectedRule] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchRules();
    fetchConditions();
  }, []);

  const fetchRules = async () => {
    try {
      const response = await axios.get('/api/rules');
      setRules(response.data);
    } catch (error) {
      console.error('Error fetching rules:', error);
    }
  };

  const fetchConditions = async () => {
    try {
      const [iConditions, afConditions, kgConditions, tsConditions, hConditions] = await Promise.all([
        axios.get('/api/conditions/i'),
        axios.get('/api/conditions/af'),
        axios.get('/api/conditions/kg'),
        axios.get('/api/conditions/ts'),
        axios.get('/api/conditions/h')
      ]);
      setConditions({
        i: iConditions.data,
        af: afConditions.data,
        kg: kgConditions.data,
        ts: tsConditions.data,
        h: hConditions.data
      });
    } catch (error) {
      console.error('Error fetching conditions:', error);
    }
  };

  const handleAddRule = async (newRule) => {
    try {
      await axios.post('/api/rules', newRule);
      fetchRules();
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Error adding rule:', error);
    }
  };

  const handleUpdateRule = async (updatedRule) => {
    try {
      await axios.put(`/api/rules/${selectedRule.id}`, updatedRule);
      fetchRules();
      setIsUpdateModalOpen(false);
    } catch (error) {
      console.error('Error updating rule:', error);
    }
  };

  const handleDeleteRule = async () => {
    try {
      await axios.delete(`/api/rules/${selectedRule.id}`);
      fetchRules();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting rule:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Rules Management</h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Add Rule
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Conditions</th>
            <th className="p-2 border">Result</th>
            <th className="p-2 border">CF</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rules.map(rule => (
            <tr key={rule.id}>
              <td className="p-2 border">{rule.id}</td>
              <td className="p-2 border">
                {/* Display conditions as needed */}
                {conditions.i.find(c => c.id === rule.i_condition_id)?.name}, 
                {conditions.af.find(c => c.id === rule.af_condition_id)?.name}, 
                {conditions.kg.find(c => c.id === rule.kg_condition_id)?.name}, 
                {conditions.ts.find(c => c.id === rule.ts_condition_id)?.name}, 
                {conditions.h.find(c => c.id === rule.h_condition_id)?.name}
              </td>
              <td className="p-2 border">{rule.result_id}</td>
              <td className="p-2 border">{rule.cf}</td>
              <td className="p-2 border">
                <button
                  onClick={() => { setSelectedRule(rule); setIsUpdateModalOpen(true); }}
                  className="mr-2 p-1 bg-yellow-500 text-white rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => { setSelectedRule(rule); setIsDeleteModalOpen(true); }}
                  className="p-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modals */}
      <AddRuleModal
        isOpen={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
        onAddRule={handleAddRule}
        conditions={conditions} // Pass conditions to the modal
      />
      <UpdateRuleModal
        isOpen={isUpdateModalOpen}
        onRequestClose={() => setIsUpdateModalOpen(false)}
        rule={selectedRule}
        onUpdateRule={handleUpdateRule}
        conditions={conditions} // Pass conditions to the modal
      />
      <DeleteRuleModal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        onDeleteRule={handleDeleteRule}
      />
    </div>
  );
};

export default RulesPage;
