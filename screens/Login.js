import React, { useState, useEffect, useContext } from 'react';
import { Dimensions, StatusBar, Image, StyleSheet, TextInput, ImageBackground, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { colorAlfa, colorBeta, } from '../Colors.js'
import AsyncStorage from '@react-native-community/async-storage'
import UserContext from '../contexts/UserContext'
import messaging from '@react-native-firebase/messaging';
import { base_url, ApiCrm, Api, ApiWhatsapp } from '../Env';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
// back 127.0.0.1:3001/whatsapp/connect 
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Login(props) {

  const [editable, setEditable] = useState(true)
  const [notificationToken, setNotificationToken] = React.useState('')
  const [BtnDisable, setBtnDisable] = useState(false)
  const [Load, setLoad] = useState(false)
  const { userDetails, setUserDetails } = useContext(UserContext)




  React.useEffect(() => {
    async function getToken2() {
      const fcmToken = await messaging().getToken();
      if (fcmToken) { setNotificationToken(fcmToken) }
      else { console.log('user doesnt have a device token yet') }
      console.log(fcmToken, "TOKEN")
    }
    getToken2()
  }, [])






  const [formInfo, setFormInfo] = useState({
    //phone: '3152077862', //por defecto
    //password: 'ad17urca'

    phone: '3164737651', // valentina
    password: 'ad17urca'

    // phone: '3156311780', //luisa orozco
    // password: '123'
  })

  function onChangeText(text, key) {
    setFormInfo({
      ...formInfo,
      [key]: text
    })
  }

  async function sendForm() {
    if (formInfo.phone === "" || formInfo.password === "") {
      Toast.show("Introduce tus datos de acceso");
    }
    else {
      setLoad(true)
      const data = { ...formInfo }
      data.fcmToken = notificationToken

      console.log("data:", data)
      getSession(data)
    }
  }


  async function getSession(data) {
    axios.post(base_url(ApiWhatsapp, `whatsapp/auth`), data).then(function (response) {
      getChats(response.data)
      //_storeData(response.data)
    })
      .catch(function (error) {
        console.log(":::", error)
        Toast.show('Error de conexión');
        setTimeout(() => {
          setLoad(false)
        }, 3000);
      })
  }

  async function getChats(data) {
    let datas = data
    let chats
    let intro = { id_user: datas._id, rol: datas.rol }
    await axios.post(base_url(ApiWhatsapp, `whatsapp/get/chats`), intro)
      .then(function (response) {
        chats = response.data
      })
      .catch(function (error) { console.log(error, "???") });
    datas.chats = chats
    //datas.chats = []
    _storeData(data)
  }

  const _storeData = async (data) => {
    try {
      await AsyncStorage.setItem('@Passport', JSON.stringify(data));
      setUserDetails({ ...data })
      goToScreen("Home")
    }
    catch (error) {
      console.log("error", error)
    }
  }

  function goToScreen(screen) {
    setLoad(false)
    props.navigation.navigate(screen)
  }

  return (
    <ImageBackground source={require('../images/login.png')} style={styles.wrap}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{
        position: "absolute",
        top: "25%",
        zIndex: 999,
        width: "100%",
        height: 100
      }}>
        <Image source={require('../images/isotype.png')} style={{ width: null, height: null, flex: 1, resizeMode: "center" }} />
      </View>
      <View style={styles.wrapper}></View>
      <View style={styles.body}>
        <View style={styles.form}>
          <View style={styles.row}>
            <View style={styles.label}>
              <Icon name="phone" fill={colorBeta} width={25} height={25} />
              <Text style={styles.title}>Teléfono</Text>
            </View>
            <TextInput
              style={styles.input} value={formInfo.phone}
              placeholder="Teléfono"
              placeholderTextColor="#777"
              keyboardType={'number-pad'}
              editable={editable}
              onChangeText={text => onChangeText(text, 'phone')}
            />
          </View>
          <View style={styles.row}>
            <View style={styles.label}>
              <Icon name="lock" fill={colorBeta} width={25} height={25} />
              <Text style={styles.title}>Password</Text>
            </View>
            <TextInput
              secureTextEntry
              style={styles.input}
              value={formInfo.password}
              placeholder="password"
              placeholderTextColor="#777"
              onChangeText={text => onChangeText(text, 'password')}
            />
          </View>
          <TouchableOpacity style={styles.btn} onPress={() => sendForm()}>
            <Text style={styles.btnText}>Acceder</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.options}>
          <TouchableOpacity onPress={() => goToScreen("Register")} style={styles.optionsBtn}>
            <Text style={styles.optionsBtnText}>Registrarme</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => goToScreen("Forgot")} style={styles.optionsBtn}>
            <Text style={styles.optionsBtnText}>Recuperar Clave</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.foot}>
          <Text style={styles.footText}>by © PDT. Agencia de Medios</Text>
        </View>
      </View>
      {
        Load &&
        <TouchableOpacity onPress={() => setLoad(false)} style={{ backgroundColor: "rgba(0,0,0,0.8)", width: "100%", height: "100%", position: "absolute", zIndex: 90000, justifyContent: "center", alignContent: "center", alignItems: "center" }}>
          <ActivityIndicator color={colorBeta} size={75} style={{ position: "absolute", zIndex: 5 }} />
          <View style={{ width: 50, height: 50, }}>
            <Image source={require('../images/isotype.png')} style={{ width: null, height: null, flex: 1, resizeMode: "center" }} />
          </View>
        </TouchableOpacity>
      }
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
    width: "100%",
    height: "100%"
  },
  wrapper: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: windowWidth,
    borderTopWidth: ((windowHeight * 40) / 100) / 2,
    borderRightColor: "transparent",
    borderTopColor: "rgba(255,255,255,1)",
    transform: [{ rotate: "180deg" }],
  },
  body: {
    backgroundColor: "rgba(255,255,255,1)",
    height: "60%",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-around"
  },

  form: {
    width: "80%",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  row: {
    width: "100%",
    flexDirection: "column",
    marginBottom: 30
  },
  label: {
    paddingLeft: 5,
    flexDirection: "row",
    marginBottom: 10
  },
  title: {
    fontSize: 16,
    color: colorBeta,
    fontWeight: "600",
    marginLeft: 10
  },
  input: {
    paddingHorizontal: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 12
  },
  error: {
    color: "red",
    textAlign: "center"
  },
  btn: {
    backgroundColor: colorBeta,
    width: "70%",
    padding: 10,
    borderRadius: 5
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "800"
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 10
  },
  optionsBtn: {
    borderColor: colorAlfa,
    padding: 8,
    borderWidth: 1,
    width: "45%",
    borderRadius: 12
  },
  optionsBtnText: {
    textAlign: "center",
    color: colorAlfa,
    fontWeight: "800",
    fontSize: 14
  },
  foot: {
    marginTop: 15
  },
  footText: {
    color: "#ccc"
  },
});