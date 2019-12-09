import React, {useState} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as firebase from 'firebase';
import LoginComponent from '../components/LoginComponent';
import LowerSectLogin from '../components/LowerSectLogin';


const HELoginScreen = ({navigation}) => {
  const[email,setEmail] = useState('');
  const[password,setPassword]= useState('');
  const[error, setError] = useState('');

  const handleLogin = (email,password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email,password)
      .then(() => {
        navigation.navigate('HELoading');

      })
      .catch(error => {
        setError('Wrong password or email');
      })
  }

  const handleRegister = () => {
    navigation.navigate('Register');
  }

  return (
  <View style={{flex:1}}>
    <View style={styles.upperPart}>
      <LinearGradient colors={['rgb(1,206,201)', 'rgb(1,198,191)','rgb(3,184,177)']} style={{ flex:1,    justifyContent:'space-around' }}>



          <Image source={{uri:'https://firebasestorage.googleapis.com/v0/b/twice-285f4.appspot.com/o/logo%2Fdamai-logo-text.png?alt=media&token=619adad7-1c05-44f2-93b6-4943f1657c3a'}} style={{height:100,width:150,alignSelf:'center'}} />
          <LoginComponent
            email={email}
            onEmailChange={newEmail => setEmail(newEmail)}
            password={password}
            onPasswordChange={newPassword => setPassword(newPassword)}
            onPress = {() => handleLogin(email,password)}
            errorMessage = {error}
           />

      </LinearGradient>
    </View>

    <View style={styles.lowerPart}>
      <LowerSectLogin fontColor="000" onPress={() => handleRegister()}  />
    </View>

  </View>
  );
};

const styles= StyleSheet.create({
  upperPart:{
    flex:2,
  },
  lowerPart:{
    flex:1
  }
});

export default HELoginScreen;
