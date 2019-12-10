import React, {useState,useEffect} from 'react';
import * as firebase from 'firebase';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import SolidButton from '../components/SolidButton';
import RedButton from '../components/RedButton';
import { LinearGradient } from 'expo-linear-gradient';

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
  <LinearGradient colors={['rgba(1,206,201,1)', 'rgba(1,198,191,1)','rgba(3,184,177,1)']} style={{ flex:1 }}>
  <View style={styles.container}>
    <Text style={{fontSize:24,fontWeight:'bold',color:'white'}}>Applicant Details</Text>
    <Image source={{uri:result.image}} style ={{height:130,width:130,borderRadius:65}} />
    <View style={styles.card}>
      <View style={{marginBottom:10}}>
        <Text style={styles.title}>NAME</Text>
        <Text style={styles.description}>{result.fullname}</Text>
      </View>
      <View style={{marginBottom:10}}>
        <Text style={styles.title}>PHONE NUMBER</Text>
        <Text style={styles.description}>{result.phonenumber}</Text>
      </View>
      <View style={{marginBottom:10}}>
        <Text style={styles.title}>ADDRESS</Text>
        <Text style={styles.description}>{result.city}, {result.postcode}, {result.state}</Text>
      </View>
      <View style={{marginBottom:10}}>
        <Text style={styles.title}>GENDER</Text>
        <Text style={styles.description}>{result.sex}</Text>
      </View>
      <View style={{marginBottom:10}}>
        <Text style={styles.title}>RATING</Text>
        <Text style={styles.description}>{result.rating}</Text>
      </View>




    </View>

    <View>
      <SolidButton text="Accept" onPress={()=> assignJob(jobID,applicantID,{navigation})}/>
      <RedButton text="Reject" onPress={() => rejectApplicant(jobID,applicantID,{navigation})}/>
    </View>

  </View>

  </LinearGradient>
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

const styles= StyleSheet.create({
  container:{
    flex:1,
    marginTop:30,
    alignItems: 'center',
    justifyContent : 'space-between'
  },
  card:{
    padding:20,
    backgroundColor:'white',
    borderRadius:10,
    height: 300,
    width: 320,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  description:{fontSize:16,fontWeight:'bold',marginBottom:10},
  title:{fontSize:12}
});

export default ApplicantDetailsScreen;
