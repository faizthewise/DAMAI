import React, {useState} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as firebase from 'firebase';
import LoginComponent from '../components/LoginComponent';
import LowerSectLogin from '../components/LowerSectLogin';


const DWLoginScreen = ({navigation}) => {
  const[email,setEmail] = useState('');
  const[password,setPassword]= useState('');
  const[error, setError] = useState('');

  const handleLogin = (email,password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email,password)
      .then(() => navigation.navigate('UserLoading'))
      .catch(error => setError('Wrong password or email'))
  }

  const handleRegister = () => {
    navigation.navigate('Register');
  }

  return (
  <View style={{flex:1}}>
    <View style={styles.upperPart}>

          <Image source={{uri:'https://discordapp.com/assets/94db9c3c1eba8a38a1fcf4f223294185.png'}} style={{height:200,width:200,alignSelf:'center'}} />
          <LoginComponent
            email={email}
            onEmailChange={newEmail => setEmail(newEmail)}
            password={password}
            onPasswordChange={newPassword => setPassword(newPassword)}
            onPress = {() => handleLogin(email,password)}
            errorMessage = {error}
           />
    </View>

    <View style={styles.lowerPart}>
      <LinearGradient colors={['rgb(1,206,201)', 'rgb(1,198,191)','rgb(3,184,177)']} style={{ flex:1 }}>
        <LowerSectLogin fontColor="fff" onPress={() => handleRegister()} />
      </LinearGradient>
    </View>

  </View>
  );
};

const styles= StyleSheet.create({
  upperPart:{
    flex:2,
    justifyContent:'space-around'
  },
  lowerPart:{
    flex:1
  }
});

export default DWLoginScreen;
