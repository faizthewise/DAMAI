import React from 'react';
import { View, TextInput , StyleSheet , Text} from 'react-native';
import SolidButton from './SolidButton';


const LoginComponent = ({email,password,onEmailChange,onPasswordChange, onPress, errorMessage}) => {



  return (
  <View style={styles.container}>
    <View style={styles.holder}>
        <TextInput
        autoCapitalize = "none"
        autoCorrect={false}
        style={styles.inputStyle}
        placeholder="email"
        value={email}
        onChangeText={newEmail => onEmailChange(newEmail)}
        />
    </View>

    <View style={styles.holder}>
        <TextInput
        secureTextEntry
        autoCapitalize = "none"
        autoCorrect={false}
        style={styles.inputStyle}
        placeholder="password"
        value={password}
        onChangeText={newPassword => onPasswordChange(newPassword)}
        />
    </View>

    <View style={{width:300,marginBottom:30}}>
      <Text style={{fontSize:10, alignSelf:'flex-end'}}>Forgot Password</Text>
      <Text style={{alignSelf:'flex-end',color:'red'}}>{errorMessage}</Text>
    </View>

    <SolidButton text="Login" onPress={() => onPress()}/>

  </View>
  );
};

const styles= StyleSheet.create({
  container:{
    alignItems:'center',
    justifyContent:'center'
  },
  holder:{
  paddingLeft:15,
  marginTop:15,
  marginBottom:10,
  backgroundColor: '#F0EEEE',
  borderRadius:20,
  marginHorizontal:15,
  flexDirection:'row',
  height: 45,
  width:300
},
inputStyle:{
  flex:1
},
});

export default LoginComponent;
