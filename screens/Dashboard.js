import React, { useState, useEffect, useRef, useContext } from 'react';
import { RefreshControl, SafeAreaView, StatusBar, StyleSheet, Modal, View, Alert, Text, Image, ActivityIndicator, TouchableOpacity, ScrollView, ImageBackground, Dimensions } from 'react-native';
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
import NewMessage from '../components/dashboard/newMessage.js'
import UserMessage from '../components/dashboard/userMessage.js'
import UserCard from '../components/dashboard/userCard.js'
import BarSelects from '../components/dashboard/BarSelects.js';

// import TopSearch from '../components/TopSearch.js';
// import TopMenuFirst from '../components/TopMenuFirst.js';
//import TopMenuSecund from '../components/TopMenuSecund.js';

import Notification from '../components/notification/Notification.js';
import messaging from '@react-native-firebase/messaging';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Dashboard(props) {
  //console.log("screen dashboard")
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




  let randomCode
  if (props.route.params) { randomCode = props.route.params.randomCode }
  else { randomCode = 1 }

  useEffect(() => {

    console.log("effect in randomcode")
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
    console.log("effect in data")
    setLoad(false)
  }, [data]);


  /*________________________ notification init ___________________________*/
  const [notificationTitle, setnotificationTitle] = useState("");
  const [notificationBody, setnotificationBody] = useState(false);
  const [notificationMessage, setnotificationMessage] = useState(false);
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      //console.log(" *** notification __________________ ***")
      setnotificationMessage(remoteMessage.data.message)
      setnotificationTitle(remoteMessage.notification.title);
      setnotificationBody(remoteMessage.notification.body);
    });
    return unsubscribe;
  }, []);



  useEffect(() => {
    if (notificationBody !== false) {
      setTimeout(() => {
        console.log("effect dismount component notification")
        setnotificationBody(false)
        setnotificationTitle("")
        setnotificationMessage(false)
      }, 5000);
    }
  }, [notificationBody]);


  function updateStorage() {
    console.log("function ..... in dashboard ..... update storage")
    setnotificationBody(false)
    setnotificationTitle("")
    setnotificationMessage(false)
    setdata(userDetails.userDetails.chats)
  }

  console.log("this import state by my fuckingcomponent -> notificationBody: ", notificationBody)
  /*________________________ notificationend ___________________________*/




















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

    let disponible = bouncer(data);

    if (text !== "") {
      console.log("palabra", text)
      console.log("data total", data.length)
      console.log("data disponible", disponible.length)
      let expresion = new RegExp(`${text}.*`, "i");
      let newData = disponible.filter(thisFilter => expresion.test([thisFilter.name, thisFilter.jid]));
      console.log("resultados : ", newData.length)
      setdataFilter(newData)
    }
  }






  function goToScreen(screen, data, users) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data, users })
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



















  //seleccion multiple clear
  function clearSelectMany() {
    setselectList([]);
  }

  //seleccion multiple create
  function SelectMany(value) {
    setLoad(true)
    let array = { "id": value }
    if (selectList.length === 0) { setselectList([...selectList, array]); }
    else {
      let Updating = selectList.filter(id => id.id == value)
      if (Updating.length === 0) { setselectList([...selectList, array]); }
      else { const update = selectList.filter(id => id.id !== value); setselectList([...update]) }
    }
    setLoad(false)
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


  //console.log("data", data)

  function ClearNulls(data) {
  }





  const PrintDataUserChat = () => {



      // const [values, setValues] = React.useState<any[]>([])
      // const [focusedValue, setFocusedValue] = React.useState<number>(-1);
      // const [isOpen, setIsOpen] = React.useState<boolean>(false);


    // const ChevronDown = () => (
    //   <svg viewBox="0 0 10 7">
    //     <path
    //       d="M2.08578644,6.5 C1.69526215,6.89052429 1.69526215,7.52368927 2.08578644,7.91421356 C2.47631073,8.30473785 3.10947571,8.30473785 3.5,7.91421356 L8.20710678,3.20710678 L3.5,-1.5 C3.10947571,-1.89052429 2.47631073,-1.89052429 2.08578644,-1.5 C1.69526215,-1.10947571 1.69526215,-0.476310729 2.08578644,-0.0857864376 L5.37867966,3.20710678 L2.08578644,6.5 Z"
    //       transform="translate(5.000000, 3.207107) rotate(90.000000) translate(-5.000000, -3.207107) "
    //     />
    //   </svg>
    // );

    
    // const ChevronUp = () => (
    //   <svg viewBox="0 0 10 8">
    //     <path
    //       d="M2.08578644,7.29289322 C1.69526215,7.68341751 1.69526215,8.31658249 2.08578644,8.70710678 C2.47631073,9.09763107 3.10947571,9.09763107 3.5,8.70710678 L8.20710678,4 L3.5,-0.707106781 C3.10947571,-1.09763107 2.47631073,-1.09763107 2.08578644,-0.707106781 C1.69526215,-0.316582489 1.69526215,0.316582489 2.08578644,0.707106781 L5.37867966,4 L2.08578644,7.29289322 Z"
    //       transform="translate(5.000000, 4.000000) rotate(-90.000000) translate(-5.000000, -4.000000) "
    //     />
    //   </svg>
    // );
    

    // const X = () => (
    //   <svg viewBox="0 0 16 16">
    //     <path d="M2 .594l-1.406 1.406.688.719 5.281 5.281-5.281 5.281-.688.719 1.406 1.406.719-.688 5.281-5.281 5.281 5.281.719.688 1.406-1.406-.688-.719-5.281-5.281 5.281-5.281.688-.719-1.406-1.406-.719.688-5.281 5.281-5.281-5.281-.719-.688z" />
    //   </svg>
    // );
    

    // const Check = () => (
    //   <svg viewBox="0 0 16 16">
    //     <path
    //       d="M13 .156l-1.406 1.438-5.594 5.594-1.594-1.594-1.406-1.438-2.844 2.844 1.438 1.406 3 3 1.406 1.438 1.406-1.438 7-7 1.438-1.406-2.844-2.844z"
    //       transform="translate(0 1)"
    //     />
    //   </svg>
    // );
    
    // const TagSelector = (props): JSX.Element => {

    
    //   const onClick = () => {
    //     setIsOpen(!isOpen);
    //   };
    
    //   const onDeleteOption = e => {
    //     const { value } = e.currentTarget.dataset;
    //     const index = values.indexOf(value);
    //     values.splice(index, 1);
    //     return { values };
    //   };
    
    //   const onHoverOption = e => {
    //     const { value } = e.currentTarget.dataset;
    //     const index = props.options.findIndex(option => option.value === value);
    //     setFocusedValue(index);
    //   };
    
    //   const onClickOption = e => {
    //     const { value } = e.currentTarget.dataset;
    //     if (!props.multiple) {
    //       setValues([value]);
    //       setIsOpen(false);
    //     }
    //     const index = values.indexOf(value);
    //     if (index === -1) {
    //       values.push(value);
    //     } else {
    //       values.splice(index, 1);
    //     }
    //     return { values };
    //   };
    
    //   const renderValues = () => {
    //     if (values.length === 0) {
    //       return <div className="placeholder">{props.placeholder}</div>;
    //     }
    //     if (props.multiple) {
    //       return values.map(value => {
    //         return (
    //           <span key={value} className="multiple value">
    //             {value}
    //             <span data-value={value} onClick={onDeleteOption} className="delete">
    //               <X />
    //             </span>
    //           </span>
    //         );
    //       });
    //     }
    //     return <div className="value">{values[0]}</div>;
    //   };
    
    //   const renderOptions = () => {
    //     if (!isOpen) {
    //       return null;
    //     }
    //     return <div className="options">{props.options.map(renderOption)}</div>;
    //   };
    
    //   const renderOption = (option, index) => {
    //     const selected = values.includes(option.value);
    //     let className = 'option';
    //     if (selected) className += ' selected';
    //     if (index === focusedValue) className += ' focused';
    //     return (
    //       <div
    //         key={option.value}
    //         data-value={option.value}
    //         className={className}
    //         onMouseOver={onHoverOption}
    //         onClick={onClickOption}
    //       >
    //         {props.multiple ? <span className="checkbox">{selected ? <Check /> : null}</span> : null}
    //         {option.value}
    //       </div>
    //     );
    //   };
    
    //   return (
    //     <>
    //       <div className="select">
    //         <label className="label">{props.label}</label>
    //         <div className="selection" onClick={onClick}>
    //           {renderValues()}
    //           <span className="arrow">{isOpen ? <ChevronUp /> : <ChevronDown />}</span>
    //         </div>
    //         {renderOptions()}
    //       </div>
    //     </>
    //   );
    // };
    
    
    // ReactDOM.render(
    //   <TagSelector
    //     label="Tag Selector"
    //     placeholder="Select an Option"
    //     multiple
    //     options={[
    //       { value: 'Option 1' },
    //       { value: 'Option 2' },
    //       { value: 'Option 3' },
    //       { value: 'Option 4' },
    //       { value: 'Option 5' }
    //     ]}
    //   />,
    //   document.getElementById('root')
    // )



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
            clear={clearSelectMany}
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



{/* 

            {
              Load === false && userDetails.userDetails !== {} && data.length !== 0 &&
              <PrintDataUserChat />
            }

 */}




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
                  if (!i.name) {
                    i.name = i.jid.split("@")[0]
                  }
                  if (i.name === ".") {
                    i.name = i.jid.split("@")[0]
                  }
                  return (
                    <UserMessage
                      key={key}
                      data={i}
                      showAvatar={showAvatar}
                      goToScreen={goToScreen}
                      SelectMany={SelectMany}
                      selectList={selectList.length}
                      users={data}
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





      {
        !Load && notificationBody !== false &&
        <Notification
          Title={notificationTitle}
          Body={notificationBody}
          Message={notificationMessage}
          From="dashboard"
          update={updateStorage}
        />
      }


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


// "@react-native-community/async-storage": "1.12.1",
// "@react-native-firebase/app": "12.8.0",
// "@react-native-firebase/messaging": "12.8.0",
// "@react-navigation/native": "^5.7.6",
// "@react-navigation/stack": "5.14.4",
// "axios": "0.21.2",
// "emoji-mart-native": "0.6.2-beta",
// "lodash": "4.17.21",
// "md5": "2.3.0",
// "react": "17.0.2",
// "react-filebase64": "1.0.2",
// "react-native": "0.65.1",
// "react-native-base64": "0.2.1",
// "react-native-document-picker": "6.0.4",
// "react-native-eva-icons": "1.3.1",
// "react-native-fetch-blob": "0.10.8",
// "react-native-fs": "2.18.0",
// "react-native-gesture-handler": "1.10.3",
// "react-native-hyperlink": "0.0.19",
// "react-native-image-pan-zoom": "2.1.12",
// "react-native-linear-gradient": "2.5.6",
// "react-native-photo-upload": "1.3.0",
// "react-native-safe-area-context": "3.2.0",
// "react-native-screens": "3.6.0",
// "react-native-simple-toast": "1.1.3",
// "react-native-sound": "0.11.1",
// "react-native-sound-playerview": "1.0.0",
// "react-native-svg": "9.13.3",
// "react-native-swipe-gestures": "1.0.5",
// "react-native-swiper": "1.6.0-rc.3",
// "react-navigation": "4.4.4",
// "rn-fetch-blob": "0.12.0",
// "rn-range-slider": "2.1.1",
// "socket.io-client": "2.1.1"