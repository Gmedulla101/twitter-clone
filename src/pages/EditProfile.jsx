import React, { useState } from 'react';
import SideBar from '../components/SideBar';
import cameraImg from '../images/camera.png';
import userPhoto from '../images/user.png';

//IMPORTING FIREBASE DEPENDENCIES
import { auth, db } from '../config/firebase';
import { updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '../config/firebase';

//IMPORTING REACT ROUTER NAVIGATE
import { useNavigate } from 'react-router-dom';

//IMPORTING GLOBAL CONTEXT
import { useGlobalContext } from '../context/context';

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//MAIN COMPONENT BODY

const EditProfile = () => {
  const { user, isSignedIn, setUser, setIsSignedIn } = useGlobalContext();

  //IMAGE FUNCTIONALITY

  const [photo, setPhoto] = useState({
    coverPhoto: null,
    profilePic: null,
  });
  const [coverDisplay, setCoverDisplay] = useState();
  const [profilePicDisplay, setProfilePicDisplay] = useState();

  //LOGIC FOR THE IMAGE CHANGE AND IMAGE DISPLAY
  const imageChange = (event) => {
    const { files, id } = event.target;
    const imageUrl = URL.createObjectURL(files[0]);
    if (id === 'coverPhoto') {
      setCoverDisplay(imageUrl);
      setPhoto((prevPhoto) => {
        return { ...photo, coverPhoto: files[0] };
      });
    } else {
      setProfilePicDisplay(imageUrl);
      setPhoto((prevPhoto) => {
        return { ...photo, profilePic: files[0] };
      });
    }
  };

  //TEXT FUNCTIONALITY
  const [profileDetails, setProfileDetails] = useState({
    bio: '',
  });
  const textChange = (event) => {
    const { value, name } = event.target;
    setProfileDetails((details) => {
      return { ...details, [name]: value };
    });
  };

  //UPDATING FUNCTIONALITY
  const navigate = useNavigate();

  const updatePhotos = async () => {
    if (!photo.coverPhoto || !photo.profilePic) {
      alert('Please add photographs to your profile edit!');
    } else {
      const profilePicFolderRef = ref(
        storage,
        `user-images/${user.username}/profilePic/${photo.profilePic.name}`
      );
      const coverPhtotFolderRef = ref(
        storage,
        `user-images/${user.username}/coverPhoto/${photo.coverPhoto.name}`
      );
      try {
        await uploadBytes(profilePicFolderRef, photo.profilePic);
        await uploadBytes(coverPhtotFolderRef, photo.coverPhoto);
        console.log('Subkkitted!');
      } catch (error) {
        console.error(error);
      }
    }
  };

  console.log(user);

  const saveEdit = async () => {
    const userDoc = doc(db, 'users', user.id);
    try {
      //TARGETGIN EDGE CASES
      if (profileDetails.bio === '') {
        await updateDoc(userDoc, { bio: user.bio });
      }

      await updateDoc(userDoc, { bio: profileDetails.bio });
      const newUserData = { ...user, bio: profileDetails.bio };
      localStorage.setItem('user', JSON.stringify(newUserData));

      updatePhotos();
      console.log('okay!!!!!!!');

      navigate('/user-profile');
    } catch (error) {
      console.error(error);
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

        {/*   
      FUNCTIONALITY FOR NAME CHANGE WILL BE ADDED LATER
    <input
          type="text"
          name="name"
          placeholder="Edit your profile name"
          className="text-center border-2 border-slate-600 p-2 w-full rounded-lg outline-none my-2 focus:border-blue-500 sm:w-80"
          onChange={textChange}
        /> */}
        <input
          type="text"
          name="bio"
          placeholder="Edit your bio"
          className="text-center border-2 border-slate-600 p-2 w-full mt-12 rounded-lg outline-none my-2 focus:border-blue-500 sm:w-80"
          onChange={textChange}
        />
      </div>
    </section>
  );
};

export default EditProfile;
