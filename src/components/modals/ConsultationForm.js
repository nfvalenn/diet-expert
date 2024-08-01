import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ConsultationResultsModal from './ConsultationResultModal';

const ConsultationFormModal = ({ isOpen, onRequestClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    age: '',
    gender: '',
    imt: '',
    imtCondition: '',
    activityLevelId: '',
    bloodSugarId: '',
    hba1cId: '',
    stressLevelId: '',
  });
  const [loading, setLoading] = useState(false);
  const [conditions, setConditions] = useState({});
  const [results, setResults] = useState(null); // State to hold the results
  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false); // State to control results modal

  useEffect(() => {
    const fetchConditions = async () => {
      try {
        const [activityLevels, bloodSugars, hba1cs, stressLevels] = await Promise.all([
          axios.get('/api/conditions/activity-levels'),
          axios.get('/api/conditions/blood-sugars'),
          axios.get('/api/conditions/hba1cs'),
          axios.get('/api/conditions/stress-levels'),
        ]);
        setConditions({
          activityLevels: activityLevels.data,
          bloodSugars: bloodSugars.data,
          hba1cs: hba1cs.data,
          stressLevels: stressLevels.data,
        });
      } catch (error) {
        console.error('Error fetching conditions:', error);
      }
    };

    fetchConditions();
  }, []); // Empty dependency array to run only once when component mounts

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/consultation', {
        weight: formData.weight,
        height: formData.height,
        age: formData.age,
        gender: formData.gender,
        activityLevelId: formData.activityLevelId,
        bloodSugarId: formData.bloodSugarId,
        hba1cId: formData.hba1cId,
        stressLevelId: formData.stressLevelId
      });

      const { imt, imtCondition } = response.data;

      setFormData((prevData) => ({
        ...prevData,
        imt: imt,
        imtCondition: imtCondition || 'Not Defined' // Set imtCondition from the response
      }));

      setResults({ imt, imtCondition }); // Save the results
      setIsResultsModalOpen(true); // Open the results modal
    } catch (error) {
      console.error('Error during consultation submission:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResultsClose = () => {
    setIsResultsModalOpen(false);
    onRequestClose();
  };

  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md overflow-y-auto max-h-screen">
          <h2 className="text-2xl font-bold mb-4">Consultation Form</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight (kg)</label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="height" className="block text-sm font-medium text-gray-700">Height (cm)</label>
              <input
                type="number"
                id="height"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="activityLevelId" className="block text-sm font-medium text-gray-700">Activity Level</label>
              <select
                id="activityLevelId"
                name="activityLevelId"
                value={formData.activityLevelId}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
              >
                <option value="">Select Activity Level</option>
                {conditions.activityLevels && conditions.activityLevels.map((condition) => (
                  <option key={condition.id} value={condition.id}>{condition.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="bloodSugarId" className="block text-sm font-medium text-gray-700">Blood Sugar Level</label>
              <select
                id="bloodSugarId"
                name="bloodSugarId"
                value={formData.bloodSugarId}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
              >
                <option value="">Select Blood Sugar Level</option>
                {conditions.bloodSugars && conditions.bloodSugars.map((condition) => (
                  <option key={condition.id} value={condition.id}>{condition.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="hba1cId" className="block text-sm font-medium text-gray-700">HbA1c Level</label>
              <select
                id="hba1cId"
                name="hba1cId"
                value={formData.hba1cId}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
              >
                <option value="">Select HbA1c Level</option>
                {conditions.hba1cs && conditions.hba1cs.map((condition) => (
                  <option key={condition.id} value={condition.id}>{condition.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="stressLevelId" className="block text-sm font-medium text-gray-700">Stress Level</label>
              <select
                id="stressLevelId"
                name="stressLevelId"
                value={formData.stressLevelId}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
              >
                <option value="">Select Stress Level</option>
                {conditions.stressLevels && conditions.stressLevels.map((condition) => (
                  <option key={condition.id} value={condition.id}>{condition.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="imt" className="block text-sm font-medium text-gray-700">IMT</label>
              <input
                type="text"
                id="imt"
                name="imt"
                value={formData.imt}
                readOnly
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="imtCondition" className="block text-sm font-medium text-gray-700">IMT Condition</label>
              <input
                type="text"
                id="imtCondition"
                name="imtCondition"
                value={formData.imtCondition}
                readOnly
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={onRequestClose} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">
                Cancel
              </button>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
                {loading ? 'Processing...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
      {isResultsModalOpen && (
        <ConsultationResultsModal 
          isOpen={isResultsModalOpen} 
          onRequestClose={handleResultsClose} 
          results={results}
        />
      )}
    </>,
    document.body
  );
};

export default ConsultationFormModal;
