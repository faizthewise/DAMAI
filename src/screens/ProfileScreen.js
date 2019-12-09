import React, {Component, useState, useEffect} from 'react';
import { TouchableOpacity,Modal, ScrollView, View, Text, StyleSheet, FlatList, Alert, Image } from 'react-native';
import SolidButton from '../components/SolidButton';
import * as firebase from 'firebase';
import {FloatingAction} from "react-native-floating-action";
import {AntDesign,Entypo} from '@expo/vector-icons';
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
      icon: <AntDesign name="edit" style={{fontSize:16,color:'white'}} />,
      position: 1,
      name: "edit"
    },
    {
      text: "Logout",
      icon: <AntDesign name="logout" style={{fontSize:16,color:'white'}} />,
      position:2,
      name: "logout"
    }
  ]
  const checkLogin = () =>{
    console.log("Check login");
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
  },[]);

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
  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
  <ScrollView contentContainerStyle={{marginTop:40}}>
          <View style={{marginVertical:2,alignItems:'center'}}>
            {upload!=100 ? <Progress.Pie progress={upload/100} size={50} color={rgb(1,198,191)} /> :
            <View>
              <Image source={{uri:userProfile.image}} style ={{height:130,width:130,borderRadius:65}} />
              <TouchableOpacity onPress={()=> changePP()}>
                  <Entypo name="edit" style={{fontSize:24,alignSelf:'flex-end',marginTop:-20,color:'rgb(1,198,191)'}} />
              </TouchableOpacity>
            </View>
            }
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
          case 'logout':
            handleLogout();
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
