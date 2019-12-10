import React,{useState} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';


const JobDetail = ({result}) => {
  return (
  <View style={styles.outerContainer}>

    <Image style={{height:80,width:80,borderRadius:10}} source={{uri:result.image}} />

    <View style={styles.innerContainer}>

      <Text style={{fontWeight:'bold',fontSize:18,width:150}}>{result.title}</Text>

      <View style={{flexDirection:'row'}}>
        <Image source={{uri:result.icon}} style={{height:20,width:20}} />
        <Text style={{fontSize:18}}>{result.jobtype}</Text>
      </View>

      <Text>{result.startdate}</Text>
      <Text>{result.location}</Text>

    </View>
    <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
      <Text style={styles.rating}>Rating</Text>
      <Text style={styles.rating}>{result.rating}</Text>
    </View>
  </View>
  );
};

const styles= StyleSheet.create({
  outerContainer:{
    height:110,
    width:350,
    borderRadius:10,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    flex:1
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

export default JobDetail;
