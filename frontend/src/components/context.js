import React from 'react';

export const NavContext = React.createContext();

export const UserContext = React.createContext({
  username: null,
  password: null,
  setUsername: () => {},
  setPassword: () => {},
});