import React, {useState, useEffect} from 'react';
import { ScrollView, Text, StyleSheet, Alert } from 'react-native';
import t from 'tcomb-form-native';
import firebase from 'firebase';
import _ from 'lodash';
import SolidButton from '../components/SolidButton';


const Form = t.form.Form;

const JobType = t.enums({
  Childcare: 'Childcare',
  Mengaji: 'Mengaji',
  Laundry: 'Laundry',
  Special : 'Special Care',
  Cooking: 'Cooking',
  Cleaning: 'Cleaning'
})

const Job = t.struct({
  title: t.String,
  jobtype: JobType,
  location: t.String,
  jobdescription: t.maybe(t.String)


});
var customStyleSheet = _.cloneDeep(t.form.Form.stylesheet);
customStyleSheet.textbox.normal.height = 100;


const options ={
  auto: 'placeholders',
  fields: {
    jobdescription:{
      multiline:true,
      numberOfLines: 5,
      autoCorrect: true,
      stylesheet: customStyleSheet,
      placeholder: 'Job description (optional)'
    }
  }
}


const EditJob = ({navigation}) => {
  const jobID = navigation.getParam('jobID');

  const [value,setValue] =  useState([]);

  const initialValue = () => {
    const dbh = firebase.firestore();
    dbh.collection("jobs").doc(jobID).get().then(function(doc){
      setValue(doc.data());
    }).catch(function(error){
      console.log("error =>",error);
    });
  }

  useEffect(()=>{
    initialValue();
  },[]);

  const handleSubmit = () =>{
    const newValue = this._form.getValue();
    console.log('New Value =>', newValue);
    if (newValue != null){
      setDB(newValue,jobID,{navigation});


    }

  }

  return (
  <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.title}>Edit job</Text>
    <Form type={Job} options={options} ref={c => this._form = c} value={value}/>
    <SolidButton text="Save" onPress={()=>handleSubmit()}/>
  </ScrollView>
  );
}

const setDB = (value,jobID,{navigation}) =>{

  const dbh = firebase.firestore();
  dbh.collection("jobs").doc(jobID).update({
    title : value.title,
    location : value.location,
    jobtype: value.jobtype,
    jobdescription: value.jobdescription
  }).then(()=>{
    navigation.goBack();
    Alert.alert("Update succesfully");
  }).catch((error)=>{
    console.log("Error =>",error);
  })

}

const styles= StyleSheet.create({
  container:{
    justifyContent:'center',
    alignItems: 'center',
    marginTop:50,
    padding:20,
    flex:1,
  },
  title:{
    fontSize:24,
    fontWeight:'bold',
    marginBottom: 20,
    alignSelf:'center'
  }
});

export default EditJob;
