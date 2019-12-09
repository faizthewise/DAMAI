import React, {useState} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import {withNavigation} from 'react-navigation';
import JobPostedDetail from './JobPostedDetail';

const JobPostedList = ({results,title,navigation}) => {
  if(!results.length){
  return null;
  }

  return (
  <View style={{marginBottom:-120}}>
  <Text style={{fontWeight:'bold',color:'white',marginBottom:10, fontSize:16}}>{title}</Text>
  <FlatList
      data={results}
      keyExtractor={(results)=>results.jobid}
      renderItem={({item}) =>{
        return(
          <View style={{marginVertical:5}}>
            <TouchableOpacity onPress={() => navigation.navigate('JobApplicants',{id:item.jobid})}>
                <JobPostedDetail result={item} />
            </TouchableOpacity>
          </View>
  );
      }}
  />
  </View>
  );
};

const styles= StyleSheet.create({});

export default withNavigation(JobPostedList);
