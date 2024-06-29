import React from 'react';

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

export default function SideBar() {
  const { isSignedIn, setIsSignedIn, user } = useGlobalContext();

  return (
    <aside className="border-2 border-slate-200 w-12 h-full fixed flex flex-col items-center">
      <Logo logo={logo} />
      <div className="flex flex-col gap-12 items-center">
        <Link to={'/'}>
          <img
            src={homeBtn}
            alt=""
            className="w-12 cursor-pointer p-2 rounded-full hover:bg-blue-500"
          />
        </Link>
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
        <Link to={'/user-profile'}>
          <img
            src={profileBtn}
            alt=""
            className="w-12 cursor-pointer p-2 rounded-full hover:bg-blue-500"
          />
        </Link>
        <Link to={'/'}>
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
