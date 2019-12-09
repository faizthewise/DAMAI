import React, {Component} from 'react';
import { View,ScrollView, Text, StyleSheet } from 'react-native';
import t from 'tcomb-form-native';
import firebase from 'firebase';
import SolidButton from '../components/SolidButton';


const Form = t.form.Form;

const Gender = t.enums({
  M: 'Male',
  F: 'Female'
})

const UserType = t.enums({
  E: 'Home Employer',
  W: 'Domestic Worker'
})

const value = {
  gender: 'M',
  usertype : 'W'
};

const Email = t.refinement(t.String, email => {
  const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //or any other regexp
  return reg.test(email);
});

const Password = t.refinement(t.String, s => {
  return s.length >= 6;
});

const User = t.struct({
  email: Email,
  fullname: t.String,
  password: Password,
  city : t.String,
  postcode : t.String,
  state : t.String,
  gender: Gender,
  contactno: t.Number,
  usertype: UserType,
  bankname: t.String,
  bankacc: t.Number
});

const options ={
  auto: 'placeholders',
  error: 'All fields must be completed',
  fields: {
    confirmpassword:{
      placeholder:'Confirm Password'
    },
    address: {
      placeholder:'City'
    },
    contactno:{
      placeholder:'Contact Number'
    },
    password:{
      password:true,
      secureTextEntry:true,
      error: 'Password must be at least 6 characters'
    },
    fullname:{
      placeholder:'Full Name'
    },
    email:{
      error: 'Insert a valid email'
    },
    bankname: {
      placeholder: 'Bank Name'
    },
    bankacc:{
      placeholder: 'Bank Account No'
    }
  }
}

const registerUser = (value, uid, email) => {
  const dbh = firebase.firestore();
  dbh.collection("users").doc(uid).set({
    fullname: value.fullname,
    phonenumber: value.contactno,
    sex: value.gender,
    acctype: value.usertype,
    uid:uid,
    image: "https://lifeatbrio.com/wp-content/uploads/2016/11/user-placeholder.jpg",
    email: email,
    bankname: value.bankname,
    bankacc: value.bankacc,
    city: value.city,
    postcode: value.postcode,
    state : value.state,
    rating: "5.0"

  })


}


export default class RegisterScreen extends Component {
  handleSubmit = () => {
    const value = this._form.getValue();
    console.log(value);
    if(value != null){
    var email = value.email;
    var password = value.password;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userData) => {
      var uid = userData.user.uid;
      var email = userData.user.email;
      registerUser(value,uid,email);
       const {navigate} = this.props.navigation;
       navigate('UserLoading');
    })
    .catch(function(error) {
  // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);

});
  }
  }



  render(){
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>REGISTRATION</Text>
        <View style={{width:300}}>
        <Form type={User} options={options} value={value} ref={c => this._form = c}/>
        </View>
        <SolidButton text="Register" onPress={this.handleSubmit} />
      </ScrollView>


  );
}
}

const styles= StyleSheet.create({
  container:{
    alignItems: 'center',
    marginTop:50,
    flex:1,
    justifyContent:'center',
    padding:40
  },
  title:{
    fontSize:24,
    fontWeight:'bold',
    marginBottom: 20,
    alignSelf:'center'
  }
});
