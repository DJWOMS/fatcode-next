import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// next
import { useRouter } from 'next/router';
// components
import LoadingScreen from '../components/loading-screen';
//
import Login from '../pages/auth/login';
import { useAuthContext } from './useAuthContext';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const userState = useSelector(state => state.user);
  // const { isAuthenticated, isInitialized } = useAuthContext();

  const { pathname, push } = useRouter();

  const [requestedLocation, setRequestedLocation] = useState(null);

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      push(requestedLocation);
    }
    if (userState.isAuthenticated) {
      setRequestedLocation(null);
    }
  }, [userState.isAuthenticated, pathname, push, requestedLocation]);

  if (!userState.isInitialized) {
    return <LoadingScreen />;
  }

  if (!userState.isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  return <> {children} </>;
}
