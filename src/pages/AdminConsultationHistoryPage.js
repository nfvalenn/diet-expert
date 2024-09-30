import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/api'; // Ensure the correct path to your API client
import AdminLayout from '../components/modals/AdminLayout'; // Adjusted to AdminLayout

const ConsultationHistoryPage = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await apiClient.get('/consultations'); // Ensure this endpoint is correct
        setConsultations(response.data.rows || []); // Adjust based on your actual response structure
      } catch (error) {
        setError('Failed to load consultations');
        console.error('Error fetching consultations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConsultations();
  }, []);

  if (loading) {
    return <div className="text-center mt-4 text-lg text-gray-700">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-4 text-red-600">{error}</div>;
  }

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-6">Riwayat Konsultasi</h1>
        <div className="overflow-y-auto max-h-[calc(100vh-150px)]">
          <div className="space-y-6">
            {consultations.length > 0 ? (
              consultations.map((consultation) => (
                <div
                  key={consultation.id}
                  className="relative flex bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:shadow-xl hover:scale-105"
                >
                  <div className="flex-grow p-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      ID Konsultasi: {consultation.id}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      <strong>Date:</strong> {consultation.createdAt ? new Date(consultation.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                    <p className="text-gray-600 text-sm">
                      <strong>Berat Badan:</strong> {consultation.weight || 'N/A'} kg
                    </p>
                    <p className="text-gray-600 text-sm">
                      <strong>Tinggi Badan:</strong> {consultation.height || 'N/A'} cm
                    </p>
                    <p className="text-gray-600 text-sm">
                      <strong>Umur:</strong> {consultation.age || 'N/A'} years
                    </p>
                    <p className="text-gray-600 text-sm">
                      <strong>Jenis Kelamin:</strong> {consultation.gender || 'N/A'}
                    </p>
                    <div className="absolute top-4 right-4 flex gap-4">
                      <Link
                        to={`/admin/consultations/history/${consultation.id}`}
                        className="bg-[#7887BE] hover:bg-[#6f77a8] text-white px-4 py-2 rounded-lg"
                      >
                        Lihat Detail
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No consultations found.</p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ConsultationHistoryPage;
