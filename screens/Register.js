import React, { useState, useEffect, useContext } from 'react';
import { Dimensions, StatusBar, Image, StyleSheet, TextInput, ImageBackground, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { colorAlfa, colorBeta, } from '../Colors.js'
import AsyncStorage from '@react-native-community/async-storage'
import UserContext from '../contexts/UserContext'
import {
  base_url, ApiCrm, ApiWhatsapp
  //serverCrm, base_url, file_server1
} from '../Env';
import Toast from 'react-native-simple-toast';


import axios from 'axios';
import md5 from 'md5';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function Register(props) {
  const [editable, setEditable] = useState(true)
  const [BtnDisable, setBtnDisable] = useState(false)
  const [Load, setLoad] = useState(false)
  const { userDetails, setUserDetails } = useContext(UserContext)

  const [formInfo, setFormInfo] = useState({
    email: '',
    password: ''
  })

  function onChangeText(text, key) {
    setFormInfo({
      ...formInfo,
      [key]: text
    })
  }


  // const _storeData = async (data) => {
  //   try {
  //     await AsyncStorage.setItem('@Passport', JSON.stringify(data));
  //     setUserDetails({ ...data })
  //     goToScreen("Home")
  //   }
  //   catch (error) {
  //     console.log("error", error)
  //   }
  // }

  async function sendForm() {
    if (formInfo.email === "" || formInfo.password === "") {
      Toast.show("Introduce tus datos de acceso");
    }
    else {
      //setLoad(true)
      const data = { ...formInfo }
      let passmd5 = md5(data.password);
      data.pass = passmd5
      console.log("send form", data)
      const response = await axios({ method: "post", url: base_url(ApiWhatsapp, `whatsapp/auth`, data), data })
      console.log("response login --->", response.data);





      //   // data.fcmToken = notificationToken
      //   // if (data.email === '' || data.password === '') {
      //   //   Toast.show("Introduce tus datos de acceso")
      //   //   return false;
      //   // }
      //   // setLoad(true)
      //   // setBtnDisable(true)
      //   // console.log(base_url(serverCrm, `telesalud/authenticate/medic`))

      //   axios.post(base_url(serverCrm, `telesalud/authenticate/medic`), data).then(function (response) {
      //     if (response.data[0] === true) {
      //       _storeData(response.data[1])
      //     }
      //     if (response.data[0] === false) {
      //       setmsg("Error! \n" + response.data[1]);
      //       seterror(true);
      //     }
      //     setLoad(false)
      //   })

      //   //   .catch(function (error) {
      //   //setLoad(!Load)
      //   //     setBtnDisable(false)
      //   //     console.log(error, 'Error al enviar formulario')
      //   //     Toast.show("Email or password was not correct")
      //   //   })
      //   //   .then(function () { });



       setLoad(false)
    }
  }



  // useEffect(() => {
  //   if (error === true) {
  //     setTimeout(() => {
  //       setmsg("");
  //       seterror(false);
  //     }, 3000);
  //   }
  // }, [error]);




  function goToScreen(screen) {
    props.navigation.navigate(screen)
  }


  return (
    <ImageBackground source={require('../images/login.png')}
      style={styles.wrap}>

      <StatusBar translucent backgroundColor="transparent" />
      <View style={{
        position: "absolute",
        top: "25%",
        zIndex: 999,
        width: "100%",
        height: 100
      }}>
        <Image
          //source={require('../images/logo-color.png')}
          source={require('../images/isotype.png')}
          style={{ width: null, height: null, flex: 1, resizeMode: "center" }} />
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
              style={styles.input} value={formInfo.email}
              placeholder="email"
              placeholderTextColor="#777"
              keyboardType={'email-address'}
              editable={editable}
              onChangeText={text => onChangeText(text, 'email')}
            />
            {/* <Text style={styles.error}>Error al ingresar Email</Text> */}
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
            {/* <Text style={styles.error}>Error al ingresar Password</Text> */}
          </View>
          {!Load &&
            <TouchableOpacity style={styles.btn} onPress={() => sendForm()}>
              <Text style={styles.btnText}>Acceder</Text>
            </TouchableOpacity>
          }
          {Load &&
            <ActivityIndicator color={colorBeta} size={50} />
          }
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
    color: "red", textAlign: "center"
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
  foot: { marginTop: 15 },
  footText: { color: "#ccc" },
});