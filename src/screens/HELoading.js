import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {Ionicons} from '@expo/vector-icons';
import * as firebase from 'firebase';
import AddJob from './AddJob';
import ProfileScreen from './ProfileScreen';
import JobPosted from './JobPosted';

class HELoading extends React.Component {
  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
       this.props.navigation.navigate(user ? 'ProfileHE' : 'Landing')
     })
  }
};

const styles= StyleSheet.create({});

export default createBottomTabNavigator(
  {
    Profile: ProfileScreen,
    JobPosted : JobPosted,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'ProfileScreen') {
          iconName ='ios-body';
        } else if (routeName === 'JobPosted') {
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
