import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { createContext, useEffect, useReducer, useCallback, useMemo } from 'react';
import { initial, loginSite, registerSite, logoutSite } from '../redux/slices/user';

// utils
import axios from '../utils/axios';
import localStorageAvailable from '../utils/localStorageAvailable';
//
import { setSession } from './utils';


// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

// const initialState = {
//   isInitialized: false,
//   isAuthenticated: false,
//   user: null,
// };

// const reducer = (state, action) => {
//   if (action.type === 'INITIAL') {
//     return {
//       isInitialized: true,
//       isAuthenticated: action.payload.isAuthenticated,
//       user: action.payload.user,
//     };
//   }
//   if (action.type === 'LOGIN') {
//     return {
//       ...state,
//       isAuthenticated: true,
//       user: action.payload.user,
//     };
//   }
//   if (action.type === 'REGISTER') {
//     return {
//       ...state,
//       isAuthenticated: false,
//       user: null,
//     };
//   }
//   if (action.type === 'LOGOUT') {
//     return {
//       ...state,
//       isAuthenticated: false,
//       user: null,
//     };
//   }

//   return state;
// };

// ----------------------------------------------------------------------

export const AuthContext = createContext(null);

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export function AuthProvider({ children }) {
  // const [state, dispatched] = useReducer(reducer, initialState);
  // const userState = useSelector(state => state.user);
  const dispatch = useDispatch();

  const storageAvailable = localStorageAvailable();

  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';

      if (accessToken) {
        setSession(accessToken);

        const response = await axios.get('/profiles/user_me');
        const user = response.data.results[0];
        console.log(user);
        dispatch(initial({
          isAuthenticated: true,
          user
        }));
        // dispatched({
        //   type: 'INITIAL',
        //   payload: {
        //     isAuthenticated: true,
        //     user,
        //   },
        // });
      } else {
        dispatch(initial({
          isAuthenticated: false,
          user: null,
        }));
        // dispatched({
        //   type: 'INITIAL',
        //   payload: {
        //     isAuthenticated: false,
        //     user: null,
        //   },
        // });
      }
    } catch (error) {
      console.error(error);
      dispatch(initial({
        isAuthenticated: false,
        user: null,
      }));
      // dispatched({
      //   type: 'INITIAL',
      //   payload: {
      //     isAuthenticated: false,
      //     user: null,
      //   },
      // });
    }
  }, [storageAvailable, dispatch]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (username, password) => {
    try {
      const response = await axios.post('/auth/token/login', {
        username,
        password,
      });
      const { auth_token, user } = response.data;
      setSession(auth_token);
      dispatch(loginSite({ user }));
      initialize();
      // console.log(response2.data, "!!!!!!!!!!!!!!");
      // dispatched({
      //   type: 'LOGIN',
      //   payload: {
      //     user,
      //   },
      // });
    } catch (error) {
      throw new Error(error.non_field_errors[0])
    }

  }, [initialize, dispatch]);

  // REGISTER
  const register = useCallback(async (email, password, username, invite) => {
    try {
      await axios.post('/auth/users/', {
        re_password: password,
        email,
        password,
        username,
        invite,
      });
      // const {user} = response.data;

      // localStorage.setItem('accessToken', accessToken);
      dispatch(registerSite());
      // dispatched({
      //   type: 'REGISTER'
      // });
    } catch (error) {
      throw new Error(error)
    }
  }, [dispatch]);

  // LOGOUT
  const logout = useCallback(async () => {
    await axios.post('/auth/token/logout', {});
    setSession(null);
    dispatch(logoutSite());
    // /
  }, [dispatch]);

  const memoizedValue = useMemo(
    () => ({
      // isInitialized: userState.isInitialized,
      // isAuthenticated: userState.isAuthenticated,
      // user: userState.user,
      method: 'jwt',
      login,
      register,
      logout,
    }),
    [
      //  userState.isAuthenticated,
      //  userState.isInitialized,
      //  userState.user,
      login, logout, register]
  );

  console.log(memoizedValue);

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
