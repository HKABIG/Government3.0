import React from 'react';
import '../../App.css';
import './NotFound.css';

const NotFound = () => {
  return (
    <>
    <div className="not-found-container">
      <h1 className="not-found-heading">404 Not Found</h1>
      <p className="not-found-text">The page you are looking for either does not exist.</p>
      <p className="not-found-text">Or you are not authorized to see the page you are looking for.</p>
    </div>
    </>
  );
};

export default NotFound;
