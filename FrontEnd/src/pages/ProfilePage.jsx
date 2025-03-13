import { User, Mail, Camera } from 'lucide-react';
import React, { useState } from 'react';
import avatar from '../assets/avatar.jpg';
import { useAuthStore } from '../store/useAuthStore';
import { toast } from 'react-toastify';

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [fullName, setFullName] = useState(authUser?.fullName || '');
  const [email, setEmail] = useState(authUser?.email || '');

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.readAsDataURL(file);
  
    reader.onload = async () => {
      const base64Image = reader.result;
      
      // Call the update profile API
      await updateProfile({
        profilePic: base64Image
      });
    };
  };
  

  const handleSaveChanges = async () => {
    await updateProfile({ fullName, email });
  };

  return (
    <div className='flex flex-col items-center justify-center py-2 bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen px-4'>
      <div className='flex flex-col gap-6 bg-base-300 shadow-xl rounded-xl p-6 w-full max-w-xl text-center'>
        <h2 className='text-3xl font-bold'>Profile</h2>
        <p className='text-gray-500'>Update your profile information</p>

        <div className='flex flex-col items-center gap-4'>
          <div className='relative'>
            <img
              src={selectedImg || authUser.profilePic || avatar}
              alt='Profile'
              className='size-32 rounded-full object-cover border-4 border-blue-500 shadow-lg'
            />
            <label htmlFor='avatar-upload' className={`absolute bottom-1 right-1 bg-blue-500 p-2 rounded-full cursor-pointer transition-all duration-300 transform hover:scale-105 ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}>
              <Camera className='w-5 h-5 text-white' />
              <input
                type='file'
                id='avatar-upload'
                className='hidden'
                accept='image/*'
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <p className='text-sm text-gray-400'>{isUpdatingProfile ? "Uploading photo..." : "Click the camera icon to update your photo"}</p>
        </div>

        <div className='w-full flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <label className='text-gray-500 flex items-center gap-2'>
              <User className='size-4 text-blue-500' />
              Full Name
            </label>
            <input
              type='text'
              className='w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-gray-500 flex items-center gap-2'>
              <Mail className='size-4 text-blue-500' />
              Email
            </label>
            <input
              type='text'
              className='w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <button
          className='bg-blue-500 text-white py-2 px-6 rounded-lg mt-4 transition-all duration-300 hover:bg-blue-600 disabled:bg-gray-400 shadow-md'
          onClick={handleSaveChanges}
          disabled={isUpdatingProfile}
        >
          {isUpdatingProfile ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className='flex flex-col gap-3 bg-base-300 shadow-md rounded-xl p-5 w-full max-w-xl mt-6'>
        <h2 className='text-gray-600 font-semibold'>Account Information</h2>
        <p className='text-gray-400 text-sm'>Member Since: <span className='text-gray-600'>2023</span></p>
        <div className='flex justify-between text-gray-600'>
          <p>Account Status</p>
          <span className='text-green-500 font-semibold'>Active</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;