import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/api';
import UserNavbar from '../components/NavbarUser';

const ConsultationHistoryPage = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await apiClient.get('/consultations/history');
        setConsultations(response.data);
      } catch (error) {
        setError('Failed to load consultations');
      } finally {
        setLoading(false);
      }
    };

    fetchConsultations();
  }, []);

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="text-center mt-4 text-red-600">{error}</div>;

  return (
    <div className="flex min-h-screen flex-col">
      <UserNavbar />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-3xl">
          <h1 className="text-2xl font-bold mb-4">Consultation History</h1>
          {consultations.length > 0 ? (
            <ul>
              {consultations.map((consultation) => (
                <li key={consultation.id} className="border-b py-2">
                  <Link
                    to={`/consultations/history/${consultation.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Consultation ID: {consultation.id} - Date: {new Date(consultation.createdAt).toLocaleDateString()}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No consultations found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultationHistoryPage;
