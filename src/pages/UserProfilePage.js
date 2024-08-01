import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ProfileForm from '../components/ProfileForm';

const ProfilePage = () => {
  return (
    <div className="flex">
      <Sidebar isAdmin={false} />
      <div className="flex-1 bg-gray-100">
        <Header />
        <main className="p-4">
          <h2 className="text-3xl font-bold mb-6 text-gray-700">Profile</h2>
          <ProfileForm />
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
