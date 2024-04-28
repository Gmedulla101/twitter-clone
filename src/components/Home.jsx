import React from 'react'
//IMPORTING RELEVANT COMPONENTS
import Logo from './Logo'
import logo from '../images/twitter.png'

//IMPORTING CUSTOM HOOKS
import { useGlobalContext } from '../context'


//IMPORTING ROUTING DEPENDENCIES
import { Link } from 'react-router-dom'

const Home = () => {
    const [isSignedIn, setIsSignedIn] = useGlobalContext();
    console.log(isSignedIn)
  return (
    <>
    <Logo logo={logo}/>
       {isSignedIn ||  <div className='signInBar h-18 bg-blue-500 absolute w-full top-full text-white flex justify-between items-center px-6'>
            <div className='ssm: hidden sm:block'>
            <h3 className='font-bold'> Don't miss what's happening </h3>
            <p> The people on X are the first to know </p>
            </div>


            <div className='flex justify-around p-4 ssm: w-full sm:w-1/3 sm:gap-2 xl:w-1/4'>
              <Link to={'/create-account'}>   <button className='border-[1px] border-white rounded-3xl font-bold px-4 py-2 w-32 hover:bg-white hover:text-blue-500'> Sign In </button> </Link>
                <Link to={'/sign-up'}> <button className='bg-white text-black rounded-3xl px-4 py-2 font-bold hover:text-blue-500 w-32'> Sign Up </button> </Link>
            </div>
        </div>}
    </>
  )
}

export default Home