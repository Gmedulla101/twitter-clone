//THE CONDITIONAL SIGN IN BAR IN THE HOME PAGE
import { Link } from 'react-router-dom';

const SignInbar = () => {
  return (
    <div className="signInBar h-18 bg-blue-500 sticky w-full top-[88%]  text-white flex justify-center items-center px-6 ">
      <div className="w-[50%] ssm: hidden sm:block">
        <h3 className="font-bold"> Don't miss what's happening </h3>
        <p> The people on X are the first to know </p>
      </div>

      <div className="flex p-4 ssm: w-[305] sm:gap-2">
        <Link to={'/sign-in'}>
          {' '}
          <button className="border-[1px] border-white rounded-3xl font-semibold px-4 py-2 w-36 hover:bg-white hover:text-blue-500">
            {' '}
            Sign In{' '}
          </button>{' '}
        </Link>
        <Link to={'/sign-up'}>
          {' '}
          <button className="bg-white text-black rounded-3xl font-semibold px-4 py-2 w-36 hover:text-blue-500">
            {' '}
            Sign Up{' '}
          </button>{' '}
        </Link>
      </div>
    </div>
  );
};

export default SignInbar;
