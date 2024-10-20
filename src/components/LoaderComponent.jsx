import { CSpinner } from '@coreui/react';
import React from 'react';

const LoaderComponent = () => {
  return (
    <div className="flex justify-center mt-64">
      <CSpinner className="text-blue-500 w-12 h-12 text-3xl" />
    </div>
  );
};

export default LoaderComponent;
