import React, {useState,useEffect} from 'react';
import { ScrollView, Text, StyleSheet, Alert } from 'react-native';
import t from 'tcomb-form-native';
import firebase from 'firebase';
import _ from 'lodash';
import SolidButton from '../components/SolidButton';

const Form = t.form.Form;

const Gender = t.enums({
  M: 'Male',
  F: 'Female'
})

const Email = t.refinement(t.String, email => {
  const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //or any other regexp
  return reg.test(email);
});

const Password = t.refinement(t.String, s => {
  return s.length >= 6;
});

const User = t.struct({
  email: Email,
  fullname: t.String,
  city : t.String,
  gender: Gender,
  phonenumber: t.Number,
  bankname: t.String,
  bankacc: t.Number
});

const options ={
  auto: 'placeholders',
  error: 'All fields must be completed',
  fields: {
    confirmpassword:{
      placeholder:'Confirm Password'
    },
    address: {
      placeholder:'City'
    },
    phonenumber:{
      placeholder:'Contact Number'
    },
    password:{
      password:true,
      secureTextEntry:true,
      error: 'Password must be at least 6 characters'
    },
    fullname:{
      placeholder:'Full Name'
    },
    email:{
      error: 'Insert a valid email'
    },
    bankname: {
      placeholder: 'Bank Name'
    },
    bankacc:{
      placeholder: 'Bank Account No'
    }
  }
}

const EditProfile = ({navigation}) => {
  const [value,setValue] =  useState([]);

  const initialValue = () => {
    firebase.auth().onAuthStateChanged(user => {
       if(user){
         const uid = firebase.auth().currentUser.uid;

         const dbh = firebase.firestore();
         dbh.collection("users").doc(uid).get().then(function(doc){
           setValue(doc.data());
         }).catch(function(error){
           console.log("error =>",error);
         });
       }
       else{
         navigation.navigate('Landing');
       }
     })

  }

  useEffect(()=>{
    initialValue();
  },[]);

  const handleSubmit = () =>{
    const newValue = this._form.getValue();
    console.log('New Value =>', newValue);
    if (newValue != null){
      setProfile(newValue,{navigation});
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <Form type={User} options={options} ref={c => this._form = c} value={value}/>
      <SolidButton text="Save" onPress={()=>handleSubmit()}/>
    </ScrollView>
  );
};

const setProfile = (value,{navigation}) => {
  firebase.auth().onAuthStateChanged(user => {
     if(user){
       const uid = firebase.auth().currentUser.uid;

       const dbh = firebase.firestore();
       dbh.collection("users").doc(uid).update({
         email: value.email,
         fullname: value.fullname,
         city : value.city,
         gender: value.gender,
         phonenumber: value.phonenumber,
         bankname: value.bankname,
         bankacc: value.bankacc
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
   })

}

const styles= StyleSheet.create({
  container:{
    justifyContent:'center',
    alignItems: 'center',
    marginTop:50,
    padding:20,
    flex:1,
  },
  title:{
    fontSize:24,
    fontWeight:'bold',
    marginBottom: 20,
    alignSelf:'center'
  }
});

export default EditProfile;
