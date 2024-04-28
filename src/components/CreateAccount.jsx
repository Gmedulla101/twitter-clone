import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context';

//IMPORTING AUTHENTICATION DEPENDENCIES
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

//IMPORTING RELEVANT COMPONENTS
import Logo from './Logo';
import logo from '../images/twitter.png'

const CreateAccount = () => {
    const [signInData, setSignInData] = useState({
        email: '',
        password: ''
    })

    //UTILISING GLOBAL CONTEXT CUSTOM HOOK
    const [isSignedIn, setIsSignedIn] = useGlobalContext();

    //UTILISIING USENAVIGATE HOOK
    const navigate = useNavigate()

    const handleChange = (e) => {
        setSignInData((prevData) => {
            return ({
                ...prevData,
                [e.target.name]: e.target.value
            })
        })
    }

    const handleSubmit = async () => {
       try {
        await createUserWithEmailAndPassword(auth, signInData.email, signInData.password);
        setIsSignedIn(true);
        console.log('Submitted!')
       } catch (error) {
        console.error(error)
       }
        navigate('/')
    }

  return (
<div className='w-[90%] mx-auto my-9 rounded-lg sm:shadow-3xl sm:pt-2 sm:pb-4 lg:w-[80%] lg:py-9'>
<Logo logo = {logo}/>
    <div className=' flex flex-col w-10/12 mx-auto py-3 items-center'>

        <h1 className='font-bold text-2xl mb-7'> Create your account with your email and password </h1>

        <input type="email" placeholder='Enter your email...' required name='email' value={signInData.email} onChange={handleChange} className='border-2 border-slate-600 p-2 rounded-lg outline-none my-2 focus:border-blue-500 sm:w-80'/>
        
        <input type="text" placeholder='Password...' name='password' value={signInData.password} onChange={handleChange} className='border-2 border-slate-600 p-2 rounded-lg outline-none focus:border-blue-500 my-2 sm:w-80'/>

        <button onClick={handleSubmit} className="px-16 py-3 bg-blue-500 text-white rounded-3xl flex mx-auto mt-5 w-ssm justify-center font-bold hover:bg-blue-600 active:bg-blue-700 sm:w-96 ">
            Create account
          </button>
    </div>
</div>
  )
}

export default CreateAccount