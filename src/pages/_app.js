// scroll bar
import 'simplebar-react/dist/simplebar.min.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';

// ----------------------------------------------------------------------


import PropTypes from 'prop-types';
import { Provider } from "react-redux";

import { CacheProvider } from '@emotion/react';
// next
import Head from 'next/head';

import { Provider } from 'react-redux';
import { store } from '../redux/store';

// utils
import createEmotionCache from '../utils/createEmotionCache';
// theme
import ThemeProvider from '../theme';

// components
import ProgressBar from '../components/progress-bar';
import SnackbarProvider from '../components/snackbar';
import { MotionLazyContainer } from '../components/animate';
import { ThemeSettings, SettingsProvider } from '../components/settings';

// Check our docs
// https://docs.minimals.cc/authentication/js-version


import { AuthProvider } from '../auth/JwtContext';

const clientSideEmotionCache = createEmotionCache();

MyApp.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.object,
  emotionCache: PropTypes.object,
};

export default function MyApp(props) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>


        <AuthProvider>
          <SettingsProvider>
            <MotionLazyContainer>
              <ThemeProvider>
                <ThemeSettings>
                  <SnackbarProvider>
                    <ProgressBar />
                    {getLayout(<Component {...pageProps} />)}
                  </SnackbarProvider>
                </ThemeSettings>
              </ThemeProvider>
            </MotionLazyContainer>
          </SettingsProvider>
        </AuthProvider>
      </CacheProvider>
    </Provider>
  );
}
