import React, { useState, useEffect, useRef, useContext } from 'react';
import { ImageBackground, StyleSheet, View, Text } from 'react-native'
import UserContext from '../../contexts/UserContext.js';
import Toast from 'react-native-simple-toast';
import { colorBeta, colorGamma, colorDseta } from '../../Colors.js'
import { WhatsAppService } from '../../src/services'
import AsyncStorage from '@react-native-community/async-storage'
import _ from 'lodash';

import ChatList from './ChatList.js'
import FilesTypes from './FilesTypes.js'
import FilesPreview from './FilesPreview.js'
import FilesPreviewMultiples from './FilesPreviewMultiples.js'
import Answering from './Answering.js'
import Intro from './Intro.js'
import SelectsMessage from './selectsMessage.js'


import avatar4 from '../../images/users/avatar-4.jpg'
import avatar1 from '../../images/users/avatar-1.jpg'



function BuilderChat(props) {

  const userDetails = useContext(UserContext)

  /* ________________________________________________________ */
  const [File, setFile] = useState(false); //mostrar seleccion de archivo
  const [typeMessage, settypeMessage] = useState("nunguno"); // tipo de archivo seleccionado
  const [FileSelected, setFileSelected] = useState({});
  const [FileSelectedMultiplex, setFileSelectedMultiplex] = useState([]);
  function ShowLoadFile() {
    setFile(!File)
  }
  function getTypeMessage(type) {
    settypeMessage(type)
  }
  function FileSelectedInsert(item) {
    setFileSelected(item)
  }
  function FileSelectedDelete() {
    setFileSelected({});
  }
  function FileSelectedMultiplexInsert(items) {
    console.log("b items: ", items)
    setFileSelectedMultiplex(items)
  }
  function FileSelectedMultiplexDelete(item) {
    const resultado = FileSelectedMultiplex.filter(data => data.uri !== item)
    setFileSelectedMultiplex(resultado)
    Toast.show("Archivo Removido.")
  }
  /* ________________________________________________________ */

  const [MessageSelectionMultiple, setMessageSelectionMultiple] = useState([
    { id: "3EB037646430" },
    { id: "3EB01DFE8548" },
    { id: "3EB031B19D70" },
    { id: "3EB059DE5C88" }
  ]);
  function MessageSelectionInser(item) { }
  function MessageSelectionDelete(item) { }


  /* ________________________________________________________ */

  const [toAnswer, settoAnswer] = useState(
    null
    // { "key": { "fromMe": true, "id": "3EB04F8A8BA0", "remoteJid": "573152077862@s.whatsapp.net" }, "message": { "conversation": "Epa" }, "messageTimestamp": "1632497113", "status": "READ" }
  );


  /* ________________________________________________________ */


  const [Quoted, setQuoted] = useState(false)
  const [OpenReply, setOpenReply] = useState(false)
  const [chatMessages, setchatMessages] = useState(props.messages)//useState(props.recentChatList[props.active_user].messages);
  const [allUsers] = useState(userDetails.userDetails.chats) //(props.recentChatList)





  const addMessage = (message, type) => {
    var messageObj = null;

    const user = props.data.jid //props.recentChatList[props.active_user].jid

    const _id = userDetails.userDetails._id
    const _user = userDetails.userDetails.id_user
    const _name = userDetails.userDetails.name
    const _password = userDetails.userDetails.password
    const _phone = userDetails.userDetails.phone
    const _rol = userDetails.userDetails.rol

    let d = new Date()
    var n = d.getSeconds()
    //matches the message type is text, file or image, and create object according to it

    switch (type) {
      case "textMessage":
        messageObj = {
          id: chatMessages.length + 1,
          message: message,
          time: "00:" + n,
          userType: "sender",
          image: avatar4,
          isFileMessage: false,
          isImageMessage: false,
          quoted: Quoted
        }
        WhatsAppService.SendMmessageText(messageObj, user, _name, _user)
        break;
      case "imageMessage":
        var imageMessage = [{ image: message }]
        messageObj = {
          id: chatMessages.length + 1,
          message: 'image',
          imageMessage: message.uri,//imageMessage,
          size: message.size,
          time: "00:" + n,
          userType: "sender",
          image: avatar4,
          isImageMessage: true,
          isFileMessage: false,
          quoted: Quoted
        }
        // console.log(messageObj)
        // console.log("logic message: ", message)
        console.log("________________________________________________")
        let res = WhatsAppService.SendMmessageImage(message, user, _name, _user)
        console.log("que paso?:", res)
        break;
      case "fileMessage":
        messageObj = {
          id: chatMessages.length + 1,
          message: 'file',
          fileMessage: message.name,
          size: message.size,
          time: "00:" + n,
          userType: "sender",
          image: avatar4,
          isFileMessage: true,
          isImageMessage: false,
          quoted: Quoted
        }
        console.log(message.fileBase64)
        console.log(message.type_file)
        console.log(message.extenxion)
        WhatsAppService.SendMmessageDocuments(message.fileBase64, user, message.extenxion, _name, _user)
        break;



      case "AudioMessage":
        messageObj = {
          "id": chatMessages.length + 1,
          "message": "Audio",
          "time": "01:05",
          "userType": 'sender',
          "isImageMessage": false,
          "isFileMessage": false,
          "isAudioMessage": true,
          "isVideoMessage": false,
          "fileAudio": "audio.mp3",
          "size": `100 Kb`,
          "url": false,
          'base64Audio': message,
          "mediaKey": false,
          "mimetype": false,
          "quoted": Quoted
        }
        WhatsAppService.SendMmessageAudio(message, user, _name, _user)
        break;
      case "VideoMessage":
        messageObj = {
          "id": chatMessages.length + 1,
          "message": "Video",
          "time": "01:05",
          "userType": "sender",
          "isImageMessage": false,
          "isFileMessage": false,
          "isAudioMessage": false,
          "isVideoMessage": true,
          "fileVideo": "video.mp4",
          'base64Video': message,
          "size": `100 Kb`,
          "url": false,
          "mediaKey": false,
          "mimetype": false,
          "jpegThumbnail": false,
          "quoted": Quoted
        }
        WhatsAppService.SendMmessageVideo(message, user, _name, _user)
        break;

      default:
        break;
    }



    props.updateMessages(messageObj)

    // setQuoted(false)
    // setOpenReply(false)
    //add message object to chat        
    //     setchatMessages([...chatMessages, messageObj])
    //     let copyallUsers = [...allUsers];
    //     copyallUsers.messages = [...chatMessages, messageObj];
    //     copyallUsers.isTyping = false;


    // props.updateMessageList() //update message

    // copyallUsers[props.active_user].messages = [...chatMessages, messageObj];
    // copyallUsers[props.active_user].isTyping = false;

    //    props.setFullUser(copyallUsers)
    // scrolltoBottom()

  }







  /* ________________________________________________________ */

  const [MessagesSelectes, setMessagesSelectes] = useState([]);

  function CreateSelection(item) {

    console.log("intro:", item.key.id)
    if (MessagesSelectes.length === 0) {
      setMessagesSelectes([...MessagesSelectes, item])
    }
    else {
      const result = MessagesSelectes.filter(word => word.key.id === item.key.id);
      // console.log("result:::", result)
      if (result.length == 0) {
        //no existe
        setMessagesSelectes([...MessagesSelectes, item])
      }
      else {
        //existeeee, por lo tanto eliminar de la lista
        const deleting = MessagesSelectes.filter(word => word.key.id !== item.key.id);
        // console.log("deleting:", deleting)
        setMessagesSelectes(deleting)
      }
    }
  }



  function answer() {
    console.log("preparando para responder")
    settoAnswer(MessagesSelectes[0])
  }


  function clearSelection() {
    console.log("clear")
    settoAnswer(null)
    setMessagesSelectes([])
  }
  return (
    <ImageBackground
      source={require('../../images/background_1.png')}
      style={styles.container}
    >



      <SelectsMessage
        list={MessagesSelectes}
        answer={answer}
        clearSelection={clearSelection}
      />




      <ChatList
        messages={props.messages} //lista de mensaje
        getChats={props.getChats} // refrescar esta lista de mensajes
        PositionUp={props.PositionUp}
        MessageSelectionMultiple={MessageSelectionMultiple}
        MessageSelectionInser={MessageSelectionInser}
        MessageSelectionDelete={MessageSelectionDelete}
        CreateSelection={CreateSelection}
        MessagesSelectes={MessagesSelectes}
      />

      <FilesTypes
        File={File}
        ShowLoadFile={ShowLoadFile}
        getTypeMessage={getTypeMessage}
      />

      <FilesPreview
        data={FileSelected}
        delete={FileSelectedDelete}
      />

      <FilesPreviewMultiples
        data={FileSelectedMultiplex}
        delete={FileSelectedMultiplexDelete}
      />

      <Answering
        name={props.data.name}
        toAnswer={toAnswer}
      />

      <Intro
        addMessage={addMessage} // function para enviar mensaje
        typeMessage={typeMessage} // tipo de archivo para cargar
        ShowLoadFile={ShowLoadFile} // mostrar lista de tipos de archivos
        insertSingleFile={FileSelectedInsert}
        insertMultipleFiles={FileSelectedMultiplexInsert}
        FileSelected={FileSelected}
        FileSelectedMultiplex={FileSelectedMultiplex}
      />
      
    </ImageBackground>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  }
})
export default BuilderChat;