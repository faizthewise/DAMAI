import React, {useState,useEffect} from 'react';
import { ScrollView, Text, StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import useResultsHE from '../hooks/useResultsHE';
import {AntDesign} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import JobPostedList from '../components/JobPostedList';
import firebase from 'firebase'
import '@firebase/firestore';

const JobPosted = ({navigation}) => {
  [results,setResults]=useState([]);
  const[errorMessage,setErrorMessage]=useState('');
  const dbh = firebase.firestore();
  const result = [];
  var uid;

const searchID = () => {
  firebase.auth().onAuthStateChanged((userData) => {
  if(userData){
  uid = userData.uid;
  searchJob(uid);}
});
}

const searchJob = (uid) => {
  const response = dbh.collection("jobs").where("employerid","==",uid);
  response.onSnapshot(function(querySnapshot){
      querySnapshot.forEach(function(doc){
          // console.log(doc.id, "=>", doc.data());
          result.push(doc.data());
      });
      setResults(result);
      console.log("results =>",results);
});
}

useEffect(()=>{
  searchID();
},[]);



  const filterResult = (status) => {
    return results.filter(results => {
      return results.status == status;
    });
  }
  return (
    <View style={{flex:1}}>
    <LinearGradient colors={['rgb(1,206,201)', 'rgb(1,198,191)','rgb(3,184,177)']} style={{ flex:1 }}>

        <ScrollView contentContainerStyle={{alignItems:'center',paddingTop:40}}>
          <Text style={{fontSize:24,fontWeight:'bold',alignSelf:'center',marginVertical:20,color:'white'}}>Services You Requested</Text>
          <JobPostedList results={filterResult("vacant")} title="Vacant" />
          <JobPostedList results={filterResult("ongoing")} title="On Going" />
          <JobPostedList results={filterResult("complete")} title="Completed" />
          <TouchableOpacity onPress={() => navigation.navigate('AddJob')}>
            <AntDesign name="pluscircle" style={styles.icon} />
          </TouchableOpacity>

        </ScrollView>


    </LinearGradient>
    </View>
  );
};

const styles= StyleSheet.create({
  icon:{
    shadowColor: "#000",
shadowOffset: {
	width: 2,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 1.84,
elevation: 5,
fontSize:45,
color:'white'

  }
});

export default JobPosted;
