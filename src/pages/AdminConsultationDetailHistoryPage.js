import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import AdminNavbar from '../components/modals/AdminLayout'; // Ensure the path is correct
import { FiAlertCircle } from 'react-icons/fi'; // Add this import for alert icon

const ConsultationDetailPageAdmin = () => {
  const { id } = useParams(); // Get consultation ID from the URL
  const [consultation, setConsultation] = useState(null); // Initialize consultation state
  const [recommendations, setFoodRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConsultation = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/consultations/${id}`);
        if (response.status === 200) {
          console.log('Consultation data:', response.data);
          setConsultation(response.data.consultation);
          setFoodRecommendations(response.data.foodRecommendations || []);
        } else {
          setError('Consultation not found');
        }
      } catch (error) {
        console.error('Error fetching consultation:', error);
        setError('An error occurred while fetching consultation details.');
      } finally {
        setLoading(false);
      }
    };

    fetchConsultation();
  }, [id]);

  if (loading) {
    return <div className="text-center text-lg text-gray-700">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-gray-700">{error}</div>;
  }

  if (!consultation) {
    return <div className="text-center text-lg text-gray-700">Consultation not found</div>;
  }

  return (
    <AdminNavbar>
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
     
      {/* Main content */}
      <main className="flex-grow p-6 bg-gray-100 mt-16"> {/* Adjust margin-top based on your navbar height */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold text-center mb-4">Detail Konsultasi</h2>
          <div className="mb-4">
            <h3 className="text-2xl font-semibold">ID Konsultasi: {consultation.id}</h3>
            <p className="text-gray-600 text-sm">Date: {new Date(consultation.createdAt).toLocaleDateString()}</p>
            <p className="text-gray-600 text-sm">Berat Badan: {consultation.weight} kg</p>
            <p className="text-gray-600 text-sm">Tinggi Badan: {consultation.height} cm</p>
            <p className="text-gray-600 text-sm">Umur: {consultation.age}</p>
            <p className="text-gray-600 text-sm">Jenis Kelamin: {consultation.gender}</p>
            <p className="text-gray-600 text-sm">IMT: {consultation.imt}</p>
            <p className="text-gray-600 text-sm">User ID: {consultation.userId}</p> {/* Admin Specific */}
            <p className="text-gray-600 text-sm">Consultation Status: {consultation.status}</p> {/* Admin Specific */}
          </div>
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">Kondisi</h2>
            {consultation.iCondition && (
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <h3 className="text-xl font-semibold">Kondisi IMT</h3>
                <p className="text-gray-600 text-sm">Kategori: {consultation.iCondition.category}</p>
              </div>
            )}
            {consultation.activityLevel && (
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <h3 className="text-xl font-semibold">Status Aktivitas</h3>
                <p className="text-gray-600 text-sm">Kategori: {consultation.activityLevel.category}</p>
              </div>
            )}
            {consultation.bloodSugar && (
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <h3 className="text-xl font-semibold">Kadar Gula Darah</h3>
                <p className="text-gray-600 text-sm">Kategori: {consultation.bloodSugar.category}</p>
              </div>
            )}
            {consultation.hba1c && (
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <h3 className="text-xl font-semibold">Tingkat HbA1c</h3>
                <p className="text-gray-600 text-sm">Kategori: {consultation.hba1c.category}</p>
              </div>
            )}
            {consultation.stressLevel && (
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <h3 className="text-xl font-semibold">Tingkat Stress</h3>
                <p className="text-gray-600 text-sm">Kategori: {consultation.stressLevel.category}</p>
              </div>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-green-500">Food Recommendations</h2>
            {recommendations && recommendations.length > 0 ? (
              <ul className="space-y-2">
                {recommendations.map((item, index) => (
                  <li key={index} className="bg-green-50 p-4 rounded-md shadow-md hover:shadow-lg transition hover:bg-green-100">
                    <h3 className="text-lg font-semibold text-green-600">{item.name || "Unnamed Item"}</h3>
                    <p className="text-gray-600">Weight: {item.weight || 'N/A'} g</p>
                    <p className="text-gray-600">Calories: {item.calories || 'N/A'} kcal</p>
                    <p className="text-gray-600">Protein: {item.protein || 'N/A'} g</p>
                    <p className="text-gray-600">Fat: {item.fat || 'N/A'} g</p>
                    <p className="text-gray-600">Time: {item.time || 'N/A'}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center text-gray-500">
                <FiAlertCircle className="inline-block text-4xl mb-2 text-gray-400" />
                <p>No food recommendations available.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
    </AdminNavbar>
  );
};

export default ConsultationDetailPageAdmin;
