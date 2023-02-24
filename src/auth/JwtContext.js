import PropTypes from 'prop-types';
import {createContext, useEffect, useReducer, useCallback, useMemo} from 'react';
// utils
import axios from '../utils/axios';
import localStorageAvailable from '../utils/localStorageAvailable';
//
import {setSession} from './utils';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGIN') {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === 'REGISTER') {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }

  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext(null);

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export function AuthProvider({children}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const storageAvailable = localStorageAvailable();

  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';

      if (accessToken) {
        setSession(accessToken);

        const response = await axios.get('/auth/users/me');
        console.log('RESPONSE', response)
        const {user} = response.data;

        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: true,
            user,
          },
        });
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [storageAvailable]);

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
      const {auth_token, user} = response.data;

      setSession(auth_token);

      dispatch({
        type: 'LOGIN',
        payload: {
          user,
        },
      });
    } catch (error) {
      throw new Error(error.non_field_errors[0])
    }

  }, []);

  // REGISTER
  const register = useCallback(async (email, password, username, invite) => {
    try {
      const response = await axios.post('/auth/users/', {
        re_password: password,
        email,
        password,
        username,
        invite,
      });
      // const {user} = response.data;

      // localStorage.setItem('accessToken', accessToken);

      dispatch({
        type: 'REGISTER'
      });
    } catch (error) {
      throw new Error(error)
    }
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    await axios.post('/auth/token/logout', {});
    setSession(null);
    dispatch({
      type: 'LOGOUT',
    });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      method: 'jwt',
      login,
      register,
      logout,
    }),
    [state.isAuthenticated, state.isInitialized, state.user, login, logout, register]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
