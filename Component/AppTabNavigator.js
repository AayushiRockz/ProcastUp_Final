import React, {Component} from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import GoalsScreen from '../Screens/GoalScreen'; 
import TaskScreen from '../Screens/TaskScreen'; 
import TimerScreen from '../Screens/TimerScreen'; 
import WorkDoneScreen from '../Screens/WorkDoneScreen'; 

export const AppTabNavigator = createBottomTabNavigator({
    Goals:{
        screen:GoalsScreen,
        navigationOptions:{
            tabBarIcon:<Image source={require("../assets/goals.png")} style= {{width:70,height:30,}} />,
            tabBarLabel:"Goals"
        }
    },

    Task:{
        screen:TaskScreen,
        navigationOptions:{
            tabBarIcon:<Image source={require("../assets/Tasks.jpg")} style= {{width:70,height:30}} />,
            tabBarLabel:"Task"
        }
    },
    Timer:{
        screen:TimerScreen,
        navigationOptions:{
            tabBarIcon:<Image source={require("../assets/timer.jpg")} style= {{width:70,height:30}} />,
            tabBarLabel:"Timer"
        }
    },
   WorkDone: {
        screen:WorkDoneScreen,
        navigationOptions:{
            tabBarIcon:<Image source={require("../assets/WorkDone.jpg")} style= {{width:70,height:30}} />,
            tabBarLabel:"WorkDone"
        }
    }

})