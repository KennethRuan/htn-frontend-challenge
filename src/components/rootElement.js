import React from 'react';
import { UserProvider } from './userProvider';

const RootElement = ({ children }) => {
  return <UserProvider>{children}</UserProvider>;
};

export default RootElement;