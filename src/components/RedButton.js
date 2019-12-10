import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const RedButton = ({text,onPress}) => {
  return (

    <TouchableOpacity onPress={() => onPress() }>
      <LinearGradient colors={['rgb(220,20,60)', 'rgb(255,0,0)', 'rgb(220,20,60)']} style={styles.button}>
        <Text style={styles.text}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>

  );
};

const styles= StyleSheet.create({
button:{
  marginVertical:15,
  height:45,
  width:250,
  borderRadius:20,
  justifyContent:'center',
  alignItems:'center',
},
text:{
  fontWeight:'bold',
  color:'white'
}
});

export default RedButton;
