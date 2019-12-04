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

    <View style={styles.iconContainer}>
      <TouchableOpacity>
        <Entypo name="facebook-with-circle" style={{color:'#3b5998',fontSize:50}} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Entypo name="twitter-with-circle" style={{color:'#1da1f2',fontSize:50}} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Entypo name="google--with-circle" style={{color:'#dd4b39',fontSize:50}} />
      </TouchableOpacity>
    </View>

    <View style={{flexDirection:'row'}}>
      <Text style={{position:'absolute',bottom:30, color:`#${fontColor}`}}>
        Don't have an account.</Text>
       <TouchableOpacity onPress={() => onPress()}>
        <Text style={{fontWeight:'bold'}}>Register</Text>
      </TouchableOpacity>
    </View>
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
