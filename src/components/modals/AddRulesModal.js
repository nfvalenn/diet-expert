import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import api from '../../services/api'; // Ensure this path is correct

const AddRuleModal = ({ isOpen, onRequestClose, onAddRule }) => {
  const [iConditionOptions, setIConditionOptions] = useState([]);
  const [afConditionOptions, setAFConditionOptions] = useState([]);
  const [kgConditionOptions, setKGConditionOptions] = useState([]);
  const [tsConditionOptions, setTSConditionOptions] = useState([]);
  const [hConditionOptions, setHConditionOptions] = useState([]);
  const [resultOptions, setResultOptions] = useState([]);

  const [i_condition_id, setIConditionId] = useState('');
  const [af_condition_id, setAFConditionId] = useState('');
  const [kg_condition_id, setKGConditionId] = useState('');
  const [ts_condition_id, setTSConditionId] = useState('');
  const [h_condition_id, setHConditionId] = useState('');
  const [result_id, setResultId] = useState('');
  const [cf, setCF] = useState('');

  useEffect(() => {
    const fetchConditions = async () => {
      try {
        const [iConditionsResponse, afConditionsResponse, kgConditionsResponse, tsConditionsResponse, hConditionsResponse, resultsResponse] = await Promise.all([
          api.get('/iconditions'),
          api.get('/afconditions'),
          api.get('/kgconditions'),
          api.get('/tsconditions'),
          api.get('/hconditions'),
          api.get('/results')
        ]);

        setIConditionOptions(iConditionsResponse.data);
        setAFConditionOptions(afConditionsResponse.data);
        setKGConditionOptions(kgConditionsResponse.data);
        setTSConditionOptions(tsConditionsResponse.data);
        setHConditionOptions(hConditionsResponse.data);
        setResultOptions(resultsResponse.data);
      } catch (error) {
        console.error('Error fetching conditions:', error);
      }
    };

    fetchConditions();
  }, []);

  const handleSubmit = async () => {
    if (!result_id || isNaN(parseFloat(cf)) || parseFloat(cf) < 0 || parseFloat(cf) > 1) {
      alert('Please provide valid inputs for Result ID and Certainty Factor.');
      return;
    }

    const newRule = {
      i_condition_id: i_condition_id,
      af_condition_id: af_condition_id,
      kg_condition_id: kg_condition_id,
      ts_condition_id: ts_condition_id,
      h_condition_id: h_condition_id,
      result_id: result_id,
      cf: parseFloat(cf),
    };

    console.log('Submitting new rule:', newRule);

    try {
      // Ensure the onAddRule function is correctly passed and defined
      console.log('onAddRule function:', onAddRule);

      const response = await onAddRule(newRule);
      console.log('Rule added successfully:', response);
      onRequestClose();
    } catch (error) {
      console.error('Error adding rule:', error);
      alert('Failed to add rule. Please check the console for more details.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Rule Modal"
      className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full max-h-screen overflow-y-auto">
        <h2 className="text-2xl text-center font-bold mb-6">Tambah Aturan Baru</h2>

        {/* Dropdowns for conditions and inputs for CF */}
        <div className="mb-4">
          <label htmlFor="iCondition" className="block mb-2">Kondisi Indeks Massa Tubuh</label>
          <select
            id="iCondition"
            value={i_condition_id}
            onChange={(e) => setIConditionId(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
            aria-label="I Condition"
          >
            <option value="">Select Kondisi Indeks Massa Tubuh</option>
            {iConditionOptions.map(condition => (
              <option key={condition.id} value={condition.id}>
                {condition.condition_code} - {condition.category}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="afCondition" className="block mb-2">Status Aktivitas Fisik</label>
          <select
            id="afCondition"
            value={af_condition_id}
            onChange={(e) => setAFConditionId(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
            aria-label="AF Condition"
          >
            <option value="">Select Status Aktivitas Fisik</option>
            {afConditionOptions.map(condition => (
              <option key={condition.id} value={condition.id}>
                {condition.condition_code} - {condition.category}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="kgCondition" className="block mb-2">Kadar Gula Darah</label>
          <select
            id="kgCondition"
            value={kg_condition_id}
            onChange={(e) => setKGConditionId(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
            aria-label="KG Condition"
          >
            <option value="">Select Kadar Gula Darah</option>
            {kgConditionOptions.map(condition => (
              <option key={condition.id} value={condition.id}>
                {condition.condition_code} - {condition.category}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="tsCondition" className="block mb-2">Tingkat Stress</label>
          <select
            id="tsCondition"
            value={ts_condition_id}
            onChange={(e) => setTSConditionId(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
            aria-label="TS Condition"
          >
            <option value="">Select Tingkat Stress</option>
            {tsConditionOptions.map(condition => (
              <option key={condition.id} value={condition.id}>
                {condition.condition_code} - {condition.category}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="hCondition" className="block mb-2">HbA1c</label>
          <select
            id="hCondition"
            value={h_condition_id}
            onChange={(e) => setHConditionId(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
            aria-label="H Condition"
          >
            <option value="">Select HbA1c</option>
            {hConditionOptions.map(condition => (
              <option key={condition.id} value={condition.id}>
                {condition.condition_code} - {condition.category}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="result" className="block mb-2">Kebutuhan Kalori</label>
          <select
            id="result"
            value={result_id}
            onChange={(e) => setResultId(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
            aria-label="Result"
          >
            <option value="">Select Kebutuhan Kalori</option>
            {resultOptions.map(result => (
              <option key={result.id} value={result.id}>
                {result.result_code} - {result.description}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="cf" className="block mb-2">CF (Certainty Factor)</label>
          <input
            id="cf"
            type="number"
            value={cf}
            onChange={(e) => setCF(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
            min="0"
            max="1"
            step="0.01"
            aria-label="Certainty Factor"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded flex-1">
            Tambah Aturan
          </button>
          <button onClick={onRequestClose} className="bg-gray-300 text-black py-2 px-4 rounded flex-1">
            Batal
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddRuleModal;
