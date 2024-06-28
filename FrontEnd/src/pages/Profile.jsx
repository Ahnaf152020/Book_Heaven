import React from 'react';

const Profile = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8 bg-gray-100">
      <div className="w-full px-8 py-5 bg-blue-800 rounded-lg md:w-3/6 lg:w-2/6">
        <p className="mb-6 text-2xl text-center text-zinc-200">Profile</p>
        <div className="mb-4">
          <label className="block text-zinc-400">Username</label>
          <p className="p-2 rounded bg-zinc-900 text-zinc-100">JohnDoe</p>
        </div>
        <div className="mb-4">
          <label className="block text-zinc-400">Email</label>
          <p className="p-2 rounded bg-zinc-900 text-zinc-100">johndoe@gmail.com</p>
        </div>
        <div className="mb-4">
          <label className="block text-zinc-400">Address</label>
          <p className="p-2 rounded bg-zinc-900 text-zinc-100">1234 Main St, Springfield, IL</p>
        </div>
        <div className="flex justify-between">
          <button className="p-2 text-white transition-all duration-300 bg-blue-500 rounded hover:bg-blue-600">
            Edit Profile
          </button>
          <button className="p-2 text-white transition-all duration-300 bg-red-500 rounded hover:bg-red-600">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
