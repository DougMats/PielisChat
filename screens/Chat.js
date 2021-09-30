import React, { useState, useEffect, useRef, useContext } from 'react';
import { SafeAreaView, StatusBar, ScrollView, View, Dimensions, Text, TouchableOpacity, ImageBackground, ActivityIndicator, RefreshControl } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import _ from 'lodash';
import Toast from 'react-native-simple-toast';
import UserContext from '../contexts/UserContext.js';
import HeadChat from '../components/HeadChat.js';
import socketIOClient from "socket.io-client";
import Menu from '../components/Menu.js';
import { colorBeta, colorGamma, colorDseta } from '../Colors.js'
import { WhatsAppService } from '../src/services'



import BuilderChat from '../components/chat/BuilderChat.js'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Chat(props) {
  const [Load, setLoad] = useState(true); //cargando
  const [File, setFile] = useState(false);
  const [TopMenu, setTopMenu] = useState(false); //mostrar menu
  const [multipleSelect, setmultipleSelect] = useState(false); //existe algun seleccionado?
  const [data, setdata] = useState(props.route.params.data); //listado de chat
  const [messages, setmessages] = useState([]); //listado de chat
  const scrollRef = useRef() //ref to scroll chats list
  const [Dragging, setDragging] = useState(false); // botton volve a abajo
  const [PositionUp, setPositionUp] = useState(false); // posision up/down automatic
  const [answering, setanswering] = useState(false); // respondiendo a otro mensaje
  const userDetails = useContext(UserContext)
  const [refreshing, setRefreshing] = useState(false);

  const [socket, setsocket] = useState(false);


  let randomCode
  if (props.route.params) { randomCode = props.route.params.randomCode }
  else { randomCode = 1 }



  // useEffect(() => {
  //   console.log(['. . . . . . . . . .  SOCKET SERVER CONNECTING . . . . . . . . . . . . . . ']);
  //   setsocket(socketIOClient("https://apiwa.pdtcomunicaciones.com:3001"))
  // }, [])



  // console.log("user",userDetails.userDetails)
  // user {"_id": "60fc15230ba29080b014b8fd", "chats": [{"advisor": "60dbc0610862cd2697f9594a", "back": "red", "count": 0, "jid": "573016167390@s.whatsapp.net", "message": "true", 
  // "id_user": "86", "name": "Carlos Cardenas", "password": "ad17urca", "phone": "3152077862", "rol": "administrador"}
  // LOG  _ null



 
  // useEffect(() => {
  //   if (socket) {
  //     console.log(['. . . . . . . . . .  POSTS SERVER PROVISIONING . . . . . . . . . . . . . . '])
  //     socket.on('askForUserId', () => {
  //       console.log(['. . . . . . . . . .  POSTS SERVER CONNECTED123 . . . . . . . . . . . . . . '])
  //      // socket.emit('userIdReceived', props.data.id_client);
  //     socket.emit('userIdReceived', userDetails.userDetails.id_user);
  //     })
  //     socket.on('displayImage', (data) => {
  //       console.log(['______________________________ get la imagen ______________________________']);
  //       console.log("uri ->", data.uri);
  //       setdisplayDrawer(data.uri);
  //     })
  //     socket.on('disconnect', () => {
  //       console.log(['. . . . . . . . . . . . . . . . . . . POSTS SERVER DISCONNECTED  . . . . . . . . . . . . . . . . . . .'])
  //     })
  //   }
  // }, [socket])




  useEffect(() => {
    setTopMenu(false);
    setPositionUp(false);
  }, [randomCode]);


  async function updateMessageList(data) {
    setmessages(data)
  }

  useEffect(() => {
    if (data.messages) {
      setmessages(data.messages)
      setLoad(false);
    }
  }, [data]);

  function openTopMenu() {
    setTopMenu(true);
  }

  function closeTopMenu() {
    setTopMenu(false);
  }

  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }

  async function getChats() {
    setRefreshing(true);
    let user = props.route.params.data.jid
    let cursor = {
      fromMe: messages[0].key.fromMe,
      id: messages[0].key.id,
    }
    await WhatsAppService.GetConversation(user, cursor).then((response) => {
      console.log("................. nuevos mensaje capturados ", response.messages.length)
      if (response.messages.length === 0) {
        Toast.show('No hay más registros');
      }
      else {
        setPositionUp(true);
        Toast.show('Actualizando');
        setmessages([...response.messages, ...messages])
      }
    })
    setRefreshing(false);
  }


  async function updateMessages(mssg){}
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor={colorGamma} barStyle="light-content" />
      <Menu level={1} show={TopMenu} closeTopMenu={closeTopMenu} goToScreen={goToScreen} data={data} />
      <HeadChat openTopMenu={openTopMenu} data={data} goToScreen={goToScreen} />
      <BuilderChat
      data={data}
      messages={messages} //lista de mensajes de este chat
      updateMessages={updateMessages}
      getChats={getChats} // refescar lista de mensajes
      PositionUp={PositionUp}
      />
    </SafeAreaView>
  );
}
export default Chat;


// onLayout={(event) => console.log(event.nativeEvent.layout)}
// style={{ width: "100%", height: "100%" }}
// decelerationRate="normal"
// showsVerticalScrollIndicator={true}
//scrollTo({x: 0, y: 0, duration: 500})
// scrollToEnd(([options]: {animated: boolean, duration: number}));
// scrollTo(
//   ([y]: number),
//   object,
//   ([x]: number),
//   ([animated]: boolean),
//   ([duration]: number),
// useNativeDriver={true}
// renderItem={renderItem(e)}
//fadingEdgeLength={2}
// ref={ref => scrollView = ref}
//onContentSizeChange={() => scrollView.scrollToEnd({ animated: true })}
// ref={scrollViewRef}
// onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
//scrollToEnd({ animated: true});




// "@react-native-community/async-storage": "1.12.1",
// "@react-navigation/native": "^5.7.6",
// "@react-navigation/stack": "5.14.4",
// "axios": "0.21.2",
// "emoji-mart-native": "0.6.2-beta",
// "lodash": "4.17.21",
// "md5": "2.3.0",
// "react": "17.0.2",
// "react-native": "0.65.1",
// "react-native-audio-recorder-player": "3.2.0",
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
// "react-native-sha256": "1.4.7",
// "react-native-simple-toast": "1.1.3",
// "react-native-sound": "0.11.1",
// "react-native-sound-player": "0.11.1",
// "react-native-svg": "9.13.3",
// "react-native-swipe-gestures": "1.0.5",
// "react-native-swiper": "1.6.0-rc.3",
// "react-navigation": "4.4.4"