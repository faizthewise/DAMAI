import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {Ionicons} from '@expo/vector-icons';
import * as firebase from 'firebase';
import JobListScreen from './JobListScreen';
import ProfileScreen from './ProfileScreen';

class UserLoading extends React.Component {
  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
       this.props.navigation.navigate(user ? 'Profile' : 'Landing')
     })
  }
};

const styles= StyleSheet.create({});

export default createBottomTabNavigator(
  {
    Profile: ProfileScreen,
    JobList: JobListScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Profile') {
          iconName ='md-person';
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
          //IconComponent = HomeIconWithBadge;
        } else if (routeName === 'JobList') {
          iconName = 'ios-list-box';
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'rgb(1,198,191)',
      inactiveTintColor: 'gray',
    },
  }
);
