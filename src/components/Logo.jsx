import React from 'react';
import { Link } from 'react-router-dom';
export default function Logo({ logo }) {
  return (
    <div>
      <Link to={'/'}>
        {' '}
        <img src={logo} alt="X logo" className="w-10  mt-4 mb-9" />{' '}
      </Link>
    </div>
  );
}
