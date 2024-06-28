
import React from 'react';

const ChangePassword = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8 bg-gray-300">
      <div className="w-full px-8 py-5 bg-blue-800 rounded-lg md:w-3/6 lg:w-2/6">
        <p className="mb-6 text-2xl text-center text-zinc-200">Change Password</p>
        <form>
          <div className="mb-4">
            <label htmlFor="current-password" className="block text-zinc-400">
              Current Password
            </label>
            <input
              type="password"
              id="current-password"
              className="w-full p-2 mt-2 rounded outline-none bg-zinc-900 text-zinc-100"
              placeholder="Current password"
              name="current-password"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="new-password" className="block text-zinc-400">
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              className="w-full p-2 mt-2 rounded outline-none bg-zinc-900 text-zinc-100"
              placeholder="New password"
              name="new-password"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirm-password" className="block text-zinc-400">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirm-password"
              className="w-full p-2 mt-2 rounded outline-none bg-zinc-900 text-zinc-100"
              placeholder="Confirm new password"
              name="confirm-password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 mt-6 text-white transition-all duration-300 bg-blue-500 rounded hover:bg-blue-600"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
