import React, { useState, useEffect, useRef, useContext } from 'react';
import { ImageBackground, StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import UserContext from '../../contexts/UserContext.js';
import Toast from 'react-native-simple-toast';
//import { colorBeta, colorGamma, colorDseta } from '../../Colors.js'
import { WhatsAppService } from '../../src/services'
//import AsyncStorage from '@react-native-community/async-storage'
import _ from 'lodash';

import ChatList from './ChatList.js'
import FilesTypes from './FilesTypes.js'
// import FilesPreview from './FilesPreview.js'
import FilesPreview from './FilesPreview.js'
import Answering from './Answering.js'
import Intro from './Intro.js'
import SelectsMessage from './selectsMessage.js'
import avatarDefault from '../../images/isotype.png'
import HeadChat from '../HeadChat.js';

function BuilderChat(props) {

  /* answer init ________________________________________________________ */
  const addMessage = (message, type) => {
    var messageObj = null;
    const user = props.user.jid //props.recentChatList[props.active_user].jid
    const _id = userDetails.userDetails._id
    const _user = userDetails.userDetails.id_user
    const _name = userDetails.userDetails.name
    const _password = userDetails.userDetails.password
    const _phone = userDetails.userDetails.phone
    const _rol = userDetails.userDetails.rol
    let d = new Date()
    var n = d.getSeconds()

    switch (type) {
      case "textMessage":
        messageObj = {
          key: { fromMe: true, id: chatMessages.length + 1, remoteJid: "573152077862@s.whatsapp.net" },
          message: { conversation: message },
          messageTimestamp: Math.round(new Date().getTime() / 1000),
          status: "NOTSEND"
        }
        WhatsAppService.SendMmessageText(messageObj, user, _name, _user)
        break;

      case "imageMessage":
        var imageMessage = [{ image: message }]
        // messageObj = {
        //   id: chatMessages.length + 1,
        //   message: 'image',
        //   imageMessage: message.uri,//imageMessage,
        //   size: message.size,
        //   time: "00:" + n,
        //   userType: "sender",
        //   image: avatarDefault,
        //   isImageMessage: true,
        //   isFileMessage: false,
        //   quoted: Quoted,
        //   fromMe: true
        // }
        // {"fileCopyUri": "content://com.android.providers.media.documents/document/image%3A7318",
        // "name": "IMG_20211003_010058929.jpg",
        // "size": 1321537,
        // "type": "image/jpeg",
        // "uri": "content://com.android.providers.media.documents/document/image%3A7318"}
        // messageObj =
        // {
        //   key: {
        //     fromMe: true,
        //     id: chatMessages.length + 1,
        //     //   "remoteJid": "573152077862@s.whatsapp.net"
        //   },
        //   message: {
        //     imageMessage: {
        //       //     "directPath": "/v/t62.7118-24/28703311_438226687725348_102457732754398215_n.enc?ccb=11-4&oh=e7866ceac47c4695317835ff3b42a396&oe=617B0A55",
        //       //     "fileEncSha256": "YrUG5EEYkK2rj8mY43+KfEgHZnGNps21ydS+YrM7GmA=",
        //       fileLength: message.size,
        //       //     "fileSha256": "SKIvEpuBrPB2xUkl5/aCFhQptYJrbNZMs+1Gv7R56cQ=",
        //       //     "height": 1280,
        //       //**** */     "jpegThumbnail": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEgAJAMBIgACEQEDEQH/xAAwAAACAwEAAAAAAAAAAAAAAAAAAgEDBAUBAQADAQEAAAAAAAAAAAAAAAABAgMEBf/aAAwDAQACEAMQAAAAvjtG/Lx36opzTpEWgQx67AUYAzRpQhLaywYHXG+mGtUrrpoKiJrvDTJYCGEDq87/xAAkEAACAgIBAwQDAAAAAAAAAAABAgARAyESBBMxEBQiQVJjgf/aAAgBAQABPwDssortm52n+kMXE4O0M7Z/AxcGQiWJYEsSx6GfyVK9Ml63EF6NxgaoQBh4BhmcsClRsjBLvcfLwxKxOzF6lSvImIxYWYVDDYnYQiqMfCjhQRoQdJjH0ZQEs1oGcm8bhyHGhYgxMjMRvUbzMPXMEAKXPdfrMbOudCrCovFCPJqHMtzpsaDEu5wx3DjU2bnACvlOp+OTTT//xAAeEQACAgICAwAAAAAAAAAAAAAAAQJRERMSIQMgIv/aAAgBAgEBPwBeZ0b3Rvn765oxKji6JZ5Ps7sivlH/xAAlEQABAwIDCQAAAAAAAAAAAAACAAERAxIUIlIEEyAxQUJRYXH/2gAIAQMBAT8ALZhfuWEHUsHS98e/pP1V4w0Orw1IItHK3JQ3hVCzl9X/2Q==",
        //       //*** */     "mediaKey": "RGKSiuN36RFRf3jmxENdagqQ5r6KcxpLJNwrrVpCEcc=",
        //       mediaKeyTimestamp: Math.round(new Date().getTime() / 1000),
        //       mimetype: message.type,
        //       //**** url: "https://mmg.whatsapp.net/d/f/Arktxh91vXzjj5pb-LOfeREP9GPV1mHY4NyswqSsR2FI.enc",
        //       //  _____   "width": 662
        //     }
        //   },
        //   messageTimestamp: Math.round(new Date().getTime() / 1000),
        //   status: "NOTSEND"
        // }

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
          image: avatarDefault,
          isFileMessage: true,
          isImageMessage: false,
          quoted: Quoted,
          fromMe: true
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
          "quoted": Quoted,
          "fromMe": true
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
          "quoted": Quoted,
          "fromMe": true
        }
        WhatsAppService.SendMmessageVideo(message, user, _name, _user)
        break;

      default:
        break;
    }

    props.pushingNewMessage(messageObj)
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
  /* answer end ________________________________________________________ */




  //const [StorageChats] = useState(userDetails.userDetails.chats) //(props.recentChatList)


  const userDetails = useContext(UserContext)
  const contact = { jid_: props.user.jid, name: props.user.name, profilePicture: props.user.profilePicture }
  const [chatMessages, setchatMessages] = useState(props.messages)//useState(props.recentChatList[props.active_user].messages);


























  /* tipo de mensaje para adjuntar ________________________________ */
  const [showFilesTypes, setshowFilesTypes] = useState(false);
  const [fileTypes, setfileTypes] = useState("ninguno");
  function fileTypesGet(t) { setfileTypes(t) }
  function fileTypesHidden() { setshowFilesTypes(!showFilesTypes) }
  /* ________________________________ */




  /* respondiendo a un mensaje________________________________ */
  const [showAnswer, setshowAnswer] = useState(false);
  const [messageAnswer, setmessageAnswer] = useState(false);




  function messageAnswerCreate() {
    if (messagesSelectes.length === 0) {
      console.log("error")
    }
    else {
      setmessageAnswer(messagesSelectes[0])
    }
  }


  function messageAnswerDelete(e) {
    setmessageAnswer(false)
  }
  /* ________________________________ */





  /* seleccionando multiples mensajes ________________________________ */












  const [messagesSelectes, setmessagesSelectes] = useState([]);
  console.log("afuera ", messagesSelectes)

  function messagesSelectesInsert(e) {
    console.log("adentro ", messagesSelectes)
    setmessagesSelectes(messagesSelectes => [...messagesSelectes, e])
  }










    // setmessagesSelectes([...messagesSelectes, e])
    //     console.log(messagesSelectes.length,"-> messagesSelectesInsert ", e.key.id)
    //     const existe = messagesSelectes.filter(obj => obj.key.id === e.key.id)
    // console.log("existe???",existe.length)
    // if (existe.length === 0) {
    //   console.log("hágale perrito, todo bien")
    //   setmessagesSelectes(messagesSelectes => [...messagesSelectes, e])
    // }
    // if (existe.length === 1) {
    //   console.log("toca borrarlo")
    //   messagesSelectesDelete(e)
    // }




  function messagesSelectesDelete(e, array) {
    console.log("....deleting ", e.key.id)

    const deleting = messagesSelectes.filter(word => word.key.id !== e.key.id);

    console.log("deleting::::", deleting)




    // setmessagesSelectes(messagesSelectes => [...messagesSelectes, item])
    // setmessagesSelectes(deleting)
  }
  //console.log("messagesSelectes", messagesSelectes)



  function messagesSelectesClear() {
    setmessageAnswer(false)
    setmessagesSelectes([])
  }
  /* ________________________________ */


  // const [toAnswer, settoAnswer] = useState(null);
  // const [Quoted, setQuoted] = useState(false)
  // const [OpenReply, setOpenReply] = useState(false)


  // const [MessagesSelectes, setMessagesSelectes] = useState([]);
  // const [MessageSelectionMultiple, setMessageSelectionMultiple] = useState([]);
  // //mostrar seleccion de archivo
  // const [File, setFile] = useState(false);

  // //setear el estado de ocultar mostrar componente
  // function ShowLoadFile() { setFile(!File) }
  // // tipo de archivo seleccionado
  // const [typeMessage, settypeMessage] = useState("nunguno");
  // //obtener tipo de archivo
  // function getTypeMessage(type) { settypeMessage(type) }
  // //archivo seleccionado
  // const [FileSelected, setFileSelected] = useState(false);
  // const [FilesTree, setFilesTree] = useState([]);

  // function CreateSelection(item) {
  //   console.log("intro:", item.key.id)
  //   if (MessagesSelectes.length === 0) {
  //     setMessagesSelectes([...MessagesSelectes, item])
  //   }
  //   else {
  //     const result = MessagesSelectes.filter(word => word.key.id === item.key.id);
  //     // console.log("result:::", result)
  //     if (result.length == 0) {
  //       //no existe
  //       setMessagesSelectes([...MessagesSelectes, item])
  //     }
  //     else {
  //       //existeeee, por lo tanto eliminar de la lista
  //       const deleting = MessagesSelectes.filter(word => word.key.id !== item.key.id);
  //       // console.log("deleting:", deleting)
  //       setMessagesSelectes(deleting)
  //     }
  //   }
  // }

  // function answer() {
  //   //console.log("preparando para responder")
  //   //settoAnswer(MessagesSelectes[0])
  // }


  // function clearSelection() {
  //   console.log("clear")
  //   settoAnswer(null)
  //   setMessagesSelectes([])
  // }


  // function selecting(file) { setFileSelected(file) }
  // //function que elimina un archivo.


  // function deleteThisFile(item) {
  //   console.log("borrando....", item.name)
  //   const resultado = FilesTree.filter(data => data.name !== item.name)
  //   console.log("b----", FilesTree.length)
  //   console.log("a----", resultado.length)
  //   setFilesTree(resultado)
  //   Toast.show("Archivo Removido.")
  // }


  // //obtener archivos desde el componente <Intro/>
  // function getFiles(tree) {
  //   setFilesTree(tree)
  // }


  // function clear() {
  //   console.log("********* clear type file")
  //   //settypeMessage("nunguno");
  // }

  // function MessageSelectionInser(item) { }
  // function MessageSelectionDelete(item) { }

  // function selectToAnswer(id) {
  //   console.log("qnswer direct")
  //   settoAnswer(id)
  // }

  // const [FileSelectedMultiplex, setFileSelectedMultiplex] = useState([]);
  // const [FileSelectedImagesMultiplex, setFileSelectedImagesMultiplex] = useState([]);
  // const [FilesImagesMultiplex, setFilesImagesMultiplex] = useState([]);
  // function FileSelectedInsert(item) {
  //   setFileSelected(item)
  // }
  // function FileSelectedDelete() {
  //   setFileSelected({});
  // }
  // function FileSelectedMultiplexInsert(items) {
  //   console.log("b items: ", items)
  //   setFileSelectedMultiplex(items)
  // }
  // function FileSelectedMultiplexDelete(item) {
  //   const resultado = FileSelectedMultiplex.filter(data => data.uri !== item)
  //   setFileSelectedMultiplex(resultado)
  //   Toast.show("Archivo Removido.")
  // }





  return (
    <ImageBackground source={require('../../images/background_1.png')} style={styles.container} >
      <HeadChat
        openTopMenu={props.openTopMenu}
        data={props.user}
        goToScreen={props.goToScreen}
        fileTypesHidden={fileTypesHidden}
      />


      {/* <SelectsMessage
        list={MessagesSelectes}
        answer={answer}
        clearSelection={clearSelection}
      /> */}






      <ChatList
        contact={contact} //contacto
        messages={props.messages} //lista de mensaje
        messagesSelectes={messagesSelectes}



        messagesSelectesInsert={messagesSelectesInsert}
        messagesSelectesDelete={messagesSelectesDelete}
        messagesSelectesClear={messagesSelectesClear}




        messageAnswerCreate={messageAnswerCreate}

        // MessageSelectionMultiple={MessageSelectionMultiple}
        // MessageSelectionInser={MessageSelectionInser}
        // MessageSelectionDelete={MessageSelectionDelete}
        // CreateSelection={CreateSelection}
        // MessagesSelectes={MessagesSelectes}
        // selectToAnswer={selectToAnswer}

        PositionUp={props.PositionUp}
        getChats={props.getChats} // refrescar esta lista de mensajes
      />




      <FilesTypes
        show={showFilesTypes}
        ShowLoadFile={fileTypesHidden}
        getTypeMessage={fileTypesGet}
      />




      {/* <FilesPreview
        File={File}
        type={typeMessage}
        FilesTree={FilesTree}
        delete={deleteThisFile}
        show={ShowLoadFile}

        //selected={FileSelected}
        //selecting={selecting}
      /> */}




      <Answering name={props.user.name} toAnswer={messageAnswer} messageAnswerDelete={messageAnswerDelete} />




      {/* <Intro
        addMessage={addMessage} // function para enviar mensaje
        typeMessage={typeMessage} // tipo de archivo para cargar
        ShowLoadFile={ShowLoadFile} // mostrar lista de tipos de archivos
        getFiles={getFiles}
        clear={clear}
        FilesTree={FilesTree}

      // insertSingleFile={FileSelectedInsert}
      // insertMultipleFiles={FileSelectedMultiplexInsert}
      // FileSelected={FileSelected}
      // FileSelectedMultiplex={FileSelectedMultiplex}
      /> */}
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    position: "relative",
    zIndex: -9
  }
})
export default BuilderChat;