import React, { useState } from 'react';
import SideBar from './SideBar';
import cameraImg from '../images/camera.png';
import userPhoto from '../images/user.png';

const EditProfile = () => {
  const saveEdit = () => {
    alert('Edit has been saved');
  };

  const [coverPhoto, setCoverPhoto] = useState();
  const [profilePic, setProfilePic] = useState();
  const [coverDisplay, setCoverDisplay] = useState();
  const [profilePicDisplay, setProfilePicDisplay] = useState();

  const imageChange = (event) => {
    const { files, id } = event.target;
    const imageUrl = URL.createObjectURL(files[0]);
    if (id === 'coverPhoto') {
      setCoverDisplay(imageUrl);
      setCoverPhoto(files[0]);
    } else {
      setProfilePicDisplay(imageUrl);
      setProfilePic(files[0]);
    }
  };

  return (
    <section>
      <div>
        <span className="flex justify-between p-2">
          <h1 className="text-2xl font-bold px-2 py-2"> Edit profile </h1>
          <button
            onClick={saveEdit}
            className="bg-blue-500 px-8 py-2 rounded-full text-white text-lg font-bold hover:bg-blue-600 active:bg-blue-900"
          >
            Save
          </button>
        </span>
      </div>

      <div className="p-4 flex flex-col items-center justify-center">
        <label
          htmlFor="coverPhoto"
          className="flex items-center justify-center h-64 w-full bg-slate-200 "
        >
          {coverDisplay ? (
            <img
              src={coverDisplay}
              alt="Cover photo"
              className="w-full h-full"
            />
          ) : (
            <div>
              <img src={cameraImg} alt="" className="w-32 h-[45%]" />
              <p> Add a cover photo + </p>
            </div>
          )}
          <input
            type="file"
            name="coverPhoto"
            id="coverPhoto"
            onChange={imageChange}
            className="hidden"
          />
        </label>

        <label
          htmlFor="profilePic"
          className="flex  h-20 w-20 rounded-full relative right-36 -top-10 p-1"
        >
          {profilePicDisplay ? (
            <img
              src={profilePicDisplay}
              alt="Profile picture"
              className="w-full h-full rounded-full"
            />
          ) : (
            <div className="relative">
              <img src={userPhoto} alt="profile picture" />
              <span className="absolute top-12 left-12 font-bold text-3xl bg-blue-500 rounded-full h-7 w-7 text-center text-white flex items-center justify-center pb-1">
                +
              </span>
            </div>
          )}
          <input
            type="file"
            name="profilePic"
            id="profilePic"
            onChange={imageChange}
            className="hidden"
          />
        </label>

        <input
          type="text"
          name="name"
          placeholder="Edit your profile name"
          className="text-center border-2 border-slate-600 p-2 w-full rounded-lg outline-none my-2 focus:border-blue-500 sm:w-80"
        />
        <input
          type="text"
          name="bio"
          placeholder="Edit your bio"
          className="text-center border-2 border-slate-600 p-2 w-full mt-12 rounded-lg outline-none my-2 focus:border-blue-500 sm:w-80"
        />
      </div>
    </section>
  );
};

export default EditProfile;
