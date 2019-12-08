import React, {useEffect} from 'react';
import { ScrollView, Text, StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import useResultsHE from '../hooks/useResultsHE';
import {AntDesign} from '@expo/vector-icons';
import JobList from '../components/JobList';

const JobPosted = ({navigation}) => {

const[results,errorMessage] = useResultsHE();

  const filterResult = (vacant) => {
    return results.filter(results => {
      return results.vacant == vacant;
    });
  }
  return (
    <View style={{flex:1}}>
    <TouchableOpacity onPress={() => navigation.navigate('AddJob')}>
      <AntDesign name="pluscircle" style={{fontSize:45, color:'grey'}} />
    </TouchableOpacity>
      <ScrollView style={{alignItems:'center',paddingTop:40}}>
      <Text style={{fontSize:18,fontWeight:'bold',alignSelf:'center',marginVertical:20}}>Services You Requested</Text>
      <JobList results={filterResult(true)} title="Vacant" />
      <JobList results={filterResult(false)} title="Assigned" />

      </ScrollView>



    </View>
  );
};

const styles= StyleSheet.create({});

export default JobPosted;
