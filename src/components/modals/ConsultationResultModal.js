import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');  // Ensure that the modal is accessible

const ConsultationResultModal = ({ isOpen, onClose, consultationData }) => {
    const [showRecommendations, setShowRecommendations] = useState(false);

    // Debugging log
    console.log('Consultation Data:', consultationData);

    if (!consultationData) return null;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Hasil Konsultasi"
            className="modal"
            overlayClassName="overlay"
            shouldCloseOnOverlayClick={true} // Allows closing the modal by clicking outside
            shouldCloseOnEsc={true} // Allows closing the modal with the ESC key
        >
            <h2 className="text-xl font-bold mb-4">Hasil Konsultasi</h2>
            <div className="mb-4">
                <h3 className="text-lg font-semibold">Hasil</h3>
                <p>{consultationData.result || 'Data hasil tidak tersedia.'}</p>
            </div>
            <button
                onClick={() => setShowRecommendations(!showRecommendations)}
                className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
            >
                {showRecommendations ? 'Sembunyikan Rekomendasi Makanan' : 'Lihat Rekomendasi Makanan'}
            </button>
            {showRecommendations && (
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Rekomendasi Makanan</h3>
                    {Array.isArray(consultationData.foodRecommendations) && consultationData.foodRecommendations.length > 0 ? (
                        <ul>
                            {consultationData.foodRecommendations.map((food, index) => (
                                <li key={index}>{food.name}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>Rekomendasi makanan tidak tersedia.</p>
                    )}
                </div>
            )}
            <button
                onClick={onClose}
                className="bg-gray-500 text-white py-2 px-4 rounded"
            >
                Tutup
            </button>
        </Modal>
    );
};

export default ConsultationResultModal;
