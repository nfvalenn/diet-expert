import React, { useState, useEffect, useCallback } from 'react';
import Modal from 'react-modal';
import api from '../../services/api';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

const ConsultationForm = ({isOpen, onRequestClose}) => {
  const [beratBadan, setBeratBadan] = useState('');
  const [tinggiBadan, setTinggiBadan] = useState('');
  const [usia, setUsia] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('');
  const [statusAktivitasFisik, setAFConditionId] = useState('');
  const [kadarGulaDarah, setKGConditionId] = useState('');
  const [tingkatStress, setTSConditionId] = useState('');
  const [hbA1c, setHConditionId] = useState('');
  const [imt, setIMT] = useState(null);
  const [iConditionId, setIConditionId] = useState('');
  const [error, setError] = useState('');
  const [consultation, setConsultation] = useState(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [afConditionOptions, setAFConditionOptions] = useState([]);
  const [kgConditionOptions, setKGConditionOptions] = useState([]);
  const [tsConditionOptions, setTSConditionOptions] = useState([]);
  const [hConditionOptions, setHConditionOptions] = useState([]);
  const [iConditionOptions, setIConditionOptions] = useState([]);

  const navigate = useNavigate();

  const fetchConditions = useCallback(async () => {
    try {
      const [responseAF, responseKG, responseTS, responseH, responseI] = await Promise.all([
        api.get('/afconditions'),
        api.get('/kgconditions'),
        api.get('/tsconditions'),
        api.get('/hconditions'),
        api.get('/iconditions'),
      ]);

      setAFConditionOptions(responseAF.data || []);
      setKGConditionOptions(responseKG.data || []);
      setTSConditionOptions(responseTS.data || []);
      setHConditionOptions(responseH.data || []);
      setIConditionOptions(responseI.data || []);
    } catch (error) {
      console.error('Error fetching conditions:', error);
      setError('Gagal memuat data kondisi.');
    }
  }, []);

  useEffect(() => {
    fetchConditions();
  }, [fetchConditions]);

  const calculateIMT = () => {
    if (beratBadan && tinggiBadan) {
      const heightInMeters = tinggiBadan / 100; // Convert cm to m
      const imtValue = beratBadan / (heightInMeters * heightInMeters);
      setIMT(imtValue.toFixed(2)); // Save IMT with two decimals
      determineICondition(imtValue); // Determine iCondition based on IMT
    } else {
      setIMT(null); // Reset if no input
      setIConditionId(''); // Reset iCondition
    }
  };

  const determineICondition = (imtValue) => {
    if (imtValue < 17) {
      setIConditionId('Sangat Kurus'); // Underweight
    } else if (imtValue >= 17.0 && imtValue <= 18.4) {
      setIConditionId('Kurus'); // Normal weight
    } else if (imtValue >= 18.5 && imtValue <= 25.0) {
      setIConditionId('Ideal'); // Overweight
    } else if (imtValue >= 25.1 && imtValue <= 27.0) {
      setIConditionId('Gemuk');
    } else {
      setIConditionId('Obesitas'); // Obesity
    }
  };

  useEffect(() => {
    calculateIMT(); // Calculate IMT whenever weight or height changes
  }, [beratBadan, tinggiBadan]);

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) throw new Error('Refresh token tidak ditemukan.');

      const response = await api.post('/refresh-token', { refreshToken });

      const { token, newRefreshToken } = response.data;

      localStorage.setItem('authToken', token);
      localStorage.setItem('refreshToken', newRefreshToken);

      return token;
    } catch (error) {
      console.error('Error refreshing token:', error);
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      navigate('/login');
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!beratBadan || !tinggiBadan || !usia || !jenisKelamin || !statusAktivitasFisik || !kadarGulaDarah || !tingkatStress || !hbA1c) {
      setError('Semua field harus diisi.');
      return;
    }

    let token = localStorage.getItem('authToken');

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        token = await refreshToken();
      }

      const userId = decodedToken.id;

      if (!userId) {
        throw new Error('User ID tidak ditemukan dalam token.');
      }

      const dataKonsultasi = {
        weight: parseFloat(beratBadan),
        height: parseFloat(tinggiBadan),
        age: parseInt(usia, 10),
        gender: jenisKelamin,
        activityLevelId: statusAktivitasFisik,
        bloodSugarId: kadarGulaDarah,
        stressLevelId: tingkatStress,
        hba1cId: hbA1c,
        imtId: iConditionId,
        user_id: userId,
      };

      const response = await api.post('/consultations', dataKonsultasi, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.error) {
        setError(response.data.error);
      } else {
        setConsultation(response.data);
        setShowResultModal(true);
      }
    } catch (error) {
      console.error('Error adding consultation:', error.response ? error.response.data : error.message);
      setError('Gagal menambahkan konsultasi. Periksa console untuk detail kesalahan.');
    }
  };

  const handleShowRecommendations = () => {
    setShowRecommendations(true);
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

  <div className="p-4 max-w-3xl mx-auto bg-white rounded shadow-md overflow-auto max-h-[80vh] w-1/4">
    <h1 className="text-2xl font-semibold mb-4">Formulir Konsultasi</h1>
    <form onSubmit={handleSubmit}>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label className="block text-gray-700">Berat Badan (kg):</label>
        <input
          type="number"
          value={beratBadan}
          onChange={(e) => setBeratBadan(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Tinggi Badan (cm):</label>
        <input
          type="number"
          value={tinggiBadan}
          onChange={(e) => setTinggiBadan(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      {/* Display IMT result */}
      {imt !== null && (
        <div className="mb-4">
          <label className="block mb-2">Hasil Indeks Massa Tubuh</label>
          <div className="p-2 border border-gray-300 rounded bg-gray-100">
            {imt} (kg/m²)
          </div>
        </div>
      )}

      {/* Display iCondition */}
      {iConditionId && (
        <div className="mb-4">
          <label className="block mb-2">Kategori IMT</label>
          <div className="p-2 border border-gray-300 rounded bg-gray-100">
            {iConditionId}
          </div>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700">Usia:</label>
        <input
          type="number"
          value={usia}
          onChange={(e) => setUsia(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Jenis Kelamin:</label>
        <select
          value={jenisKelamin}
          onChange={(e) => setJenisKelamin(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="">Pilih Jenis Kelamin</option>
          <option value="Laki-laki">Laki-laki</option>
          <option value="Perempuan">Perempuan</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Tingkat Aktivitas Fisik:</label>
        <select
          value={statusAktivitasFisik}
          onChange={(e) => setAFConditionId(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="">Pilih Tingkat Aktivitas</option>
          {afConditionOptions.map((option) => (
            <option key={option.id} value={option.id}>{option.category}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Tingkat Gula Darah:</label>
        <select
          value={kadarGulaDarah}
          onChange={(e) => setKGConditionId(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="">Pilih Tingkat Gula Darah</option>
          {kgConditionOptions.map((option) => (
            <option key={option.id} value={option.id}>{option.category}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Tingkat Stres:</label>
        <select
          value={tingkatStress}
          onChange={(e) => setTSConditionId(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="">Pilih Tingkat Stres</option>
          {tsConditionOptions.map((option) => (
            <option key={option.id} value={option.id}>{option.category}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Tingkat HbA1c:</label>
        <select
          value={hbA1c}
          onChange={(e) => setHConditionId(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="">Pilih Tingkat HbA1c</option>
          {hConditionOptions.map((option) => (
            <option key={option.id} value={option.id}>{option.category}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 mr-8">Kirim Konsultasi</button>
      <button type="button" onClick={onRequestClose} className="bg-red-500 text-white py-2 px-4 rounded">
                Batal
              </button>
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
        <div className="p-4 max-w-lg mx-auto bg-white rounded shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Hasil Konsultasi</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {consultation && (
            <>
             <div className="grid grid-cols-1 gap-4">
        <div className="border-b pb-2">
          <p className="font-medium"><strong>Berat Badan:</strong> {consultation.data.beratBadan} kg</p>
        </div>
        <div className="border-b pb-2">
          <p className="font-medium"><strong>Tinggi Badan:</strong> {consultation.data.tinggiBadan} cm</p>
        </div>
        <div className="border-b pb-2">
          <p className="font-medium"><strong>Umur:</strong> {consultation.data.umur} tahun</p>
        </div>
        <div className="border-b pb-2">
          <p className="font-medium"><strong>Jenis Kelamin:</strong> {consultation.data.jenisKelamin}</p>
        </div>
        <div className="border-b pb-2">
          <p className="font-medium"><strong>Status Aktivitas Fisik:</strong> {consultation.data.statusAktivitasFisik}</p>
        </div>
        <div className="border-b pb-2">
          <p className="font-medium"><strong>Kadar Gula Darah:</strong> {consultation.data.kadarGulaDarah}</p>
        </div>
        <div className="border-b pb-2">
          <p className="font-medium"><strong>HbA1c:</strong> {consultation.data.hbA1c}</p>
        </div>
        <div className="border-b pb-2">
          <p className="font-medium"><strong>Tingkat Stres:</strong> {consultation.data.tingkatStress}</p>
        </div>
        <div className="border-b pb-2">
          <p className="font-medium"><strong>BMI:</strong> {consultation.data.BMI}</p>
        </div>
        <div>
          <p className="font-medium"><strong>Jumlah Kalori yang Dibutuhkan:</strong> {consultation.data.jumlahKalori} kalori</p>
        </div>
      </div>
            </>
          )}
          <button
            onClick={handleShowRecommendations}
            className="bg-green-500 text-white p-2 rounded mt-4 hover:bg-green-600 mr-5" // Added margin-right
          >
            Rekomendasi Makanan
          </button>
          <button
            onClick={() => setShowResultModal(false)}
            className="bg-red-500 text-white justify-end p-2 rounded mt-4 hover:bg-red-600"
          >
            Tutup
          </button>
        </div>
      </Modal>

      {showRecommendations && (
  <Modal
    isOpen={showRecommendations}
    onRequestClose={() => setShowRecommendations(false)}
    contentLabel="Rekomendasi Makanan"
    className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
    overlayClassName="fixed inset-0 bg-black bg-opacity-50"
  >
    <div className="p-4 max-w-lg mx-auto bg-white rounded shadow-md max-h-[80vh] overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-4">Rekomendasi Makanan</h2>
      <ul>
        {consultation.foodRecommendations.map((item, index) => (
          <li key={index} className="mb-4 border-b pb-2">
            <p><strong>Nama:</strong> {item.name}</p>
            <p><strong>Kalori:</strong> {item.calories} kalori</p>
            <p><strong>Protein:</strong> {item.protein} g</p>
            <p><strong>Fat:</strong> {item.fat} g</p>
            <p><strong>Berat:</strong> {item.weight} g</p>
            <p><strong>Porsi:</strong> {item.porsi}</p>
            <p><strong>Waktu:</strong> {item.time}</p>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setShowRecommendations(false)}
        className="bg-red-500 text-white p-2 rounded mt-4 hover:bg-red-600"
      >
        Tutup
      </button>
    </div>
  </Modal>
)}


      </div>
    
  );
};

export default ConsultationForm;
