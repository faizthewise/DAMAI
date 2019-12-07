import React, {useState, Component} from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Picker } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as firebase from 'firebase';
import {AntDesign} from '@expo/vector-icons';
import MenuDrawer from 'react-native-side-drawer'
import SearchBar from '../components/SearchBar';
import JobDetail from '../components/JobDetail';
import useResults from '../hooks/useResults';



const toggleDrawer = (toggle) => {
    console.log("masuk");

    return !toggle;


}

const JobListScreen = ({navigation}) => {
  const[term,setTerm] = useState('');
  const[openDrawer,setOpenDrawer]=useState(false);
  const[searchApi,results,errorMessage] = useResults();



  const drawerContent = () => {
    const[value,setValue] = useState('');
    return(
    <View style={styles.Drawer}>
    <TouchableOpacity
    style={{backgroundColor:'#F2F2F2',width:40,height:40,borderRadius:10,padding:5}}
    onPress={() => {
      console.log('Pressed content');
      const toggle = toggleDrawer(openDrawer);
      setOpenDrawer(toggle);
    }}
    >
      <AntDesign name="filter" style={{fontSize:24,alignSelf:'flex-start'}} />
    </TouchableOpacity>
    <Picker style={{height:50,width:150}} selectedValue = {value} onValueChange={(itemValue, itemIndex) =>
    setValue(itemValue)} >
               <Picker.Item label = "Steve" value = "steve" />
               <Picker.Item label = "Ellen" value = "ellen" />
               <Picker.Item label = "Maria" value = "maria" />
    </Picker>
    </View>
  );
  }

  return (
  <LinearGradient colors={['rgb(1,206,201)', 'rgb(1,198,191)','rgb(3,184,177)']} style={{ flex:1 }}>
  <View style={{flex:1,alignItems:'center'}}>
  <MenuDrawer
          open={openDrawer}
          drawerContent={drawerContent()}
          drawerPercentage={65}
          animationTime={250}
          overlay={true}
          opacity={0.4}
        >
  <View style={{flex:1,margin:20}}>

        <View style={{flexDirection:'row',marginBottom:30}}>

            <TouchableOpacity
              style={{backgroundColor:'#F2F2F2',width:40,height:40,borderRadius:10,padding:5}}
              onPress={() => {
                console.log('Pressed');
                const toggle = toggleDrawer(openDrawer);
                setOpenDrawer(toggle);
              }}
              >
                <AntDesign name="filter" style={{fontSize:24}} />
            </TouchableOpacity>

        </View>
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
  </MenuDrawer>
  </View>
  </LinearGradient>
  );
};

const styles= StyleSheet.create({
  Drawer:{flex:1,
          backgroundColor: "#FEFEFE",
          padding: 20,
          justifyContent:'center',
          alignItems:'center',
          shadowColor: "#000",
          shadowOffset: {
          	width: 0,
          	height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3
        }
});

export default JobListScreen;
