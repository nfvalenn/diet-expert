import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import api from '../../services/api'; // Sesuaikan path sesuai kebutuhan
import FoodRecommendationPage from '../../pages/FoodRecomendationPage';

// Set app element untuk aksesibilitas
Modal.setAppElement('#root'); // Pastikan ini sesuai dengan ID root elemen Anda

const ConsultationForm = ({ isOpen, onRequestClose }) => {
  const [af_condition_options, setAFConditionOptions] = useState([]);
  const [kg_condition_options, setKGConditionOptions] = useState([]);
  const [ts_condition_options, setTSConditionOptions] = useState([]);
  const [h_condition_options, setHConditionOptions] = useState([]);

  const [af_condition_id, setAFConditionId] = useState('');
  const [kg_condition_id, setKGConditionId] = useState('');
  const [ts_condition_id, setTSConditionId] = useState('');
  const [h_condition_id, setHConditionId] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [notes, setNotes] = useState('');

  const [consultationResult, setConsultationResult] = useState(null);
  const [showResultModal, setShowResultModal] = useState(false);

  useEffect(() => {
    const fetchConditions = async () => {
      try {
        const [
          af_conditions_response,
          kg_conditions_response,
          ts_conditions_response,
          h_conditions_response,
        ] = await Promise.all([
          api.get('/afconditions'),
          api.get('/kgconditions'),
          api.get('/tsconditions'),
          api.get('/hconditions'),
        ]);

        setAFConditionOptions(af_conditions_response.data);
        setKGConditionOptions(kg_conditions_response.data);
        setTSConditionOptions(ts_conditions_response.data);
        setHConditionOptions(h_conditions_response.data);
      } catch (error) {
        console.error('Error fetching conditions:', error);
      }
    };

    fetchConditions();
  }, []);

  const validateInputs = () => {
    if (
      !weight ||
      !height ||
      !age ||
      !gender ||
      !af_condition_id ||
      !kg_condition_id ||
      !h_condition_id ||
      !ts_condition_id
    ) {
      alert('Silakan lengkapi semua field.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const consultation_data = {
      weight: parseFloat(weight),
      height: parseFloat(height),
      age: parseInt(age),
      gender: gender,
      activityLevelId: af_condition_id,
      bloodSugarId: kg_condition_id,
      hba1cId: h_condition_id,
      stressLevelId: ts_condition_id,
      notes: notes,
      userId: 1, // Ganti dengan ID pengguna yang sesuai jika perlu
    };

    console.log('Data Konsultasi:', consultation_data);

    try {
      const response = await api.post('/consultations', consultation_data);
      console.log('Respons API Konsultasi:', response.data); // Log respons untuk debugging
      setConsultationResult(response.data.result);
      setShowResultModal(true);  // Menampilkan modal hasil
      onRequestClose(); // Tutup modal form konsultasi
    } catch (error) {
      console.error('Error menambahkan konsultasi:', error.response ? error.response.data : error.message);
      alert('Gagal menambahkan konsultasi. Silakan coba lagi.');
    }
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Tambah Konsultasi"
        className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded shadow-lg max-w-md w-full h-full max-h-screen overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Tambah Konsultasi Baru</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="weight" className="block mb-2">Berat Badan (kg)</label>
              <input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                step="0.1"
                min="0"
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="height" className="block mb-2">Tinggi Badan (cm)</label>
              <input
                id="height"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                step="0.1"
                min="0"
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="age" className="block mb-2">Umur</label>
              <input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="0"
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="gender" className="block mb-2">Jenis Kelamin</label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="p-2 border border-gray-300 rounded w-full"
                required
              >
                <option value="">Pilih Jenis Kelamin</option>
                <option value="Male">Pria</option>
                <option value="Female">Wanita</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="af_condition" className="block mb-2">Status Aktivitas</label>
              <select
                id="af_condition"
                value={af_condition_id}
                onChange={(e) => setAFConditionId(e.target.value)}
                className="p-2 border border-gray-300 rounded w-full"
              >
                <option value="">Pilih Status Aktivitas</option>
                {af_condition_options.map((condition) => (
                  <option key={condition.id} value={condition.id}>{condition.category}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="kg_condition" className="block mb-2">Kadar Gula Darah</label>
              <select
                id="kg_condition"
                value={kg_condition_id}
                onChange={(e) => setKGConditionId(e.target.value)}
                className="p-2 border border-gray-300 rounded w-full"
              >
                <option value="">Pilih Kadar Gula Darah</option>
                {kg_condition_options.map((condition) => (
                  <option key={condition.id} value={condition.id}>{condition.category}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="h_condition" className="block mb-2">HbA1c</label>
              <select
                id="h_condition"
                value={h_condition_id}
                onChange={(e) => setHConditionId(e.target.value)}
                className="p-2 border border-gray-300 rounded w-full"
              >
                <option value="">Pilih HbA1c</option>
                {h_condition_options.map((condition) => (
                  <option key={condition.id} value={condition.id}>{condition.category}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="ts_condition" className="block mb-2">Tingkat Stres</label>
              <select
                id="ts_condition"
                value={ts_condition_id}
                onChange={(e) => setTSConditionId(e.target.value)}
                className="p-2 border border-gray-300 rounded w-full"
              >
                <option value="">Pilih Tingkat Stres</option>
                {ts_condition_options.map((condition) => (
                  <option key={condition.id} value={condition.id}>{condition.category}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Kirim
              </button>
            </div>
          </form>
        </div>
      </Modal>

      <Modal
        isOpen={showResultModal}
        onRequestClose={() => setShowResultModal(false)}
        contentLabel="Hasil Konsultasi"
        className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded shadow-lg max-w-md w-full h-full max-h-screen overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Hasil Konsultasi</h2>
          {consultationResult ? (
            <div>
              <h3 className="text-lg font-semibold mb-2">Rekomendasi Makanan:</h3>
              <FoodRecommendationPage recommendations={consultationResult} />
              {/* Atau tampilkan detail lain dari hasil konsultasi sesuai kebutuhan */}
            </div>
          ) : (
            <p>Loading...</p>
          )}
          <div className="flex justify-end mt-4">
            <button
              onClick={() => setShowResultModal(false)}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Tutup
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ConsultationForm;
