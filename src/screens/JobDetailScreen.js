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


    <Text style={{fontSize:24,fontWeight:'bold',color:'white'}}>Job Details</Text>
    <View style={styles.card}>
      <View style={{marginBottom:10}}>
        <Text style={styles.title}>TITLE</Text>
        <Text style={styles.description}>{result.title}</Text>
      </View>
      <View style={{marginBottom:10}}>
        <Text style={styles.title}>JOBTYPE</Text>
        <Text style={styles.description}>{result.jobtype}</Text>
      </View>
      <View style={{marginBottom:10}}>
        <Text style={styles.title}>DESCRIPTION</Text>
        <Text style={styles.description}>{result.jobdescription}</Text>
      </View>

    </View>

    <SolidButton text='Apply' onPress={()=> {
      const applied = true;
      applyJob(applied);
    }} />
  </View>
)
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

export default JobDetail;
