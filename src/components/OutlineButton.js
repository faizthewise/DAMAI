import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const OutlineButton = ({text,onPress}) => {
  return (

    <TouchableOpacity style={styles.button} onPress={() => onPress() }>
        <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>

  );
};

const styles= StyleSheet.create({
button:{
  marginVertical:15,
  height:45,
  width:250,
  borderRadius:30,
  borderWidth:1,
  borderColor:'white',
  backgroundColor:'rgba(0,0,0,0)',
  justifyContent:'center',
  alignItems:'center',
},
text:{
  fontWeight:'bold',
  color:'white'
}
});

export default OutlineButton;
