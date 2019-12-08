import React, {Component, useState, useEffect} from 'react';
import { ScrollView, View, Text, StyleSheet, FlatList } from 'react-native';
import SolidButton from '../components/SolidButton';
import * as firebase from 'firebase';
import ProfileDetail from '../components/ProfileDetail';


const ProfileScreen = ({navigation}) =>  {
  [userProfile,setUserProfile] = useState([]);

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
    const response = dbh.collection("users").doc(uid).get().then(function (doc){
      setUserProfile(doc.data());
    })
  }

    return(
      // console.log({userProfile});
  <ScrollView style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:40}}>
          <View style={{marginVertical:2,alignItems:'center'}}>
            <ProfileDetail results={userProfile} />
            <SolidButton text="Logout" onPress={()=>handleLogout()} />
          </View>
  </ScrollView>


  );


}






const handleLogout = () =>{
  firebase.auth().signOut();

}
const styles= StyleSheet.create({});

export default ProfileScreen;
