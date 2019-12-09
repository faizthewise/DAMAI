import React, {Component, useState, useEffect} from 'react';
import { ScrollView, View, Text, StyleSheet, FlatList } from 'react-native';
import SolidButton from '../components/SolidButton';
import * as firebase from 'firebase';
import {FloatingAction} from "react-native-floating-action";
import {AntDesign} from '@expo/vector-icons';
import ProfileDetail from '../components/ProfileDetail';



const ProfileScreen = ({navigation}) =>  {
  const [userProfile,setUserProfile] = useState([]);
  const actions= [
    {
      text: "Edit Profile",
      icon: <AntDesign name="pluscircle" />,
      position: 1
    },
    {
      text: "Request Job",
      icon: <AntDesign name="pluscircle" />,
      position: 2
    },
    {
      text: "Logout",
      icon: <AntDesign name="pluscircle" />,
      position:3
    }
  ]
  const checkLogin = () =>{
    firebase.auth().onAuthStateChanged(user => {
       if(user){
         const uid=firebase.auth().currentUser.uid;
         findProfile(uid);

       }
       else{
         navigation.navigate('Landing');
       }
     })

  }

  useEffect(()=>{
    checkLogin();
  },userProfile);

  const findProfile = (uid) =>{
    console.log("findProfile=> ",uid);
    const dbh = firebase.firestore();
    const response = dbh.collection("users").doc(uid).onSnapshot(function(doc){
      setUserProfile(doc.data());
    })
  }

    return(
      // console.log({userProfile});
  <View style={{flex:1}}>
  <ScrollView style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:40}}>
          <View style={{marginVertical:2,alignItems:'center'}}>
            <ProfileDetail results={userProfile} />
            <SolidButton text="Logout" onPress={()=>handleLogout()} />
          </View>

  </ScrollView>
  <FloatingAction
      actions={actions}
      onPressItem={name => {
        console.log(`selected button: ${name}`);
      }}
    />
  </View>



  );


}






const handleLogout = () =>{
  firebase.auth().signOut();

}
const styles= StyleSheet.create({});

export default ProfileScreen;
