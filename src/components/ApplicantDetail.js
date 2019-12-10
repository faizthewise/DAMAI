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
        {info.gender=='M' ? <Text>Male</Text> : <Text>Female</Text>}
        <Text>{info.city}, {info.postcode}, {info.state}</Text>

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
    backgroundColor:'white',
    height:100,
    width:350,
    borderRadius:10,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    flex:1,
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

export default ApplicantDetail;
