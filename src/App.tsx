import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { AppStateProvider } from './components/AppStateProvider/AppStateProvider';
import Header from './components/Header/Header';
import { MainContent } from './components/MainContent/MainContent';
import { Logo } from './icons/Logo';

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyDKCpvKwUNcDnjGarrM1MruzrF96xu_2bc',
  authDomain: 'video-call-diagnostics.firebaseapp.com',
  projectId: 'video-call-diagnostics',
  storageBucket: 'video-call-diagnostics.appspot.com',
  messagingSenderId: '264571240401',
  appId: '1:264571240401:web:1dfcc2a528dab0ab98eaf0',
  measurementId: 'G-HJB60FW93N',
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appContainer: {
      position: 'relative',
      width: '100%',
      [theme.breakpoints.down('md')]: {
        width: 'auto',
      },
      height: '100%',
      background: theme.backgroundColor,
      overflow: 'hidden',
    },
  })
);

function App() {
  const classes = useStyles();
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  return (
    <AppStateProvider>
      <div className={classes.appContainer}>
        <Header />
        <MainContent />
      </div>
    </AppStateProvider>
  );
}

export default App;
