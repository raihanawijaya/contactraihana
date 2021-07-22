/**
 * @format
 */

import React from 'react'
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

import {NavigationContainer} from '@react-navigation/native'
import Router from './src/router'

import store , { persistor } from './src/redux/store/contact.store'
import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/integration/react';

const App = () => (
    <Provider store = {store}>
        <PersistGate persistor= {persistor}>
            <NavigationContainer>
                <Router />
            </NavigationContainer>
        </PersistGate> 
    </Provider>
)

AppRegistry.registerComponent(appName, () => App);
