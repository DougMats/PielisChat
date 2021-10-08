import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, StatusBar, Dimensions } from 'react-native';
import _ from 'lodash';
import Toast from 'react-native-simple-toast';
import UserContext from '../contexts/UserContext.js';
import Menu from '../components/Menu.js';
import { colorGamma } from '../Colors.js'
import { WhatsAppService } from '../src/services'
import Notification from '../components/notification/Notification.js';
import messaging from '@react-native-firebase/messaging';
import { base_url, ApiWhatsapp } from '../Env';
import axios from 'axios';
import BuilderChat from '../components/chat/BuilderChat.js'

function Chat(props) {
  console.log("screen chat")
  const [Load, setLoad] = useState(true); //cargando
  const [TopMenu, setTopMenu] = useState(false); //mostrar menu
  const [data, setdata] = useState(props.route.params.data); //listado de chat
  const [messages, setmessages] = useState([]); //listado de chat
  const [PositionUp, setPositionUp] = useState(false); // position up/down automatic se usa para el scrollView en <ChatList/>,
  const { userDetails, setUserDetails } = useContext(UserContext)

  let randomCode
  if (props.route.params) { randomCode = props.route.params.randomCode }
  else { randomCode = 1 }

  /*________________________ notification init ___________________________*/
  const [notificationTitle, setnotificationTitle] = useState("");
  const [notificationBody, setnotificationBody] = useState("");
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
    if (notificationBody !== "") {
      setTimeout(() => {
        setnotificationBody("")
        setnotificationTitle("")
        setnotificationMessage(false)
      }, 5000);
    }
  }, [notificationBody]);
  /*________________________ notificationend ___________________________*/

  useEffect(() => {
    setTopMenu(false);
    setPositionUp(false);
    async function ReadMessages() {
      await axios.get(base_url(ApiWhatsapp, `whatsapp/read/chat/${props.route.params.data.jid}`))
      let user = props.route.params.data
      user.count = 0
    }
    if (userDetails.rol === "asesor" && props.route.params.data.count !== 0) {
      ReadMessages();
    }
  }, [randomCode]);

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

  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }

  function pushingNewMessage(message) {
    console.log("pushing new message")
    setmessages([...messages, message]);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={colorGamma} barStyle="light-content" />
      <Menu level={1} show={TopMenu} closeTopMenu={closeTopMenu} goToScreen={goToScreen} data={data} />
      {!Load && notificationBody !== "" &&
        <Notification
          Title={notificationTitle}
          Body={notificationBody}
          Message={notificationMessage}
          From="chat"
        />}
      <BuilderChat
        user={data} datos del usuario
        messages={messages} //lista de mensajes de este chat
        openTopMenu={openTopMenu}
        closeTopMenu={closeTopMenu}
        goToScreen={goToScreen}
        getChats={getChats} // refescar lista de mensajes
        PositionUp={PositionUp} // position initial del scroll - bajar automatico?
        pushingNewMessage={pushingNewMessage}
      />
    </SafeAreaView>
  );
}
export default Chat;