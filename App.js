import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import * as firebase from 'firebase';
import LandingScreen from './src/screens/LandingScreen';
import HELoginScreen from './src/screens/HELoginScreen';
import DWLoginScreen from './src/screens/DWLoginScreen';
import UserLoading from './src/screens/UserLoading';
import RegisterScreen from './src/screens/RegisterScreen';
import HELoading from './src/screens/HELoading';
import AddJob from './src/screens/AddJob';
import JobDetailScreen from './src/screens/JobDetailScreen';
import JobApplicants from './src/screens/JobApplicants';


const firebaseConfig = {
    apiKey: "AIzaSyDjGlUtWoQB5KUgbgMXvZkJg2dcp14B9Z4",
    authDomain: "twice-285f4.firebaseapp.com",
    databaseURL: "https://twice-285f4.firebaseio.com",
    projectId: "twice-285f4",
    storageBucket: "twice-285f4.appspot.com",
    messagingSenderId: "229085541361",
    appId: "1:229085541361:web:89f655f9341d7af9104a50"
  // Initialize Firebase

};

firebase.initializeApp(firebaseConfig);

const navigator = createStackNavigator(
  {
  Landing: LandingScreen,
  HELogin : HELoginScreen,
  DWLogin : DWLoginScreen,
  UserLoading : UserLoading,
  Register : RegisterScreen,
  HELoading : HELoading,
  AddJob : AddJob,
  JobDetail : JobDetailScreen,
  JobApplicants : JobApplicants


},
{
  initialRouteName : 'Landing',

  defaultNavigationOptions: {
    header:null
  }
});

export default createAppContainer(navigator);
