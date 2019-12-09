import React, {useState,useEffect} from 'react';
import { Alert, View, Text, StyleSheet } from 'react-native';
import * as firebase from 'firebase';
import SolidButton from '../components/SolidButton';

const JobDetail = ({navigation}) => {
  const id = navigation.getParam('id');
  [result,setResult] = useState([]);

  const getResult = (id) => {
    const dbh = firebase.firestore();
    dbh.collection("jobs").doc(id).onSnapshot(function(doc){
        setResult(doc.data());
    });

  }

  useEffect(()=>{
    getResult(id)
  },[]);

  if(!result){
    return null;
  }

  const applyJob = (applied) => {
    firebase.auth().onAuthStateChanged((userData) => {
      if(userData && applied){
        const uid = userData.uid;

        const dbh = firebase.firestore();


        dbh.collection("jobs").doc(id).update({
          Applicants: firebase.firestore.FieldValue.arrayUnion(uid),
          appcounter: result.appcounter + 1
        })
        .then(function(){
          navigation.goBack();
          Alert.alert('Applied succesfully');
          applied = false;
        })
        .catch(function(){
          console.log("Error updating document: ", error);
        });
    }
  });
  }

  return (
  <View style={{flex:1,alignItems:'center',marginTop:20}}>
    <Text>{result.employer}</Text>
    <Text>{result.title}</Text>
    <Text>{result.jobtype}</Text>
    <Text>{result.location}</Text>
    <Text>{result.jobdescription}</Text>
    <SolidButton text='Apply' onPress={()=> {
      const applied = true;
      applyJob(applied);
    }} />
  </View>
  );
};

const styles= StyleSheet.create({});

export default JobDetail;
