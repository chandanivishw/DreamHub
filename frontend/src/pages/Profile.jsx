import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    photo: "",
  });

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("dreamhubUser"));
    if (savedUser) setUser(savedUser);
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Image = reader.result;

      const updatedUser = { ...user, photo: base64Image };
      setUser(updatedUser);
      localStorage.setItem("dreamhubUser", JSON.stringify(updatedUser));
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-md w-full mx-auto p-5 sm:p-6 
  bg-white dark:bg-gray-900 
  rounded-2xl shadow-lg mt-6 dark:shadow-gray-800">

      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center 
    text-gray-900 dark:text-white">
        👤 My Profile
      </h2>

      <div className="text-center mb-6">
        <img
          src={
            user.photo &&
              typeof user.photo === "string" &&
              user.photo.startsWith("data:image")
              ? user.photo
              : "/default-avatar.jpeg"
          }
          alt="profile"
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full mx-auto 
      object-cover border 
      border-gray-300 dark:border-gray-600"
        />

        <label className="block mt-4 text-sm sm:text-base 
      text-indigo-600 dark:text-indigo-400 
      font-medium cursor-pointer hover:underline">
          Change photo
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handlePhotoChange}
          />
        </label>
      </div>

      <div className="space-y-2 text-sm sm:text-base 
    text-gray-800 dark:text-gray-300">
        <p className="break-words">
          <b className="text-gray-900 dark:text-white">Name:</b> {user.name || "Not set"}
        </p>
        <p className="break-words">
          <b className="text-gray-900 dark:text-white">Email:</b> {user.email || "Not set"}
        </p>
      </div>

      <button
        onClick={() => {
          localStorage.removeItem("dreamhubUser");
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
        className="mt-6 w-full 
    bg-red-500 hover:bg-red-600 
    dark:bg-red-600 dark:hover:bg-red-700 
    transition text-white py-2.5 rounded-md font-medium"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;