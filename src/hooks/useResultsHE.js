import {useEffect, useState} from 'react';
import * as data from '../job.json';
import firebase from 'firebase'
import '@firebase/firestore';


export default () => {
  const[results,setResults]=useState([]);
  const[errorMessage,setErrorMessage]=useState('');

  const dbh = firebase.firestore();
  const result = [];

  const searchJob = () => {
    firebase.auth().onAuthStateChanged((userData) => {
    if(userData){
    var uid = userData.uid;

    const response = dbh.collection("jobs").where("employerid","==",uid);
    response.onSnapshot(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            // console.log(doc.id, "=>", doc.data());
            result.push(doc.data());
        });
        console.log(result);
        setResults(result);
});

    }
    else{

    }
  });
}

  useEffect(() =>{
    searchJob();
  }, []);

    return [results, errorMessage];

  };
