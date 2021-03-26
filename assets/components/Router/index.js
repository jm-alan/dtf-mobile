import React from 'react';
import { useSelector } from 'react-redux';

import Home from '../Home';
import Login from '../Forms/Login';
import Signup from '../Forms/Signup';

export default function Router () {
  const page = useSelector(state => state.router.page);
  switch (page) {
    case 'home':
      return <Home />;
    case 'login':
      return <Login />;
    case 'signup':
      return <Signup />;
    default:
      return <Home />;
  }
}
