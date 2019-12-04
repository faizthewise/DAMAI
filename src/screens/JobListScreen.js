import React, {useState, Component} from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as firebase from 'firebase';
import SearchBar from '../components/SearchBar';
import JobDetail from '../components/JobDetail';
import useResults from '../hooks/useResults';


const JobListScreen = ({navigation}) => {
  const[term,setTerm] = useState('');
  const[searchApi,results,errorMessage] = useResults();

  return (
  <LinearGradient colors={['rgb(1,206,201)', 'rgb(1,198,191)','rgb(3,184,177)']} style={{ flex:1 }}>
  <View style={{flex:1,alignItems:'center'}}>

    <SearchBar
      term={term}
      onTermChange={newTerm => setTerm(newTerm)}
      onTermSubmit={()=> searchApi(term)}
    />
    {errorMessage ? <Text>{errorMessage}</Text> :null }
    <ScrollView>
      <FlatList
          data={results}
          keyExtractor={(results)=>results.id}
          renderItem={({item}) =>{
            return(
              <View style={{marginVertical:5,backgroundColor:'white', borderRadius:20}}>
                <TouchableOpacity onPress={() => navigation.navigate('JobDetail', {id:item.jobid})}>
                  <JobDetail result={item} />
                </TouchableOpacity>
              </View>
            );
          }}
      />


    </ScrollView>


  </View>
  </LinearGradient>
  );
};

const styles= StyleSheet.create({});

export default JobListScreen;
