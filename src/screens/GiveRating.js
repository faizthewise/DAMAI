import React,{useEffect,useState} from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Rating, AirbnbRating } from 'react-native-ratings';
import SolidButton from '../components/SolidButton';
import * as firebase from 'firebase';

const GiveRating = ({navigation}) => {
const uid = navigation.getParam('uid');
const jobID = navigation.getParam('jobID');
const [value, onChangeText] = React.useState('Write your thoughts');
[rate,setRate] = React.useState([]);
[result,setResult] =React.useState([]);

ratingCompleted = (rating) =>{
  setRate(rating);
}

getResult = () => {
  const dbh = firebase.firestore();
  dbh.collection("users").doc(uid).onSnapshot(function(doc){
      setResult(doc.data());
  });
}

useEffect(()=>{
  getResult();
},[]);


const submit = () =>{
  const dbh = firebase.firestore();
  dbh.collection("users").doc(uid).update({
    reviewer: result.reviewer +1,
    rating: (result.rating + rate) /(result.reviewer).toFixed(2),
  });


 dbh.collection("jobs").doc(jobID).update({
   status: 'complete'
 }).then(() => {
     navigation.goBack();
     Alert.alert("Successful");
 })



}

  return (
    <View style={{flex:1,marginTop:60,alignItems:'center'}}>
        <Text style={{fontSize:22,fontWeight:'bold'}}>Rate your domestic worker</Text>
        <Rating type='custom' showRating startingValue={0}  onFinishRating={this.ratingCompleted} style={{ paddingVertical: 10}} fractions={1}/>
        <View style={{marginVertical:20,width:320}}>
          <TextInput
          style={{ height: 80, borderColor: 'gray', borderWidth: 1, borderRadius:20}}
          onChangeText={text => onChangeText(text)}
          placeholder={value}
          />
        </View>
        <SolidButton text="Submit" onPress={()=>submit()} />
    </View>
  );
};

const styles= StyleSheet.create({});

export default GiveRating;
