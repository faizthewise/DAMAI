import React, {useState,useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import * as firebase from 'firebase';
import {FloatingAction} from "react-native-floating-action";
import {AntDesign, Ionicons} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
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
      icon: <AntDesign name="edit" style={{fontSize:16,color:'white'}} />,
      position: 1,
      name: "edit"
    },
    {
      text: "Delete",
      icon: <AntDesign name="delete" style={{fontSize:16,color:'white'}} />,
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
  <LinearGradient colors={['rgba(1,206,201,1)', 'rgba(1,198,191,1)','rgba(3,184,177,1)']} style={{ flex:1 }}>
  <View style={{flex:1,alignItems:'center',marginTop:30}}>


      <Text style={{fontSize:24,fontWeight:'bold',marginVertical:20,color:'white'}}>Service Requested Details</Text>
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
      {result.status=="vacant" ?
          <View>
            <Text style={{fontSize:24,fontWeight:'bold', marginVertical:20,color:'white'}}>List of Applicants</Text>
            <FlatList
              data={applicants}
              keyExtractor={(applicants)=> applicants}
              renderItem={({item}) => {
                return(
                  <View style={{marginVertical:5}}>
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
          <Text style={{fontSize:24,fontWeight:'bold', marginVertical:20,color:'white'}}>Assigned to</Text>
          <View style={styles.outerContainer}>


            <Image style={{height:80,width:80,borderRadius:10}} source={{uri:assigned.image}} />

            <View style={styles.innerContainer}>

              <Text style={{fontWeight:'bold',fontSize:18,width:150}}>{assigned.fullname}</Text>
              {result.gender=='M' ? <Text>Male</Text> : <Text>Female</Text>}
              <Text>{assigned.city}, {assigned.postcode}, {assigned.state}</Text>

            </View>
            <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
              <Text style={styles.rating}>Rating</Text>
              <Text style={styles.rating}>{assigned.rating}</Text>
            </View>
          </View>
          <TouchableOpacity style={{flexDirection:'row',marginTop:30}} onPress={()=>navigation.navigate('GiveRating',{uid:assigned.uid,jobID:jobID})}>
            <Text style={{fontSize:18,fontWeight:'bold',color:'white'}}>Mark as Completed</Text>
            <Ionicons name="md-done-all" style={{fontSize:18,color:'white',marginLeft:10}} />
          </TouchableOpacity>
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
  </LinearGradient>
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
  text:{fontSize:16,fontWeight:'bold',marginBottom:10,color:'white'},
  title:{fontSize:12,color:'white'},
  outerContainer:{
    backgroundColor:'white',
    height:100,
    width:350,
    borderRadius:10,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  innerContainer:{
    flexDirection:'column',
    alignItems:'flex-start',
    justifyContent:'space-around',

  },
  rating:{
    fontSize:18,
    fontWeight:'bold',
    justifyContent:'center'
  }
});

export default JobApplicants;
