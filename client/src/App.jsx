import React from 'react';
import { useAuthContext } from './hooks/useAuthContext';
import { getUserAvatarUrl } from './utils/cdn';

export default function App() {
  const authContext = useAuthContext();
  return (
    <div>
      <img src={getUserAvatarUrl(authContext)} className="logo" alt="User" />
    </div>
  );
}
