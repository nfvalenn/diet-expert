import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import UserNavbar from '../components/NavbarUser';
import Footer from '../components/modals/Footer';
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi'; // Icons for better UX

const ConsultationDetailPageUser = () => {
  const { id } = useParams(); // Get consultation ID from the URL
  const [consultation, setConsultation] = useState(null);
  const [recommendations, setFoodRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Added error state
  const [username, setUsername] = useState(''); // Added username state

  useEffect(() => {
    const fetchConsultation = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/consultations/${id}`);
        if (response.status === 200) {
          setConsultation(response.data.consultation);
          setFoodRecommendations(response.data.foodRecommendations);
          setUsername(response.data.data.username); // Get username from response
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
    return (
      <div className="text-center text-lg text-gray-700 p-6">
        <FiAlertCircle className="inline-block text-4xl mb-2 text-blue-500" />
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-lg text-gray-700 p-6">
        <FiAlertCircle className="inline-block text-4xl mb-2 text-red-500" />
        <p>{error}</p>
      </div>
    );
  }

  if (!consultation) {
    return (
      <div className="text-center text-lg text-gray-700 p-6">
        <FiAlertCircle className="inline-block text-4xl mb-2 text-gray-400" />
        <p>Consultation not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <UserNavbar />

      {/* Main content */}
      <main className="flex-grow p-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 space-y-6">
          <h1 className="text-3xl font-bold mb-2 text-blue-600">Detail Konsultasi</h1>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Date: {new Date(consultation.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-gray-600">Berat Badan: {consultation.weight} kg</p>
              <p className="text-gray-600">Tinggi Badan: {consultation.height} cm</p>
              <p className="text-gray-600">Umur: {consultation.age}</p>
              <p className="text-gray-600">Jenis Kelamin: {consultation.gender}</p>
              <p className="text-gray-600">IMT: {consultation.imt}</p>
            </div>
          </div>

          {/* Conditions */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Kondisi</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-md shadow hover:bg-blue-100 transition">
                <h3 className="text-lg font-semibold text-blue-600">IMT</h3>
                <p className="text-gray-600">Kategori: {consultation?.iCondition?.category || 'N/A'}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-md shadow hover:bg-blue-100 transition">
                <h3 className="text-lg font-semibold text-blue-600">Status Aktivitas</h3>
                <p className="text-gray-600">Kategori: {consultation?.activityLevel?.category || 'N/A'}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-md shadow hover:bg-blue-100 transition">
                <h3 className="text-lg font-semibold text-blue-600">Kadar Gula Darah</h3>
                <p className="text-gray-600">Kategori: {consultation?.bloodSugar?.category || 'N/A'}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-md shadow hover:bg-blue-100 transition">
                <h3 className="text-lg font-semibold text-blue-600">Tingkat HbA1c</h3>
                <p className="text-gray-600">Kategori: {consultation?.hba1c?.category || 'N/A'}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-md shadow hover:bg-blue-100 transition">
                <h3 className="text-lg font-semibold text-blue-600">Tingkat Stress</h3>
                <p className="text-gray-600">Kategori: {consultation?.stressLevel?.category || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Food Recommendations */}
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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ConsultationDetailPageUser;
