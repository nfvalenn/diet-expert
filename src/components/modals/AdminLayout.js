// src/components/AdminLayout.js
import React from 'react';
import Sidebar from './Sidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar isAdmin={true} /> {/* Set isAdmin to true for admin layout */}
      <main className="flex-1 p-8 bg-gray-100">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
