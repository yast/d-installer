/*
 * Copyright (c) [2022] SUSE LLC
 *
 * All Rights Reserved.
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of version 2 of the GNU General Public License as published
 * by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, contact SUSE LLC.
 *
 * To contact SUSE LLC about this file by physical or electronic mail, you may
 * find current contact information at www.suse.com.
 */

import React from 'react';
import InstallerClient from '../lib/InstallerClient';

const AuthContext = React.createContext();

function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN': {
      const { username, success, error, request } = action.payload;
      if (request) {
        return { loggedIn: false, request: true };
      } else {
        return { loggedIn: success, request: false, username, error };
      }
    }
    case 'LOGOUT': {
      return { loggedIn: false };
    }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`)
    }
  }
}

const initialState = { loggedIn: false };

function AuthProvider({ props, children }) {
  const [state, dispatch] = React.useReducer(authReducer, initialState);
  const value = React.useMemo(() => [state, dispatch], [state]);

  return (
    <AuthContext.Provider value={value} {...props}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuthContext() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }

  const [state, dispatch] = context;

  const login = (username, password) => {
    dispatch({ type: 'LOGIN', payload: { request: true } });

    const client = new InstallerClient();
    client.authorize(username, password)
      .then(() => {
        dispatch({ type: 'LOGIN', payload: { username, success: true } })
      })
      .catch(error => {
        dispatch({ type: 'LOGIN', payload: { username, success: false, error } }) 
      });
  };
  const logout = () => dispatch({ type: 'LOGOUT' });

  return {
    state,
    dispatch,
    login,
    logout
  }
}

export {
  AuthProvider,
  useAuthContext,
}