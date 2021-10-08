
import React, { useState } from 'react'
import { ImageBackground, StyleSheet, View, Text, Image } from 'react-native'
import { colorBeta } from '../../Colors';
//import { FilterTypeMessage } from './GetTypeMessage.js'
import axios from 'axios';
import { Icon } from 'react-native-eva-icons';

import MessageImage from './TypeMessages/MessageImage.js'
import MessageConversation from './TypeMessages/MessageConversation.js'
import MessageText from './TypeMessages/MessageText.js'
import MessageAudio from './TypeMessages/MessageAudio.js'
import { TouchableOpacity } from 'react-native-gesture-handler';
// import MessageDocument from './TypeMessages/MessageDocument.js'
// import MessageVideo from './TypeMessages/MessageVideo.js'



const direction = "left"
const ColorSend = "red"
const ColorReceive = "blue"
const MaxWidth = 300

function StatusMSG() {
  //StatusMSG
}
function getdate() {
  //getdate
}
function forwarded() {
  //forwarded
}
function LINK() {
  //LINK
}


function FilterTypeMessage(data) {
  if (data.conversation) {
    console.log("A")
    return (<Text style={styles.textToAnswer}>{data.conversation}</Text>)
  }
  else {
    if (data.imageMessage) {
      const format = data.imageMessage.mimetype
      const Codebase64 = data.imageMessage.jpegThumbnail
      const base64Image = `data:${format};base64,${Codebase64}`;
      return (
        <Image style={{ width: 100, height: 150, resizeMode: "cover", }} source={{ uri: base64Image }} />
      )
    }
    else {
      if (data.videoMessage) {




        const format = data.videoMessage.mimetype
        const Codebase64 = data.videoMessage.jpegThumbnail
        const base64Image = `data:${format};base64,${Codebase64}`;
        return (
          <Image style={{ width: 100, height: 150, resizeMode: "cover", }} source={{ uri: base64Image }} />
        )
      }
      else {

        if (data.audioMessage) {




          // {"key": {
          //   "fromMe": true,
          //   "id": "D4C790A720F4E2876E2048E6D1A919ED",
          //   "remoteJid": "573152077862@s.whatsapp.net"},
          //   "message": {
          //     "audioMessage": {
          //       "directPath": "/v/t62.7114-24/40996433_159699703002230_5496642961753430722_n.enc?ccb=11-4&oh=1b04b9c609deaa57745b0b1a80b2c67c&oe=616EFBE3",
          //       "fileEncSha256": "kb/ztWQdtAU7gZf/4SM5ISWdrUhi/IzUk43Eigm1aWM=",
          //       "fileLength": "36089",
          //       "fileSha256": "VZ4t+PTDekT8NLU6a0AStkSUgZnzQ3G9XrVkb66Lv7o=",
          //       "mediaKey": "7gtzr2yW9eipo+11wU6J2zGJPM7jdLAWZv31h2IdqdM=",
          //       "mediaKeyTimestamp": "1632183262",
          //       "mimetype": "audio/ogg; codecs=opus",
          //       "ptt": false, 
          //       "seconds": 15,
          //       "url": "https://mmg.whatsapp.net/d/f/Ao6_oS9xaB4QJZ7gwyttP_TdCzRxe_Iay8V8ccxcnJ07.enc"
          //     }
          //   },
          //   "messageTimestamp": "1632183262",
          //   "selected": true,
          //   "status": "READ"
          // }




          return (<View style={{ flexDirection: "row" }}><Icon name="mic" fill="#fff" width={20} height={20} /><Text style={[styles.textToAnswer, { marginLeft: 5 }]}>Mensaje de voz (0:22)</Text></View>)
        }
        else {
          return <Text>tipo de mensaje no definido</Text>
        }
      }
    }
  }
}




function Answering(props) {
  if (props.toAnswer !== false) {
    console.log("??_", props.toAnswer)
    return (

      <View style={styles.wrapper}>
        <View style={styles.container}>
          <View style={styles.wrap}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              {props.toAnswer.key.fromMe === true ?
                <Text style={{ color: colorBeta, fontWeight: "bold", marginBottom: 2 }}>Tú</Text>
                :
                <Text style={{ color: colorBeta, fontWeight: "bold", marginBottom: 2 }}>{props.name}</Text>
              }
              <TouchableOpacity onPress={() => props.messageAnswerDelete()}>
                <Icon name="close-outline" fill="#fff" width={20} height={20} style={{ position: "relative", }} />
              </TouchableOpacity>
            </View>
            {FilterTypeMessage(props.toAnswer.message)}
          </View>
        </View>
      </View>
    )
  }
  else { return <></> }
}

const styles = StyleSheet.create({
  wrapper:{
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    padding: 5
  },
  container: {
    backgroundColor: "#555",
    borderRadius: 12,
    width: "90%",
    padding: 10,
    marginBottom: -8
  },
  wrap: {
    backgroundColor: "rgba(0,0,0,0.1)",
    flexDirection: "column",
    borderRadius: 5,
    borderLeftColor: colorBeta,
    borderLeftWidth: 4,
    padding: 5,
    paddingHorizontal: 10,
  },
  textToAnswer: {
    color: "white"
  }
})
export default Answering;