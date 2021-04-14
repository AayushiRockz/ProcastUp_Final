0
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppHeader from './Component/AppHeader';

import {AppTabNavigator} from './Component/AppTabNavigator';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import WelcomeScreen from './Screens/WelcomeScreen';
import {AppDrawer} from './Component/AppDrawer';


export default class App extends React.Component{
  render(){
    return(
      <AppContainer/>
   
    
    )
  }
}

const switchNavigator = createSwitchNavigator({
  Welcome:{screen:WelcomeScreen},
  Drawer:{screen:AppDrawer},
  Tabs:{screen:AppTabNavigator},
})

const AppContainer = createAppContainer(switchNavigator);