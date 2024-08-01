import React from 'react';
import AdminLayout from '../components/modals/AdminLayout';
import StatsCard from '../components/modals/StatsCard';
import DataTable from '../components/modals/DataTable';
import { FaUsers, FaChartLine, FaClipboardList } from 'react-icons/fa';

const data = [
  { Name: 'John Doe', Email: 'john@example.com', Role: 'User' },
  { Name: 'Jane Smith', Email: 'jane@example.com', Role: 'Admin' },
  // Additional data
];

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold mb-6 text-gray-700">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatsCard title="Total Users" value="100" icon={<FaUsers />} />
        <StatsCard title="Daily Visits" value="1,200" icon={<FaChartLine />} />
        <StatsCard title="Total Consultations" value="500" icon={<FaClipboardList />} />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">User Data</h3>
        <DataTable data={data} />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
