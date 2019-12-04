import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as firebase from 'firebase';

const ApplicantDetail = ({result}) => {

  const [info,setInfo] = useState([]);

  const findInfo = () => {
      const dbh = firebase.firestore();
      dbh.collection("users").doc(result).get().then(function(doc){
        if(doc.exists){
          setInfo(doc.data());
        }
        else{
          console.log("Does not exist");
        }

      });
  }

  useEffect(()=>{
    findInfo();
  },[]);

  return (
    <View style={styles.outerContainer}>

      <Image style={{height:80,width:80,borderRadius:10}} source={{uri:info.image}} />

      <View style={styles.innerContainer}>

        <Text style={{fontWeight:'bold',fontSize:18,width:150}}>{info.fullname}</Text>
        <Text>{info.location}</Text>

      </View>
      <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
        <Text style={styles.rating}>Rating</Text>
        <Text style={styles.rating}>{info.rating}</Text>
      </View>
    </View>
  );
};

const styles= StyleSheet.create({
  outerContainer:{
    height:100,
    width:350,
    borderRadius:10,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    flex:1,
    borderWidth:2,
    borderColor: 'grey'
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

export default ApplicantDetail;
