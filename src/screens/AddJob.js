import React, {Component, useState} from 'react';
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
  startdate : t.Date,
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

export default class AddJob extends React.Component {

  setDB = (value,called) =>{
    const { goBack } = this.props.navigation;
    var jobID           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 12; i++ ) {
      jobID += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    var uid = '';
    firebase.auth().onAuthStateChanged((userData) => {
      if(userData && called){

        uid = userData.uid;
        const dbh = firebase.firestore();
        var docRef = dbh.collection("users").doc(uid);
        docRef.get().then(function(doc){


              const info = doc.data();
              console.log("info =>",info);
              const db = firebase.firestore();
              db.collection("jobs").doc(jobID).set({
                approval: false,
                icon: "https://cdn4.iconfinder.com/data/icons/library-glyph/64/Library__Library_Book_Open_Reading_Newspaper-512.png",
                jobtype: value.jobtype,
                location: value.location,
                startdate: "23 November 2019",
                title: value.title,
                jobdescription: value.jobdescription,
                image: info.image,
                rating: info.rating,
                employerid:uid,
                jobid: jobID,
                status:"vacant"

              })
              .then(function() {
                goBack();
                console.log('Added succesfully');
                Alert.alert('Service requested succesfully');
                called=false;
              })
              .catch(function(error){
                console.log("Error occured ", error);
              });


    });





      }
    })

  }

  handleSubmit = () =>{
    const value = this._form.getValue();

    if (value != null){
      const called=true;
      this.setDB(value,called);
      console.log('Value =>', value);

    }


  }



  render(){
  return (
  <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.title}>Add new job</Text>
    <Form type={Job} options={options} ref={c => this._form = c}/>
    <SolidButton text="Request Service" onPress={this.handleSubmit}/>
  </ScrollView>
  );
}
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
