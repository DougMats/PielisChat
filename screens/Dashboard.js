import React, { useState, useEffect, useRef, useContext } from 'react';
import { RefreshControl, SafeAreaView, StatusBar, StyleSheet, Modal, View, Text, Image, ActivityIndicator, TouchableOpacity, ScrollView, ImageBackground, Dimensions } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import _ from 'lodash';
import Swiper from 'react-native-swiper'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import { colorBeta, colorGamma, colorEpsilon, colorDseta, colorAlfa } from '../Colors.js'
import { base_url, ApiCrm, Api, ApiWhatsapp } from '../Env';
import UserContext from '../contexts/UserContext'

import TopBar from '../components/dashboard/TopBar.js';
import Search from '../components/dashboard/Search.js';
import Menu from '../components/Menu.js';


// import TopSearch from '../components/TopSearch.js';
// import TopMenuFirst from '../components/TopMenuFirst.js';
//import TopMenuSecund from '../components/TopMenuSecund.js';

import NewMessage from '../components/dashboard/newMessage.js'
import UserMessage from '../components/dashboard/userMessage.js'
import UserCard from '../components/dashboard/userCard.js'
import BarSelects from '../components/dashboard/BarSelects.js';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Dashboard(props) {
  console.log("dashboard")

  const userDetails = useContext(UserContext)

  const [Load, setLoad] = useState(true); // proceso de carga de informacion
  const [data, setdata] = useState([]);// almacenamiento de los mensajes segun el asesor
  const [dataFilter, setdataFilter] = useState([]); // usuarios filtrados por nombre




  const [TopMenu, setTopMenu] = useState(false); // menu
  const [TopMenuSearch, setTopMenuSearch] = useState(false); //menu de busqueda

  const [paginate, setpaginate] = useState(0); //Swiper
  const [section, setsection] = useState("chats"); //Swiper



  const scrollRef = useRef() // referencia del scroll view
  const [refreshing, setRefreshing] = useState(false); // refreshing the scrollview





  // const [firstMenu, setfirstMenu] = useState(true); // header
  const [selectList, setselectList] = useState([]); // lista de selecionados






  const [ViewAvatar, setViewAvatar] = useState(false); //mostrar data user
  const [ViewAvatarData, setViewAvatarData] = useState({}); // data user card



  const [modeView, setmodeView] = useState(false); // modal para cambiar de asesor
  const [asesoresList, setasesoresList] = useState([]);// lista de asesores de esta app
  const [ViewAsAsesor, setViewAsAsesor] = useState(null); // asesor seleccionado


  // 



  let randomCode
  if (props.route.params) { randomCode = props.route.params.randomCode }
  else { randomCode = 1 }






  useEffect(() => {
    if (userDetails.userDetails.name !== {}) {
      setdata(userDetails.userDetails.chats)
    }
    //   //console.log("effect dasboard")
    //   //setdata(userDetails.userDetails.chats)
    //   //setdata(chats)
    //   //Get();
    if (userDetails.userDetails.rol === "administrador") {
      GetAsesores()
    }
  }, [randomCode]);



  useEffect(() => {
    setLoad(false)
  }, [data]);






  //menu
  function openTopMenu() {
    setTopMenu(true);
  }

  function closeTopMenu() {
    setTopMenu(false);
  }

  //barra de busqueda filtrada
  function openTopMenuSearch() {
    setTopMenuSearch(true);
  }

  function closeTopMenuSearch() {
    setTopMenuSearch(false)
  }









  // para filtrar por el nombre
  async function search(text) {


    function bouncer(arr) {
      function filterer(arr) {
        return arr > 0 || isNaN(arr) === true;
      }
      arr = arr.filter(filterer);
      return arr;
    }


    // function rename(data) {}
    // let Data = rename(data)


    let disponible = bouncer(data);

    if (text !== "") {
      console.log("palabra", text)
      console.log("data total", data.length)
      console.log("data disponible", disponible.length)
      // for(var i in disponible){
      //   console.log(i, "--->", disponible[i].name)
      // }
      // let newData = _.filter(disponible, { 'name': text });
      //let newData = _.filter(disponible, ['name', "Dahiana"]);
      var newData = disponible.filter(obj => obj.name.includes(text))
      console.log("resultados : ", newData.length)
      setdataFilter(newData)
    }
    else {
      // setdataFilter([])
    }
  }










  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }





  //Sweiper
  function changeSection(e) {
    if (e === 0) { setpaginate(e); setsection("camera") }
    if (e === 1) { setpaginate(e); setsection("chats") }
    if (e === 2) { setpaginate(e); setsection("states") }
    if (e === 3) { setpaginate(e); setsection("calls") }
  }












  // ______________________ asesores u otros admins _____________________________ //
  async function GetAsesores() {
    await axios.get(base_url(ApiWhatsapp, `whatsapp/get/users`))
      .then(function (response) {
        setasesoresList(response.data);
      })
      .catch(function (error) { console.log(error, "???") });
  }

  //cambiar de usuario
  function settingViewAsAsesor(user) {
    //  setmodeView(false);
    setViewAsAsesor(user)
  }






  useEffect(() => {
    if (asesoresList.length !== 0) {
      for (var i in asesoresList) {
        if (asesoresList[i].name === userDetails.userDetails.name) {
          setViewAsAsesor(asesoresList[i])
        }
      }

    }
  }, [asesoresList.length]);







  useEffect(() => {
    if (ViewAsAsesor !== null) {
      if (ViewAsAsesor.name === userDetails.userDetails.name) {
        setLoad(true);
        setdata(userDetails.userDetails.chats);
        setmodeView(false)
        setLoad(false);
      }
      else {
        setLoad(true);
        let data = {
          id_user: ViewAsAsesor._id,
          rol: ViewAsAsesor.rol
        }
        getChatAsesor(data)
        console.log("case 2")
      }
    }
  }, [ViewAsAsesor]);




  async function getChatAsesor(data) {
    await axios.post(base_url(ApiWhatsapp, `whatsapp/get/chats`), data).then(function (response) {
      setdata(response.data);
      setmodeView(false)
      setLoad(false);
    })
      .catch(function (error) { console.log(error, "???") });
  }







  //console.log("ViewAsAsesor:", ViewAsAsesor)

  // ______________________ asesores u otros admins _____________________________ //



  // async function Get() {
  //   setRefreshing(true);
  //   console.log("Get()")
  //   let datas = userDetails.userDetails
  //   let chats
  //   let intro = { id_user: userDetails.userDetails._id, rol: userDetails.userDetails.rol }
  //   await axios.post(base_url(ApiWhatsapp, `whatsapp/get/chats`), intro)
  //     .then(function (response) {
  //       chats = response.data
  //     })
  //     .catch(function (error) { console.log(error, "???") });
  //   datas.chats = chats
  //   console.log("totalmensajes: ", chats.length)
  //   updateLocalStorageChats(datas)
  //   setRefreshing(false);
  // }




  async function Get() {
    console.log("refreshing to: ", ViewAsAsesor.name)
    //let data = { id_user: userDetails.userDetails._id, rol: userDetails.userDetails.rol }
    let data = {
      id_user: ViewAsAsesor._id,
      rol: ViewAsAsesor.rol
    }




    await axios.post(base_url(ApiWhatsapp, `whatsapp/get/chats`), data)
      .then(function (response) {
        setdata(response.data);
      })
      .catch(function (error) { console.log(error, "???") });
  }


  // async function updateLocalStorageChats(data) {
  //   console.log("to storage")
  //   console.log(data.chats.length)
  //   try {
  //     await AsyncStorage.setItem('@Passport', JSON.stringify(data));
  //     setUserDetails({ ...data })
  //     goToScreen("Home")
  //   }
  //   catch (error) {
  //     console.log("error", error)
  //   }
  // }



















  //clear selections
  function clear() {
    setselectList([]);
  }




  // useEffect(() => {
  //   //console.log("setting....")
  // }, [TopMenu, TopMenuSearch]);


  function SelectMany(value) {
    console.log("selec many", value)
    let array = { "id": value }
    // console.log("selecting on", array)
    if (selectList.length === 0) {
      setselectList([...selectList, array]);
    }
    else {
      let Updating = selectList.find(id => id.id == value)
      if (Updating === undefined) {
        //  console.log("no existe");
        setselectList([...selectList, array]);
      }
      else {
        // console.log("si existe");
        const update = selectList.filter(id => id.id !== value)
        setselectList(update)
      }
    }
  }

  //mostrar - ocultar mini foto del usuario
  function showAvatar(avatar) {
    console.log("show avatar")
    setViewAvatarData(avatar)
    setViewAvatar(true)
  }

  function hiddenAvatar() {
    setViewAvatarData({})
    setViewAvatar(false)
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={colorGamma} barStyle="light-content" />
      <ImageBackground
        source={require('../images/background_1.png')}
        blurRadius={0}
        style={StyleSheet.absoluteFillObject}>

        {ViewAvatar === true && ViewAvatarData !== {} &&
          <UserCard data={ViewAvatarData} hiddenAvatar={hiddenAvatar} goToScreen={goToScreen} />
        }

        {selectList.length > 0 &&
          <BarSelects
            selectList={selectList}
            clear={clear}
          />
        }

        {TopMenuSearch === false &&
          <TopBar
            openTopMenuSearch={openTopMenuSearch}
            openTopMenu={openTopMenu}
          />
        }

        {TopMenuSearch === true &&
          <Search
            closeTopMenuSearch={closeTopMenuSearch}
            search={search}
            data={dataFilter}
            goToScreen={goToScreen}
          />
        }

        {/*
         <TopMenuFirst openTopMenu={openTopMenu} openTopMenuSearch={openTopMenuSearch} />
         <TopMenuSecund section={section} changeSection={changeSection} data={userDetails.userDetails.chats} />
        */}


        {/* <Swiper showsButtons={true} showsButtons={false} onIndexChanged={changeSection} showsPagination={false} index={paginate} style={{
          marginTop: 90  //145
        }} loop={false}>
      */}


        <View style={{
          width: windowWidth,
          paddingBottom: TopMenuSearch === true ? 200 : 80
        }}>

          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={Get}
              />
            }
          >


            {/* {userDetails.userDetails !== {} && userDetails.userDetails.chats.length === 0 &&
                <View style={{ marginTop: "50%", justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                  <View style={{ borderRadius: 12, padding: 20, backgroundColor: "white", width: "80%", justifyContent: "center", alignContent: "center", alignItems: "center", flexDirection: "column" }}>
                    {refreshing === true ?
                      <ActivityIndicator size={60} color={"#999"} />
                      :
                      <Icon name="alert-circle-outline" fill={"#999"} width={60} height={60} />
                    }
                    <Text style={{ fontSize: 18, color: "#777", textAlign: "center" }}>No hay chats registrados.{'\n'}Inicia una nueva conversación.{'\n'}</Text>
                    <Text style={{ fontSize: 14, color: "#777", textAlign: "center" }}>
                      También puedes arrastrar hacia abajo para actualizar.
                    </Text>
                  </View>
                </View>
              } */}



            {
              Load === true &&
              <View style={[{
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                height: windowHeight - 50,
              }]}>
                <ActivityIndicator size={30} color="white" />
              </View>
            }


            {
              // userDetails.userDetails !== {} && userDetails.userDetails.chats.length !== 0 &&
              // userDetails.userDetails.chats.map((i, key) => {

              Load === false && userDetails.userDetails !== {} && data.length !== 0 &&


              data.map((i, key) => {
                if (i !== null) {
                  if (selectList.length === 0) {
                    i.selected = false
                    i.back = "red"
                  }
                  else {
                    selectList.map((s, key) => {
                      if (s.id === i.jid) {
                        i.selected = true;
                      }
                      else {
                        i.selected = false;
                      }
                    })
                  }
                  if (!i.name) { i.name = i.jid.split("@")[0] }
                  if (i.name === ".") { i.name = i.jid.split("@")[0] }



                  return (
                    <UserMessage
                      showAvatar={showAvatar}
                      key={key}
                      data={i}

                      goToScreen={goToScreen}
                      SelectMany={SelectMany}
                      selectList={selectList.length}

                    />
                  )
                }
              })
            }


          </ScrollView>
        </View>



        {/* {!Load && data.length === 0 &&
                <View style={{ width: "100%", justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                <View style={{ width: 300, height: 300, justifyContent: "center" }}>
                  <Text style={{ fontSize: 24, position: "absolute", zIndex: 999, textAlign: "center", width: 300, height: 90, fontWeight: "bold", paddingHorizontal: 40 }}>
                    Aun no tienes chats con tus contactos</Text>
                  <Image style={{ width: null, height: null, resizeMode: "center", flex: 1 }} source={require('../images/info.png')} />
                </View> 
                </View>
              } *

         

          {/* <View style={{ width: windowWidth, height: 200, backgroundColor: "orange" }}><Text>states</Text></View>
          <View style={{ width: windowWidth, height: 200, backgroundColor: "yellow" }}><Text> calls</Text></View> 
            */}



        {/* 
        </Swiper>  */}

        {Load === false && userDetails.userDetails.rol === "administrador" &&
          <TouchableOpacity
            style={{
              position: "absolute", zIndex: 999, backgroundColor: colorBeta, bottom: 75, right: 15, width: 60, height: 60, borderRadius: 60,
              justifyContent: "center", alignItems: "center", alignContent: "center"
            }}
            onPress={() => setmodeView(true)}>
            <Icon name="settings" fill={"white"} width={40} height={40} />
          </TouchableOpacity>
        }


        {Load === false &&
          <NewMessage />
        }


        {userDetails.userDetails !== {} &&
          <Menu level={3} show={TopMenu} closeTopMenu={closeTopMenu} goToScreen={goToScreen} />
        }
      </ImageBackground>








      <Modal animationType="slide" transparent={true} visible={modeView}>
        {Load &&
          <View style={[StyleSheet.absoluteFillObject, { backgroundColor: "rgba(0,0,0,0.5)", position: "absolute", justifyContent: "center", alignContent: "center", alignItems: "center", zIndex: 9999999999 }]}>
            <ActivityIndicator color={"white"} size={60} />
          </View>
        }
        <View style={styles.modalWrap}>
          <TouchableOpacity
            style={styles.BtnUpper}
            onPress={() => setmodeView(false)}>
            <Icon name="close-circle" fill={colorBeta} width={40} height={40} />
          </TouchableOpacity>
          <View style={styles.modalWrapper}>
            <View style={styles.modalTitle}>
              <Text style={styles.modalTitleText}>Filtar por cada usuario para ver sus chats</Text>
            </View>
            <View style={styles.modalSubtitle}>
              <Text style={styles.modalSubtitleText}>asesores</Text>
            </View>
            <ScrollView>
              {asesoresList.map((i, key) => {
                if (i.rol === "asesor") {
                  return (
                    <TouchableOpacity
                      style={styles.modalOptionBTN}
                      key={key}
                      onPress={() => settingViewAsAsesor(i)}>
                      {/* <Text style={styles.modalOptionBTNText}>{i._id}</Text>
                      <Text style={styles.modalOptionBTNText}>{i.phone}</Text> */}
                      {
                        ViewAsAsesor !== null && ViewAsAsesor.id_user === i.id_user &&
                        <Icon name="checkmark-circle-2" fill={colorBeta} width={30} height={30} style={{ top: 10, right: 10 }} />
                      }
                      <Text style={styles.modalOptionBTNText}>{i.name}
                      </Text>
                      {/* <Text style={styles.modalOptionBTNText}>{i.password}</Text>
                      <Text style={styles.modalOptionBTNText}>{i.queue}</Text>
                      <Text style={styles.modalOptionBTNText}>{i.rol}</Text>
                      <Text style={styles.modalOptionBTNText}>{i.id_user}</Text> */}
                    </TouchableOpacity>
                  )
                }
              })}
              <View style={styles.modalSubtitle}>
                <Text style={styles.modalSubtitleText}>otros administradores</Text>
              </View>
              {asesoresList.map((i, key) => {
                if (i.rol === "administrador") {
                  return (
                    <TouchableOpacity
                      style={styles.modalOptionBTN}
                      key={key}
                      onPress={() => settingViewAsAsesor(i)}>
                      {
                        ViewAsAsesor !== null && ViewAsAsesor.id_user === i.id_user &&
                        <Icon name="checkmark-circle-2" fill={colorBeta} width={30} height={30} style={{ top: 10, right: 10 }} />
                      }
                      <Text style={styles.modalOptionBTNText}>{i.name}
                      </Text>
                      {userDetails.userDetails.name === i.name &&
                        <Text style={{ backgroundColor: colorGamma, top: 15, left: 5, lineHeight: 25, fontSize: 14, textAlign: "center", color: "white", width: 25, height: 25, borderRadius: 25 }}>Tú</Text>}
                    </TouchableOpacity>
                  )
                }
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>


    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  modalWrap: {
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  modalWrapper: {
    width: "90%",
    backgroundColor: "white",
    maxHeight: "80%",
    borderRadius: 20,
    overflow: "hidden"
  },
  BtnUpper: {
    position: "absolute",
    zIndex: 999,
    backgroundColor: "white",
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  modalTitle: {
    backgroundColor: colorBeta,
    padding: 10
  },
  modalTitleText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 18
  },
  modalSubtitle: {
    backgroundColor: colorGamma,
    paddingHorizontal: 25,
    paddingVertical: 5
  },
  modalSubtitleText: {
    textAlign: "center",
    color: "white",
    fontSize: 14,
    textTransform: "capitalize"
  },
  modalOptionBTN: {
    borderBottomColor: colorGamma,
    borderBottomWidth: 1,
    height: 50,
    flexDirection: "row",
    justifyContent: "center"
  },
  modalOptionBTNText: {
    textAlign: "center",
    lineHeight: 50,
    fontSize: 16
  },
});

export default Dashboard;