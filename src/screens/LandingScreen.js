import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SolidButton from '../components/SolidButton';
import OutlineButton from '../components/OutlineButton';

const LandingScreen = ({navigation}) => {

  return (
<ImageBackground source={require('../../assets/carpet-cleaning-services.jpeg')} style={{flex:1}}>
  <LinearGradient colors={['rgba(1,206,201,0.4)', 'rgba(1,198,191,0.4)','rgba(3,184,177,0.6)']} style={{ flex:1 }}>
    <View style={styles.container}>
      <Image source={{uri:'https://firebasestorage.googleapis.com/v0/b/twice-285f4.appspot.com/o/logo%2Fdamai-logo-text.png?alt=media&token=619adad7-1c05-44f2-93b6-4943f1657c3a'}} style={{height:100,width:150,position:'absolute',top:10}} />
      <SolidButton text="Home Employer" onPress={() => navigation.navigate('HELogin')}  />
      <OutlineButton text="Domestic Worker" onPress={() => navigation.navigate('DWLogin')}  />
    </View>
  </LinearGradient>
</ImageBackground>
  );
};



const styles= StyleSheet.create({
  container:{
    justifyContent:'flex-end',
    alignItems:'center',
    flex:1,
    padding:20
  }
});

export default LandingScreen;
