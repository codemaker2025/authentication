import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { authTokenAtom } from '../atoms/authAtom';

export default function PrivateRoute() {
  const token = useAtomValue(authTokenAtom);

  return token ? <Outlet /> : <Navigate to="/" />;
}
