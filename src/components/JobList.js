import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {withNavigation} from 'react-navigation';
import JobDetail from './JobDetail';

const JobList = ({results,title,navigation}) => {

  if(!results.length){
  return null;
  }

  return (
  <View style={{marginBottom:-60}}>
  <Text style={{fontWeight:'bold'}}>{title}</Text>
  <FlatList
      data={results}
      keyExtractor={(results)=>results.id}
      renderItem={({item}) =>{
        return(
          <View style={{marginVertical:5}}>
            <TouchableOpacity onPress={() => navigation.navigate('JobApplicants',{id:item.jobid})}>
              <LinearGradient colors={['rgb(1,206,201)', 'rgb(1,198,191)','rgb(3,184,177)']} style={{ flex:1,borderRadius:10, }}>
                <JobDetail result={item} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
  );
      }}
  />
  </View>
  );
};

const styles= StyleSheet.create({});

export default withNavigation(JobList);
