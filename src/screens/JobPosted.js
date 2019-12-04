import React, {useEffect} from 'react';
import { ScrollView, Text, StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import JobDetail from '../components/JobDetail';
import useResultsHE from '../hooks/useResultsHE';
import {AntDesign} from '@expo/vector-icons';

const JobPosted = ({navigation}) => {

const[results,errorMessage] = useResultsHE();

  return (
    <View style={{flex:1}}>

      <ScrollView style={{alignItems:'center',paddingTop:40}}>
      <Text style={{fontSize:18,fontWeight:'bold',alignSelf:'center',marginVertical:20}}>Services You Requested</Text>
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
      <TouchableOpacity onPress={() => navigation.navigate('AddJob')}>
        <AntDesign name="pluscircle" style={{fontSize:45, color:'grey', alignSelf:'center',marginTop:40}} />
      </TouchableOpacity>
      </ScrollView>



    </View>
  );
};

const styles= StyleSheet.create({});

export default JobPosted;
