import React, {useState,useEffect} from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import * as firebase from 'firebase';
import ApplicantDetail from '../components/ApplicantDetail';

const JobApplicants = ({navigation}) => {
  const id = navigation.getParam('id');
  [result,setResult] = useState([]);
  [applicants, setApplicants] = useState([]);



  const getResult = (id) => {
    const dbh = firebase.firestore();
    dbh.collection("jobs").doc(id).get().then(function(doc){
      setResult(doc.data());
      setApplicants(result.Applicants);


    });

  }

  useEffect(()=>{
    getResult(id)
  },[]);

  if(!result){
    return null;
  }

  return (
  <View style={{flex:1,alignItems:'center',marginTop:30}}>
    <Text style={{fontSize:24,fontWeight:'bold',marginVertical:20}}>Service Requested Details</Text>
    <View style={{alignSelf:'flex-start', marginLeft:30}}>
      <View style={{marginVertical:2}}>
        <Text style={styles.title}>TITLE</Text>
        <Text style={styles.text}>{result.title}</Text>
      </View>

      <View style={{marginVertical:2}}>
        <Text style={styles.title}>TYPE</Text>
        <Text style={styles.text}>{result.jobtype}</Text>
      </View>

      <View style={{marginVertical:2}}>
        <Text style={styles.title}>LOCATION</Text>
        <Text style={styles.text}>{result.location}</Text>
      </View>

      <View style={{marginVertical:2}}>
        <Text style={styles.title}>DESCRIPTION</Text>
        <Text style={styles.text}>{result.jobdescription}</Text>
      </View>
    </View>
    <Text style={{fontSize:24,fontWeight:'bold', marginVertical:20}}>List of Applicants</Text>
    <FlatList
      data={applicants}
      keyExtractor={(applicants)=> applicants}
      renderItem={({item}) => {
        return(
          <View>
            <ApplicantDetail result={item} />
          </View>
        );
      }}
    />
  </View>
  );
};

const styles= StyleSheet.create({
  text:{fontSize:16,fontWeight:'bold',marginBottom:10},
  title:{fontSize:12}
});

export default JobApplicants;
