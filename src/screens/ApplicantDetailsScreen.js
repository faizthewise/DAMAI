import React, {useState,useEffect} from 'react';
import * as firebase from 'firebase';
import { View, Text, StyleSheet, Alert } from 'react-native';
import SolidButton from '../components/SolidButton';
import OutlineButton from '../components/OutlineButton';

const ApplicantDetailsScreen = ({navigation}) => {
  const applicantID = navigation.getParam('applicantID');
  const jobID = navigation.getParam('jobID');
  const [result,setResult] = useState([]);
  const dbh = firebase.firestore();
  const docRef =   dbh.collection("jobs").doc(jobID);

  const applicantProfile = () =>{

    dbh.collection("users").doc(applicantID).onSnapshot(function(doc){
      setResult(doc.data());
    });
  }

  useEffect(()=>{
    applicantProfile()
  },[]);

  if(!result){
    return null;
  }




  return (
  <View style={{flex:1,marginTop:30}}>
    <Text style={{fontSize:24,fontWeight:'bold'}}>Applicant Details</Text>
    <Text>{result.fullname}</Text>
    <Text>{result.phonenumber}</Text>
    <Text>{result.city}</Text>
    <Text>{result.sex}</Text>
    <Text>{result.rating}</Text>

    <View style={{flex:1,flexDirection:'row'}} >
      <SolidButton text="Accept" onPress={()=> assignJob(jobID,applicantID,{navigation})}/>
      <SolidButton text="Reject" onPress={() => rejectApplicant(jobID,applicantID,{navigation})}/>
    </View>
  </View>
  );
};

const assignJob = (jobID,applicantID,{navigation}) => {
  const dbh = firebase.firestore();
  const docRef =   dbh.collection("jobs").doc(jobID);

  docRef.set({
    assignedTo:applicantID,
    status:'ongoing'
  },{merge:true}).then(()=>{
    navigation.goBack();
    Alert.alert('Successful!');
  }).catch(function(error){
    console.log("Error ==>", error)
  });

}

const rejectApplicant = (jobID,applicantID,{navigation}) => {
  const dbh = firebase.firestore();
  const docRef =   dbh.collection("jobs").doc(jobID);
    docRef.update({
      Applicants : firebase.firestore.FieldValue.arrayRemove(applicantID)
    }).then(()=>{
      navigation.goBack();
      Alert.alert('Successful!');
    }).catch(function(error){
      console.log("Error ==>", error)
    });
  }

const styles= StyleSheet.create({});

export default ApplicantDetailsScreen;
