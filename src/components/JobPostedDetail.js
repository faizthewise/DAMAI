import React,{useState} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';


const JobPostedDetail = ({result}) => {

  return (
  <View style={styles.outerContainer}>




      <Text style={{fontWeight:'bold',fontSize:18}}>{result.title}</Text>

      <View style={{flexDirection:'row'}}>
        <Image source={{uri:result.icon}} style={{height:20,width:20}} />
        <Text style={{fontSize:18}}>{result.jobtype}</Text>
      </View>
      <Text>{result.startdate} | {result.location} | {result.appcounter} applicants</Text>

  </View>
  );
};

const styles= StyleSheet.create({
  outerContainer:{
    height:100,
    width:350,
    borderRadius:10,
    flex:1,
    backgroundColor:'white',
    paddingHorizontal:20,
    paddingVertical:10,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4
  },
  rating:{
    fontSize:18,
    fontWeight:'bold',
    justifyContent:'center'
  }
});

export default JobPostedDetail;
