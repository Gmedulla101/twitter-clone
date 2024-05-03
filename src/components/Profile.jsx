import React from 'react';

//IMPORTING RELEVANT COMPONENTS
import SideBar from './SideBar';

//IMPORTING GLOBAL CONTEXT
import { useGlobalContext } from '../context';

const Profile = () => {
  return (
    <section>
      <SideBar />

      <section className="ml-20 h-full">
        <h1 className="text-2xl font-bold px-2 py-2"> Profile </h1>
        <div className="border-2 border-red-400 h-64">
          <img src="" alt="" />
        </div>
        <div className="border-2 border-red-400 w-20 h-20 rounded-full relative top-[-40px] ml-6">
          <img src="" alt="" />
        </div>
      </section>
    </section>
  );
};

export default Profile;
