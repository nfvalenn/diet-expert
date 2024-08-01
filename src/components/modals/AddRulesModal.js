import React, { useState } from 'react';
import Modal from 'react-modal';

const AddRuleModal = ({ isOpen, onRequestClose, onAddRule, conditions }) => {
  const [iConditionId, setIConditionId] = useState('');
  const [afConditionId, setAFConditionId] = useState('');
  const [kgConditionId, setKGConditionId] = useState('');
  const [tsConditionId, setTSConditionId] = useState('');
  const [hConditionId, setHConditionId] = useState('');
  const [resultId, setResultId] = useState('');
  const [cf, setCF] = useState('');

  const handleSubmit = () => {
    onAddRule({
      i_condition_id: iConditionId,
      af_condition_id: afConditionId,
      kg_condition_id: kgConditionId,
      ts_condition_id: tsConditionId,
      h_condition_id: hConditionId,
      result_id: resultId,
      cf: parseFloat(cf),
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Rule Modal"
      className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Add New Rule</h2>
        <div className="mb-4">
          <label className="block mb-2">I Condition</label>
          <select
            value={iConditionId}
            onChange={(e) => setIConditionId(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
          >
            <option value="">Select I Condition</option>
            {conditions?.i?.map((condition) => (
              <option key={condition.id} value={condition.id}>
                {condition.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">AF Condition</label>
          <select
            value={afConditionId}
            onChange={(e) => setAFConditionId(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
          >
            <option value="">Select AF Condition</option>
            {conditions?.af?.map((condition) => (
              <option key={condition.id} value={condition.id}>
                {condition.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">KG Condition</label>
          <select
            value={kgConditionId}
            onChange={(e) => setKGConditionId(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
          >
            <option value="">Select KG Condition</option>
            {conditions?.kg?.map((condition) => (
              <option key={condition.id} value={condition.id}>
                {condition.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">TS Condition</label>
          <select
            value={tsConditionId}
            onChange={(e) => setTSConditionId(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
          >
            <option value="">Select TS Condition</option>
            {conditions?.ts?.map((condition) => (
              <option key={condition.id} value={condition.id}>
                {condition.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">H Condition</label>
          <select
            value={hConditionId}
            onChange={(e) => setHConditionId(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
          >
            <option value="">Select H Condition</option>
            {conditions?.h?.map((condition) => (
              <option key={condition.id} value={condition.id}>
                {condition.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Result</label>
          <input
            type="text"
            value={resultId}
            onChange={(e) => setResultId(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">CF (Certainty Factor)</label>
          <input
            type="number"
            value={cf}
            onChange={(e) => setCF(e.target.value)}
            step="0.01"
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="p-2 bg-blue-500 text-white rounded mr-2"
        >
          Add Rule
        </button>
        <button
          onClick={onRequestClose}
          className="p-2 bg-gray-500 text-white rounded"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default AddRuleModal;
