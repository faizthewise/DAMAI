import React, {useState,useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import * as firebase from 'firebase';
import {FloatingAction} from "react-native-floating-action";
import {AntDesign} from '@expo/vector-icons';
import ApplicantDetail from '../components/ApplicantDetail';

const JobApplicants = ({navigation}) => {
  const jobID = navigation.getParam('id');
  [result,setResult] = useState([]);
  [applicants, setApplicants] = useState([]);
  [assigned, setAssigned] = useState([]);
  const dbh = firebase.firestore();

  const actions= [
    {
      text: "Edit",
      icon: <AntDesign name="edit" />,
      position: 1,
      name: "edit"
    },
    {
      text: "Delete",
      icon: <AntDesign name="delete" />,
      position: 2,
      name: "delete"
    },
  ]

  const getResult = () => {
    dbh.collection("jobs").doc(jobID).onSnapshot(function(doc){
      console.log("changes");
      setResult(doc.data());
      setApplicants(result.Applicants);
      console.log("This is chosen =>",doc.data());
      const chosen = result.assignedTo;

      getAssigned(chosen);
    });

  }

  const getAssigned = (chosen) =>{
    console.log("masuk assigned");
    if(chosen){

    dbh.collection("users").doc(chosen).onSnapshot(function(doc){
      setAssigned(doc.data());
      console.log("changes =>");
    });
    }
  }

  useEffect(()=>{
    getResult()
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
    {result.vacant ?
        <View>
          <Text style={{fontSize:24,fontWeight:'bold', marginVertical:20}}>List of Applicants</Text>
          <FlatList
            data={applicants}
            keyExtractor={(applicants)=> applicants}
            renderItem={({item}) => {
              return(
                <View>
                  <TouchableOpacity onPress={()=> {
                    navigation.navigate('ApplicantDetails',{applicantID:item,jobID:jobID});
                  }}>
                    <ApplicantDetail result={item} />
                  </TouchableOpacity>
                </View>
              );
            }
          }
          />
      </View> :
      <View>
        <Text style={{fontSize:24,fontWeight:'bold',marginVertical:20}}>Service Assigned To</Text>
        <Text>{assigned.fullname}</Text>
        <Text>{assigned.city}</Text>
        <Text>{assigned.email}</Text>
        <Text>{assigned.rating}</Text>
      </View>



    }

    <FloatingAction
        actions={actions}
        onPressItem={name => {
          switch(name){
            case 'delete':
              deletePosting(jobID,{navigation});
              break;
            case 'edit':
              navigation.navigate('EditJob',{jobID:jobID});
              break;
            default:
              return;
          }
        }}
      />
  </View>
  );
};

const deletePosting = (jobID,{navigation}) => {
  Alert.alert(
  'Delete the post?',
  'This will permanently delete the posting',
  [
    {
      text: 'Cancel',
      style: 'cancel',
    },
    {text: 'Confirm', onPress: () =>{
      const dbh = firebase.firestore();
      dbh.collection("jobs").doc(jobID).delete().then(()=>{
          navigation.goBack();
        Alert.alert("Succesfully deleted");

      }).catch(function(error){
        console.log("Error", error);
      });
    }},
  ],
  {cancelable: true},
);

}

const styles= StyleSheet.create({
  text:{fontSize:16,fontWeight:'bold',marginBottom:10},
  title:{fontSize:12}
});

export default JobApplicants;
