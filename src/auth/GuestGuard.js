import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// next
import { useRouter } from 'next/router';
// components
import LoadingScreen from '../components/loading-screen';
//
import { useAuthContext } from './useAuthContext';


// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default function GuestGuard({ children }) {
  const userState = useSelector(state => state.user);
  const { push } = useRouter();

  // const { isAuthenticated, isInitialized } = useAuthContext();

  useEffect(() => {
    if (userState.isAuthenticated) {
      push('/dashboard');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState.isAuthenticated]);

  if (userState.isInitialized === userState.isAuthenticated) {
    return <LoadingScreen />;
  }

  return <> {children} </>;
}
