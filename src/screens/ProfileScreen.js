import React, {Component, useState, useEffect} from 'react';
import { Modal, ScrollView, View, Text, StyleSheet, FlatList, Alert, Image } from 'react-native';
import SolidButton from '../components/SolidButton';
import * as firebase from 'firebase';
import {FloatingAction} from "react-native-floating-action";
import {AntDesign} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as Progress from 'react-native-progress';
import {ART} from 'react-native';
import ProfileDetail from '../components/ProfileDetail';



const ProfileScreen = ({navigation}) =>  {
  const [userProfile,setUserProfile] = useState([]);
  [upload,setUpload] = useState(100);
  [UID,setUID] = useState('');
  var image;
  const actions= [
    {
      text: "Edit Profile",
      icon: <AntDesign name="pluscircle" />,
      position: 1,
      name: "edit"
    },
    {
      text: "Request Job",
      icon: <AntDesign name="pluscircle" />,
      position: 2,
      name: "request"
    },
    {
      text: "Logout",
      icon: <AntDesign name="pluscircle" />,
      position:3,
      name: "logout"
    },
    {
      text: "Change pp",
      icon: <AntDesign name="pluscircle" />,
      position:4,
      name: "profilepicture"
    }
  ]
  const checkLogin = () =>{
    firebase.auth().onAuthStateChanged(user => {
       if(user){
         const uid = firebase.auth().currentUser.uid;
         setUID(uid);
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

  useEffect(() =>{
    getPermissionAsync();
  },[]);

  const findProfile = (uid) =>{
    const dbh = firebase.firestore();
    const response = dbh.collection("users").doc(uid).onSnapshot(function(doc){
      setUserProfile(doc.data());
    })
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  const changePP = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1
  });

  console.log(result);

  if (!result.cancelled) {
    uploadImage(result.uri);
  }
};

const uploadImage = async (uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();

  var ref = firebase.storage().ref().child("profilepicture/"+ UID);
  var uploadTask = ref.put(blob);

  uploadTask.on('state_changed',(snapshot)=>{
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log("Progress is",progress,"%done");
    setUpload(progress);
    console.log("Upload is",upload,"%done");
  },(error)=>{

  },()=>{
   uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    console.log('File available at', downloadURL);
    image=downloadURL;
    console.log('This is image',image);
    setImage(downloadURL);

  });
});


}

const setImage = (downloadURL) => {
  console.log("setImage");
  firebase.auth().onAuthStateChanged(user => {
     if(user){
       const uid = firebase.auth().currentUser.uid;

       const dbh = firebase.firestore();
       dbh.collection("users").doc(uid).update({
         image:downloadURL
       }).then(()=>{
         navigation.goBack();
         Alert.alert("Update succesfully");
       }).catch((error)=>{
         console.log("Error =>",error);
       });
     }
     else{
       navigation.navigate('Landing');
     }
   });

}





    return(
      // console.log({userProfile});
  <View style={{flex:1}}>
  <ScrollView style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:40}}>
          <View style={{marginVertical:2,alignItems:'center'}}>
            {upload!=100 ? <Progress.Pie progress={upload/100} size={50} color={rgb(1,198,191)} /> : <Image source={{uri:userProfile.image}} style ={{height:130,width:130,borderRadius:65}} />}
            <ProfileDetail results={userProfile} />
          </View>

  </ScrollView>
  <FloatingAction
      actions={actions}
      onPressItem={name => {
        switch(name){
          case 'edit':
            navigation.navigate('EditProfile');
            break;
          case 'request':
            break;
          case 'logout':
            handleLogout();
            break;
          case 'profilepicture':
            changePP();
            break;
          default:
            return;
        }
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
