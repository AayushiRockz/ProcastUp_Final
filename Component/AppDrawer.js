import React from 'react';
import {AppTabNavigator} from './AppTabNavigator';
import SettingsScreen from '../Screens/SettingsScreen';
import CompletedGoalsScreen from '../Screens/CompletedGoalsScreen';
import RewardScreen from '../Screens/RewardScreen';
import {createDrawerNavigator} from 'react-navigation-drawer'; 
import CustomSideBarMenu from './CustomSideBarMenu';
import {Icon} from 'react-native-elements';

export const AppDrawer = createDrawerNavigator({
    Home:{
        screen: AppTabNavigator,
        navigationOptions:{
            drawerIcon : <Icon name="home" type ="feather"  />
          }
    },
    Settings:{
        screen:SettingsScreen,
        navigationOptions:{
            drawerIcon : <Icon name="gears" type ="font-awesome" />
          }
    },
    CompletedGoals:{
        screen:CompletedGoalsScreen,
        navigationOptions:{
            drawerIcon : <Icon name="line-chart" type ="font-awesome" />
          }
    },
    Reward:{
        screen:RewardScreen,
        navigationOptions:{
            drawerIcon : <Icon name="gift" type ="font-awesome" />
          }
    }
},
{
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName : 'Home'
  }

)