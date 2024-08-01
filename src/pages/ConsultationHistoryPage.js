// src/components/ConsultationHistory.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ConsultationHistory = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConsultationHistory();
    const intervalId = setInterval(fetchConsultationHistory, 5000); // Fetch every 5 seconds

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);

  const fetchConsultationHistory = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
      const response = await axios.get('http://localhost:5000/api/consultations', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setConsultations(response.data);
    } catch (error) {
      console.error('Error fetching consultation history:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Consultation History</h1>
      {loading ? (
        <p>Loading...</p>
      ) : consultations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {consultations.map((consultation) => (
            <div key={consultation.id} className="bg-white rounded-lg shadow-lg overflow-hidden p-4">
              <h2 className="text-xl font-bold mb-2">Consultation {consultation.id}</h2>
              <p><strong>Date:</strong> {new Date(consultation.createdAt).toLocaleDateString()}</p>
              <p><strong>Weight:</strong> {consultation.weight} kg</p>
              <p><strong>Height:</strong> {consultation.height} cm</p>
              <p><strong>Age:</strong> {consultation.age}</p>
              <p><strong>Gender:</strong> {consultation.gender}</p>
              <p><strong>IMT:</strong> {consultation.imt}</p>
              {/* Add more fields as necessary */}
            </div>
          ))}
        </div>
      ) : (
        <p>No consultation history available.</p>
      )}
    </div>
  );
};

export default ConsultationHistory;
