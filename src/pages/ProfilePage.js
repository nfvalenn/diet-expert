import React from 'react';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Profile</h2>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default ProfilePage;
