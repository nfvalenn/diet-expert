import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/modals/AdminLayout';
import StatsCard from '../components/modals/StatsCard';
import { FaUsers, FaClipboardList, FaCheckCircle, FaTimesCircle, FaChartLine, FaClipboardCheck, FaFileAlt, FaUserMd } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboardPage = () => {
  const [userCount, setUserCount] = useState(0);
  const [consultationCount, setConsultationCount] = useState(0);
  const [completedConsultations, setCompletedConsultations] = useState(0);
  const [pendingConsultations, setPendingConsultations] = useState(0);
  const [canceledConsultations, setCanceledConsultations] = useState(0);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalArticles, setTotalArticles] = useState(0);
  const [consultationData, setConsultationData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Total Consultations',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      try {
        const userResponse = await fetch('http://localhost:5001/api/users', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUserCount(userData.count);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard title="Total Users" value={userCount} icon={<FaUsers />} />
        <StatsCard title="Total Aturan" value="50" icon={<FaCheckCircle />} />
        <StatsCard title="Total Kondisi" value="5" icon={<FaTimesCircle />} />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
