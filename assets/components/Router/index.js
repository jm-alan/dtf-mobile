import { useSelector } from 'react-redux';

import Home from '../Home';
import Login from '../Forms/Login';

export default function Router () {
  const page = useSelector(state => state.router.page);
  switch (page) {
    case 'home':
      return <Home />;
    case 'login':
      return <Login />;
    default:
      return <Home />;
  }
}
