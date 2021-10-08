import React, { useState, useEffect, useRef, useContext } from 'react';
import { RefreshControl, SafeAreaView, TextInput, StatusBar, StyleSheet, View, Text, Image, ActivityIndicator, TouchableOpacity, ScrollView, ImageBackground, Dimensions, Touchable } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import _ from 'lodash';
import Swiper from 'react-native-swiper'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import { colorBeta, colorGamma, colorEpsilon, colorDseta, colorAlfa } from '../../Colors.js'
import { base_url, ApiCrm, Api, ApiWhatsapp } from '../../Env';
import UserContext from '../../contexts/UserContext'


function NewMessage() {
  const [display, setdisplay] = useState(false);
  const [number, setnumber] = useState("");

  function onChangeText(text) {
    setnumber(text)
  }

  function getContactList() {
    console.log("lista de contactos")
  }
  
  return (
    <>
      {
        display === true ?
          <View style={{ position: "absolute",  width: "100%", height:"100%", backgroundColor:"rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center", alignContent: "center" }}>
            <View style={{ width: "90%", backgroundColor: "white",  overflow: "hidden", borderRadius: 12, flexDirection: "column", alignItems: "center", alignContent: "center" }}>
              <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-around", padding: 10, backgroundColor: colorGamma, }}>
                <Text style={{ lineHeight: 35,color:"white", fontSize: 16, width: "75%", fontWeight:"bold" }}>Escribe el número de contacto.</Text>
                <View style={{ flexDirection: "row", width: "25%" }}>
                  <TouchableOpacity style={{ margin: 5 }}>
                    <Icon name="people-outline" fill={colorDseta} width={30} height={30} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ margin: 5 }} onPress={() => setdisplay(!display)}>
                    <Icon name="close-outline" fill={colorDseta} width={30} height={30} />
                  </TouchableOpacity>
                </View>
              </View>
              <TextInput
                style={{ backgroundColor: "rgba(0,0,0,0.1)", height: 40, textAlign:"center", borderRadius: 40, width: "80%", marginVertical: 15 }}
                value={number}
                placeholder={"Ingresa un número de contacto"}
                onChangeText={text => onChangeText(text)}

              />
              <TouchableOpacity style={{marginBottom:20, paddingVertical:10, paddingHorizontal:25, borderRadius:40, borderColor:colorBeta, borderWidth:1}}>
                <Text style={{color:colorBeta, textAlign:"center", fontSize:14, fontWeight:"600"}}>Aceptar</Text>
              </TouchableOpacity>
            </View>
          </View>
          :
          <TouchableOpacity onPress={() => setdisplay(!display)} style={{ position: "absolute", right: 15, bottom: 10, backgroundColor: colorBeta, borderRadius: 30, width: 60, height: 60, alignItems: "center", alignContent: "center", justifyContent: "center" }}>
            <Icon name="message-square" fill={colorDseta} width={30} height={30} />
          </TouchableOpacity>
      }
    </>
  )
}
export default NewMessage