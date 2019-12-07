import React, {useState, Component} from 'react';
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
  const[term,setTerm] = useState('');
  const[openDrawer,setOpenDrawer]=useState(false);
  const[searchApi,results,errorMessage] = useResults();



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
  ],
  placeHolderText: "Select service required",
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
    style={{backgroundColor:'#F2F2F2',width:40,height:40,borderRadius:10,padding:5}}
    onPress={() => {
      const toggle = toggleDrawer(openDrawer);
      setOpenDrawer(toggle);
    }}
    >
      <AntDesign name="filter" style={{fontSize:24,alignSelf:'flex-start'}} />
    </TouchableOpacity>
    <Text>Service required:</Text>
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


    <Text>Location</Text>
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
    <SolidButton text="Search" onPress={() => getValue()}/>


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

        <View style={{flexDirection:'row',marginBottom:15}}>

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
  }
});

export default JobListScreen;
