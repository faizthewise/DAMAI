import React, {useState,useEffect, Component} from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as firebase from 'firebase';
import RNPicker from "rn-modal-picker";
import {AntDesign} from '@expo/vector-icons';
import MenuDrawer from 'react-native-side-drawer'
import SearchBar from '../components/SearchBar';
import JobDetail from '../components/JobDetail';
import useResults from '../hooks/useResults';
import SolidButton from '../components/SolidButton';



const toggleDrawer = (toggle) => {

    return !toggle;


}

const JobListScreen = ({navigation}) => {

  [results,setResults]=useState([]);
  const[errorMessage,setErrorMessage]=useState('');
  const[openDrawer,setOpenDrawer]=useState(false);
  const dbh = firebase.firestore();
  var result = [];

  useEffect(()=>{
    searchApi('','')
  },[]);
  const searchApi = (service,location) =>{
    console.log("SerachAPI called");
      if(service===''){
        const response = dbh.collection("jobs").where("approval","==",true).where("status","==",'vacant');
        response.onSnapshot(function(querySnapshot){

            querySnapshot.forEach(function(doc){
                // console.log(doc.id, "=>", doc.data());
                console.log("Changing");
                result.push(doc.data());
            });
            console.log('Result =>',result);
            //console.log(result);
            setResults(result);


    });
      }
      else{
        const response = dbh.collection("jobs").where("approval","==",true).where("vacant","==",true).where("jobtype","==",service).where("location","==",location);
        response.onSnapshot(function(querySnapshot){


            querySnapshot.forEach(function(doc){
                // console.log(doc.id, "=>", doc.data());
                console.log("Changing");
                result.push(doc.data());
            });
            console.log('Result =>',result);
            //console.log(result);
            setResults(result);


    });
      }
  }


  const drawerContent = () => {

    const [service,setService] = useState({
      dataSource : [
        {
          id: 1,
          name: "Childcare"
        },
        {
          id:2,
          name: "Mengaji"
        },{
          id:3,
          name:"Cleaning"
        },
        {
          id:4,
          name:"Elderly Care"
        },
        {
          id:5,
          name:"Laundry"
        },
        {
          id:6,
          name:"Cooking"
        },
      ],
      placeHolderText: "Select service required",
      selectedText: ""
});

const [location,setLocation] = useState({
  dataSource : [
    {
      id: 1,
      name: "Shah Alam"
    },
    {
      id:2,
      name: "Petaling Jaya"
    },{
      id:3,
      name:"Cyberjaya"
    },
    {
      id:4,
      name:"Subang"
    },
    {
      id:5,
      name:"Bangsar"
    },
    {
      id:6,
      name:"Kuala Lumpur"
    },
    {
      id:7,
      name:"Sepang"
    }
  ],
  placeHolderText: "Select preferred location",
  selectedText: ""
});

const selectedService = (index,item) =>{
  setService({...service,
    selectedText: item.name
  });
}

const selectedLocation = (index,item) =>{
  setLocation({...location,
    selectedText: item.name
  });

}

const getValue = () =>{
  searchApi(service.selectedText,location.selectedText);
}
    return(
    <View style={styles.Drawer}>
    <TouchableOpacity
    style={{backgroundColor:'#F2F2F2',width:40,height:40,borderRadius:10,padding:5,alignSelf:'flex-end'}}
    onPress={() => {
      const toggle = toggleDrawer(openDrawer);
      setOpenDrawer(toggle);
    }}
    >
      <AntDesign name="filter" style={{fontSize:24}} />
    </TouchableOpacity>
    <View style={{marginBottom:20}}>
      <Text style={{marginVertical:20}}>Service required:</Text>
      <RNPicker
            dataSource={service.dataSource}
            dummyDataSource={service.dataSource}
            defaultValue={false}
            pickerTitle={"Service required"}
            showSearchBar={false}
            disablePicker={false}
            changeAnimation={"none"}
            showPickerTitle={true}
            pickerStyle={styles.pickerStyle}
            pickerItemTextStyle={styles.listTextViewStyle}
            selectedLabel={service.selectedText}
            placeHolderLabel={service.placeHolderText}
            selectLabelTextStyle={styles.selectLabelTextStyle}
            placeHolderTextStyle={styles.placeHolderTextStyle}
            dropDownImageStyle={styles.dropDownImageStyle}
            dropDownImage={require("../../assets/res/ic_drop_down.png")}
            selectedValue={(index, item) => selectedService(index, item)}
          />
      </View>

    <View style={{marginBottom:40}}>
      <Text style={{marginVertical:20}}>Location</Text>
      <RNPicker
            dataSource={location.dataSource}
            dummyDataSource={location.dataSource}
            defaultValue={false}
            pickerTitle={"Select location"}
            showSearchBar={true}
            disablePicker={false}
            changeAnimation={"none"}
            searchBarPlaceHolder={"Search....."}
            showPickerTitle={true}
            pickerStyle={styles.pickerStyle}
            pickerItemTextStyle={styles.listTextViewStyle}
            selectedLabel={location.selectedText}
            placeHolderLabel={location.placeHolderText}
            selectLabelTextStyle={styles.selectLabelTextStyle}
            placeHolderTextStyle={styles.placeHolderTextStyle}
            dropDownImageStyle={styles.dropDownImageStyle}
            dropDownImage={require("../../assets/res/ic_drop_down.png")}
            selectedValue={(index, item) => selectedLocation(index, item)}
          />
      </View>
    <SolidButton text="Search" onPress={() => getValue()}/>
    <SolidButton text="Reset" onPress={() => searchApi('','')}/>

    </View>
  );
  }

  return (
  <View style={{flex:1,alignItems:'center'}}>
  <MenuDrawer
          open={openDrawer}
          drawerContent={drawerContent()}
          drawerPercentage={75}
          animationTime={250}
          overlay={true}
          opacity={0.4}
        >
  <View style={{flex:1,margin:30}}>

        <View style={{flexDirection:'row',marginBottom:15}}>

            <TouchableOpacity
              style={{backgroundColor:'rgb(1,198,191)',width:40,height:40,borderRadius:10,padding:5,alignSelf:'flex-start'}}
              onPress={() => {
                console.log('Pressed');
                const toggle = toggleDrawer(openDrawer);
                setOpenDrawer(toggle);
              }}
              >
                <AntDesign name="filter" style={{fontSize:24,color:'white'}} />
            </TouchableOpacity>
            <Text style={{fontSize:24,fontWeight:'bold',marginBottom:20,marginLeft:60}}>Available Jobs</Text>
        </View>
      {errorMessage ? <Text>{errorMessage}</Text> :null }

      <ScrollView>
        <FlatList
            data={results}
            keyExtractor={(results)=>results.id}
            renderItem={({item}) =>{
              return(
                <LinearGradient colors={['rgb(1,206,201)', 'rgb(1,198,191)','rgb(3,184,177)']} style={styles.card}>
                  <View>
                    <TouchableOpacity onPress={() => navigation.navigate('JobDetail', {id:item.jobid})}>
                      <JobDetail result={item} />
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              );
            }}
        />


      </ScrollView>
    </View>
  </MenuDrawer>
  </View>
  );
};

const styles= StyleSheet.create({
  Drawer:{flex:1,
          alignItems:'center',
          backgroundColor: "#FEFEFE",
          padding: 20,
          shadowColor: "#000",
          shadowOffset: {
          	width: 0,
          	height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3
        },
        container: {
    flex: 1,
  },

  searchBarContainerStyle: {
    marginBottom: 10,
    flexDirection: "row",
    height: 40,
    shadowOpacity: 1.0,
    shadowRadius: 5,
    shadowOffset: {
      width: 1,
      height: 1
    },
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "#d3d3d3",
    borderRadius: 10,
    elevation: 3,
    marginLeft: 10,
    marginRight: 10
  },

  selectLabelTextStyle: {
    color: "#000",
    textAlign: "left",
    width: "99%",
    padding: 10,
    flexDirection: "row"
  },
  placeHolderTextStyle: {
    color: "#D3D3D3",
    padding: 10,
    textAlign: "left",
    width: "99%",
    flexDirection: "row"
  },
  dropDownImageStyle: {
    marginLeft: 10,
    width: 10,
    height: 10,
    alignSelf: "center"
  },
  listTextViewStyle: {
    color: "#000",
    marginVertical: 10,
    flex: 0.9,
    marginLeft: 20,
    marginHorizontal: 10,
    textAlign: "left"
  },
  pickerStyle: {
    marginLeft: 18,
    elevation:3,
    paddingRight: 25,
    marginRight: 10,
    marginBottom: 2,
    shadowOpacity: 1.0,
    shadowOffset: {
      width: 1,
      height: 1
    },
    borderWidth:1,
    shadowRadius: 10,
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "#d3d3d3",
    borderRadius: 5,
    flexDirection: "row"
  },
  card:{
    marginVertical:5,
    borderRadius:20,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4},


});

export default JobListScreen;
