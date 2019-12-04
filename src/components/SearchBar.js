import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import {FontAwesome} from '@expo/vector-icons'

const SearchBar = ({term, onTermChange, onTermSubmit}) => {
  return (
  <View style={styles.backgroundStyle}>
    <FontAwesome name="search" style={styles.iconStyle}/>
    <TextInput
    autoCapitalize = "none"
    autoCorrect={false}
    style={styles.inputStyle}
    placeholder="Search"
    value={term}
    onChangeText={newTerm => onTermChange(newTerm)}
    onEndEditing={() => onTermSubmit()}
    />
  </View>
  );
};

const styles= StyleSheet.create({
  backgroundStyle:{
    marginTop:35,
    marginBottom:10,
    backgroundColor: '#F0EEEE',
    height: 50,
    borderRadius:10,
    marginHorizontal:15,
    flexDirection:'row'
  },
  inputStyle:{
    flex:1,
    fontSize:18
  },
  iconStyle:{
    fontSize:32,
    alignSelf: 'center',
    marginHorizontal:15
  }
});

export default SearchBar;
