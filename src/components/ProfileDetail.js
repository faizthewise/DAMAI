import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const ProfileDetail = ({results}) => {

  // console.log(results);
  return (
  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    <Image source={{uri:results.image}} style ={{height:130,width:130,borderRadius:65}} />
    <Text style={{fontWeight:'bold',fontSize:16,marginTop:20}}>{results.fullname}</Text>

    <View style={styles.box1}>
      <LinearGradient colors={['rgb(1,206,201)', 'rgb(1,198,191)','rgb(3,184,177)']} style={styles.gradient} >
        <View style={{flexDirection:'row',marginVertical:10}}>
          <MaterialIcons name="email" style={{fontSize:24,color:'white',marginHorizontal:20}} />
          <View style={{flexDirection:'column'}}>
            <Text style={{color:'white'}}>EMAIL</Text>
            <Text style={styles.text}>{results.email}</Text>
          </View>
        </View>

        <View style={{flexDirection:'row',marginVertical:10}}>
          <MaterialIcons name="phone" style={{fontSize:24,color:'white',marginHorizontal:20}} />
          <View style={{flexDirection:'column'}}>
            <Text style={{color:'white'}}>PHONE</Text>
            <Text style={styles.text}>{results.phonenumber}</Text>
          </View>
        </View>
      </LinearGradient>
    </View>

    <View style={styles.box2}>
      <LinearGradient colors={['rgb(1,206,201)', 'rgb(1,198,191)','rgb(3,184,177)']} style={[styles.gradient,{paddingLeft:40}]}>
        <Text style={styles.title}>ACCOUNT STATUS </Text>
        {results.verify ? <Text style={styles.text}>Verified</Text> :<Text style={styles.text}>Not Verified</Text> }
        <Text style={styles.title}>ADDRESS</Text>
        <Text style={styles.text}>{results.city}, {results.postcode}, {results.state} </Text>
        <Text style={styles.title}>BANK NAME</Text>
        <Text style={styles.text}>{results.bankname}</Text>
        <Text style={styles.title}>BANK ACCOUNT</Text>
        <Text style={styles.text}>{results.bankacc}</Text>

      </LinearGradient>
    </View>


  </View>
  );
};

const styles= StyleSheet.create({
  box2:{
width:320,
height:250,
marginVertical:10,
shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.23,
shadowRadius: 2.62,
elevation: 4},

  box1:{
  width:320,
  height:150,
  marginVertical:10,
  shadowColor: "#000",
  shadowOffset: {
  	width: 0,
  	height: 2,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,
  elevation: 4

},
  text:{fontSize:16,color:'white',fontWeight:'bold',marginBottom:10},
  gradient:{flex:1, borderRadius:20,paddingLeft:10,justifyContent:'center'},
  title:{fontSize:12,color:'white'}

});

export default ProfileDetail;
