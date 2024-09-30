// src/pages/UserProfilePage.jsx
import React, { useEffect, useState } from 'react';
import apiClient from '../services/api'; // Jalur impor yang benar
import EditProfileModal from '../components/modals/EditProfileUserModal'; // Impor komponen modal
import UserNavbar from '../components/NavbarUser'; // Impor komponen navbar

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null); // Menambahkan state untuk pesan status

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiClient.get('/users/profile'); // Pastikan ini sesuai dengan rute backend Anda
        setUser(response.data);
      } catch (error) {
        setError('Gagal memuat data pengguna');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = (updatedUserData) => {
    setUser(updatedUserData);
    setStatusMessage('Pembaruan profil berhasil!'); // Menambahkan pesan status
    setTimeout(() => setStatusMessage(null), 3000); // Menghapus pesan status setelah 3 detik
  };

  // Fungsi untuk menampilkan placeholder untuk password
  const displayPassword = () => {
    return user.password ? '**********' : 'Tidak ada password yang diatur';
  };

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="text-center mt-4 text-red-600">{error}</div>;

  return (
    <div className="flex min-h-screen flex-col">
      <UserNavbar />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-3xl">
          <h1 className="text-2xl font-bold mb-4">Profil</h1>
          {statusMessage && (
            <div className="mb-4 p-3 bg-green-100 text-green-800 border border-green-300 rounded">
              {statusMessage}
            </div>
          )}
          {user ? (
            <div>
              <div className="mb-4">
                <strong className="text-gray-600">Username:</strong>
                <p className="text-lg">{user.username}</p>
              </div>
              <div className="mb-4">
                <strong className="text-gray-600">Email:</strong>
                <p className="text-lg">{user.email}</p>
              </div>
              <div className="mb-4">
                <strong className="text-gray-600">Password:</strong>
                <p className="text-lg">{displayPassword()}</p>
              </div>
              {/* Tambahkan lebih banyak field jika diperlukan */}
              <button
                onClick={() => setModalOpen(true)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <div>Data pengguna tidak tersedia.</div>
          )}
        </div>
      </div>

      {/* Modal Component */}
      <EditProfileModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        userData={user}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default UserProfilePage;
