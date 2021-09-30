import React, { useState, useEffect, useRef, useContext } from 'react';
import { RefreshControl, SafeAreaView, StatusBar, StyleSheet, View, Text, Image, ActivityIndicator, TouchableOpacity, ScrollView, ImageBackground, Dimensions } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import _ from 'lodash';
import Swiper from 'react-native-swiper'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import { colorBeta, colorGamma, colorEpsilon, colorDseta } from '../../Colors.js'
import { base_url, ApiCrm, Api, ApiWhatsapp } from '../../Env';
import UserContext from '../../contexts/UserContext'

function NewMessage() {


  function getContactList() {
console.log("lista de contactos")
  }
  return (

    <TouchableOpacity onPress={() => getContactList()} style={{ position: "absolute", right: 15, bottom: 10, backgroundColor: colorBeta, borderRadius: 30, width: 60, height: 60, alignItems: "center", alignContent: "center", justifyContent: "center" }}>
      <Icon name="message-square" fill={colorDseta} width={30} height={30} />
    </TouchableOpacity>

  )
}
export default NewMessage