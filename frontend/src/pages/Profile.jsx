// import React, { useEffect, useState } from "react";

// const Profile = () => {
//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     photo: "",
//   });

//   useEffect(() => {
//     const savedUser = JSON.parse(localStorage.getItem("dreamhubUser"));
//     if (savedUser) setUser(savedUser);
//   }, []);

//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const imageUrl = URL.createObjectURL(file);

//     const updatedUser = { ...user, photo: imageUrl };
//     setUser(updatedUser);
//     localStorage.setItem("dreamhubUser", JSON.stringify(updatedUser));
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow mt-6 ">
//       <h2 className="text-xl font-bold mb-4 text-center">👤 My Profile</h2>

//       <div className="text-center mb-4">
//         <img
//           src={user.photo || "/default-avatar.jpeg"}
//           alt="profile"
//           className="w-28 h-28 rounded-full mx-auto object-cover border"
//         />

//         <label className="block mt-3 text-sm text-indigo-600 cursor-pointer">
//           Change photo
//           <input type="file" accept="image/*" hidden onChange={handlePhotoChange} />
//         </label>
//       </div>

//       <p><b>Name:</b> {user.name || "Not set"}</p>
//       <p><b>Email:</b> {user.email || "Not set"}</p>

//       <button
//         onClick={() => {
//           localStorage.removeItem("dreamhubUser");
//           localStorage.removeItem("token");
//           window.location.href = "/login";
//         }}
//         className="mt-4 w-full bg-red-500 text-white py-2 rounded"
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Profile;



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
    <div className="max-w-md w-full mx-auto p-5 sm:p-6 bg-white rounded-2xl shadow-lg mt-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">
        👤 My Profile
      </h2>

      <div className="text-center mb-6">
        {/* <img
          src={user.photo || "/default-avatar.jpeg"}
          alt="profile"
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full mx-auto object-cover border-4 border-indigo-200 shadow"
        /> */}
{/* <img
  src={
    user.photo && !user.photo.startsWith("blob:")
      ? user.photo
      : "/default-avatar.jpeg"
  }
  alt="profile"
  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full mx-auto object-cover border"
/> */}
<img
  src={
    user.photo &&
    typeof user.photo === "string" &&
    user.photo.startsWith("data:image")
      ? user.photo
      : "/default-avatar.jpeg"
  }
  alt="profile"
  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full mx-auto object-cover border-4 border-indigo-400 shadow"
/>

        <label className="block mt-4 text-sm sm:text-base text-indigo-600 font-medium cursor-pointer hover:underline">
          Change photo
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handlePhotoChange}
          />
        </label>
      </div>

      <div className="space-y-2 text-sm sm:text-base">
        <p className="break-words">
          <b>Name:</b> {user.name || "Not set"}
        </p>
        <p className="break-words">
          <b>Email:</b> {user.email || "Not set"}
        </p>
      </div>

      <button
        onClick={() => {
          localStorage.removeItem("dreamhubUser");
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
        className="mt-6 w-full bg-red-500 hover:bg-red-600 transition text-white py-2.5 rounded-md font-medium"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
