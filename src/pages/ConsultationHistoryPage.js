import React, { useEffect, useState } from 'react';
import api from '../services/api'; // Pastikan Anda mengimpor instance Axios yang benar

const ConsultationHistory = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await api.get('/consultations/history', {
        });
        setConsultations(response.data);
      } catch (error) {
        setError('Error fetching consultation history');
        console.error('Error fetching consultation history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConsultations();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Riwayat Konsultasi</h1>
      {consultations.length === 0 ? (
        <p>Tidak ada riwayat konsultasi.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Tanggal</th>
              <th className="py-2 px-4 border-b">Detail</th>
              <th className="py-2 px-4 border-b">Catatan</th>
            </tr>
          </thead>
          <tbody>
            {consultations.map((consultation) => (
              <tr key={consultation.id}>
                <td className="py-2 px-4 border-b">{new Date(consultation.createdAt).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">{consultation.details}</td>
                <td className="py-2 px-4 border-b">{consultation.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ConsultationHistory;
