import React, { useState, useEffect, useContext } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import UserContext from '../contexts/UserContext'
import RequestPermission from '../permission.js';
import Splash from './Splash'
import Login from './Login'
import Dashboard from './Dashboard'
import DashboardAdmin from './DashboardAdmin'

function HomeScreen(props) {
  const [isSplashing, setIsSplashing] = useState(true)
  const { setUserDetails } = useContext(UserContext)
  const userDetails = useContext(UserContext)
  const _retrieveData = async () => {
    try {
      const value = JSON.parse(await AsyncStorage.getItem('@Passport'));
      if (value) {
        setUserDetails(value)
        setTimeout(() => {
          setIsSplashing(false)
        }, 10000)
        return value
      } else {
        setTimeout(() => {
          setIsSplashing(false)
        }, 3000)
      }
    } catch (error) { }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      RequestPermission().then(_ => {
        console.log('requested!');
      });
    }
    _retrieveData();
  }, [])

  if (isSplashing === true) {
    setTimeout(() => {
      setIsSplashing(false)
    }, 3000)
    return <Splash />
  }

  console.log("rol ---> ", userDetails.userDetails.rol)
  if (isSplashing === false) {
    if (userDetails.userDetails._id !== null) {
      return <Dashboard {...props} />
      // if (userDetails.userDetails.rol === "administrador") {
      //   return <DashboardAdmin {...props} />
      // }
      // else {
      //   return <Dashboard {...props} />
      // }
    }
    else {
      if (userDetails.userDetails._id === null || userDetails.userDetails._id === undefined) {
        return <Login {...props} />
      }
    }
  }
}
export default HomeScreen