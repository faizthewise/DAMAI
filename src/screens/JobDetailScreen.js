import React, {useState,useEffect} from 'react';
import { Alert, View, Text, StyleSheet } from 'react-native';
import * as firebase from 'firebase';
import SolidButton from '../components/SolidButton';

const JobDetail = ({navigation}) => {
  const id = navigation.getParam('id');
  [result,setResult] = useState([]);

  const getResult = (id) => {
    const dbh = firebase.firestore();
    dbh.collection("jobs").doc(id).get().then(function(doc){
      setResult(doc.data());
    });

  }

  useEffect(()=>{
    getResult(id)
  },[]);

  if(!result){
    return null;
  }

  const applyJob = () => {
    firebase.auth().onAuthStateChanged((userData) => {
      if(userData){
        const uid = userData.uid;

        const dbh = firebase.firestore();

        dbh.collection("jobs").doc(id).update({
          Applicants: firebase.firestore.FieldValue.arrayUnion(uid)
        })
        .then(function(){
          console.log('Applied succesfully');
          Alert.alert('Applied succesfully');
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
    <SolidButton text='Apply' onPress={()=> applyJob()} />
  </View>
  );
};

const styles= StyleSheet.create({});

export default JobDetail;
