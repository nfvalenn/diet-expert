import React, { useState } from 'react';

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    // Data profil lainnya
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logika untuk memperbarui profil
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-4">
        <label className="block mb-2">Name</label>
        <input
          type="text"
          name="name"
          className="border p-2 w-full rounded-md"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Email</label>
        <input
          type="email"
          name="email"
          className="border p-2 w-full rounded-md"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="bg-violet-400 text-white p-2 rounded-md">Save</button>
    </form>
  );
};

export default ProfileForm;
