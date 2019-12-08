import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ApplicantDetailsScreen = ({navigation}) => {
  const applicantID = navigation.getParam('applicantID');
  const jobID = navigation.getParam('jobID');
  console.log("Applicant ID =>",applicantID);
  console.log("Job ID =>",jobID);

  return (
  <View>
    <Text>Applicant Details screen</Text>
  </View>
  );
};

const styles= StyleSheet.create({});

export default ApplicantDetailsScreen;
