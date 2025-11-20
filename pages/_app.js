import '../styles/globals.css';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';


const reducers = combineReducers({ user });

const persistConfig = { key: 'applicationName', storage };

const store = configureStore({
 reducer: persistReducer(persistConfig, reducers),
 middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Tweeter</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;