import {useEffect, useState} from 'react';
import * as data from '../job.json';
import firebase from 'firebase'
import '@firebase/firestore';


export default () => {
  const[results,setResults]=useState([]);
  const[errorMessage,setErrorMessage]=useState('');

  const dbh = firebase.firestore();
  const result = [];

  const searchApi = (service,location) => {
        if(service===''){
          const response = dbh.collection("jobs").where("approval","==",true).where("vacant","==",true);
          searchResult(response);
        }
        else{
          const response = dbh.collection("jobs").where("approval","==",true).where("vacant","==",true).where("jobtype","==",service).where("location","==",location);
          searchResult(response);
        }

    // .catch(function(error){
    //   console.log("Error baby");
    //   setErrorMessage('Something went wrong');
    // });



  };

  const searchResult = (response) =>{
    response.onSnapshot(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            // console.log(doc.id, "=>", doc.data());
            result.push(doc.data());
        });
        //console.log(result);
        setResults(result);
});
  }

  // Call searchApi when component is first rendered. BAD CODE!
  //searchApi('pasta');
  useEffect(() =>{
    searchApi('','');
  }, []);

  return [searchApi, results, errorMessage];
};
