import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {Entypo} from '@expo/vector-icons';



const LowerSectLogin = ({fontColor,onPress}) => {

  return (
  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    <View style={{flexDirection:'row', position:'absolute',top:15}}>
      <View style={{  height:1, width:200, backgroundColor:`#${fontColor}`,top:10}}/>
      <Text style={{fontWeight:'bold',fontSize:16, marginHorizontal:10,color:`#${fontColor}`}}>or</Text>
      <View style={{  height:1, width:200, backgroundColor:`#${fontColor}`,top:10}} />
    </View>


       <TouchableOpacity onPress={() => onPress()}>
        <Text style={{ color:`#${fontColor}`}}>
        Don't have an account. Register</Text>
        </TouchableOpacity>
  </View>
  );
};

const styles= StyleSheet.create({

  iconContainer:{
    flexDirection:'row',
    justifyContent:'space-around',
    width:300
  }
});

export default LowerSectLogin;
