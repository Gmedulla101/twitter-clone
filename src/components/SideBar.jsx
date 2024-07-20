import React, { useState } from 'react';

//IMPORTING ROUTING DEPENDENCIES
import { Link } from 'react-router-dom';

//IMPORTING GLOBAL CONTEXT
import { useGlobalContext } from '../context';

//IMPORTING ASSETS
import Logo from './Logo';
import logo from '../images/twitter.png';
import homeBtn from '../images/home.png';
import searchBtn from '../images/search.png';
import notiBtn from '../images/bell.png';
import profileBtn from '../images/profile.png';
import newTweetBtn from '../images/feather.png';
import burgerBtn from '../images/menu.png';
import close from '../images/close.png';

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//MAIN COMPONENT BODY

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside
      className={`border-2 border-slate-200 ${
        isOpen ? 'w-12' : 'w-[3em]'
      } h-full fixed w-96 bg-white z-[100] overflow-hidden transition-all duration-300 md:overflow-visible md:w-64 md:bg-white`}
    >
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="ml-2 mt-3 w-8 md:hidden"
      >
        <img src={isOpen ? close : burgerBtn} alt="" className="w-full" />
      </button>

      <div
        className={`${
          isOpen ? 'flex' : 'hidden'
        } flex-col gap-12 mt-12 p-5 md:flex`}
      >
        <Link to={'/'} className="flex items-center">
          <img
            src={homeBtn}
            alt=""
            className="w-12 cursor-pointer p-2 rounded-full hover:bg-blue-500"
          />
          <p className="font-bold text-2xl"> Home </p>
        </Link>{' '}
        {/*     <img
          src={searchBtn}
          alt=""
          className="w-12 cursor-pointer p-1 rounded-full hover:bg-blue-500"
        /> */}
        {/*   <img
          src={notiBtn}
          alt=""
          className="w-12 cursor-pointer p-2 rounded-full hover:bg-blue-500"
        />  */}
        <Link to={'/user-profile'} className="flex items-center">
          <img
            src={profileBtn}
            alt=""
            className="w-12 cursor-pointer p-2 rounded-full hover:bg-blue-500"
          />
          <p className="text-2xl font-bold">Profile</p>
        </Link>{' '}
        <Link to={'/'} className="block mx-auto">
          <img
            src={newTweetBtn}
            alt=""
            className="w-14 cursor-pointer p-2 rounded-full bg-blue-500 "
          />
        </Link>
      </div>
    </aside>
  );
}
