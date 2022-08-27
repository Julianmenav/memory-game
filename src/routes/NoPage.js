import React from 'react';
import LinkButton from '../components/LinkButton';

const NoPage = () => {
  return (
    <div className="noPage">
      <LinkButton path="/">Go Home</LinkButton>
      <p>Esta página no existe.</p>
    </div>
  );
}

export default NoPage;
