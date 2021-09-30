import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, } from "react-native";
import { Icon } from 'react-native-eva-icons';
import Hyperlink from 'react-native-hyperlink';
//import { GetTypeMessage } from './GetTypeMessage.js'

import MessageImage from './TypeMessages/MessageImage.js'
import MessageConversation from './TypeMessages/MessageConversation.js'
import MessageText from './TypeMessages/MessageText.js'
import MessageAudio from './TypeMessages/MessageAudio.js'
import MessageDocument from './TypeMessages/MessageDocument.js'
import MessageVideo from './TypeMessages/MessageVideo.js'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const ColorSend = "#FFF"
const ColorReceive = "#EEE"
const MaxWidth = (windowWidth / 12) * 10


export default function Message(props) {
  const flex = props.data.key.fromMe ? "flex-end" : "flex-start";
  const direction = props.data.key.fromMe ? "left" : "right";
  // const [active, setactive] = useState(false);

  async function OnSelect(id) {

    // console.log("on selec")
    // if (props.multipleSelect === true) {
    await props.CreateSelection(id)
    // }
  }

  async function LongSelect(id) {
    // console.log("long selec")
    // if (props.multipleSelect === false) {
    await props.CreateSelection(id)
    // }
  }





  function StatusMSG(state) {
    if (state === "READ") {
      return <Text style={styles.messageRead}><Icon name="done-all-outline" fill={"#0087FF"} width={15} height={15} /></Text>
    }
    if (state === "NOTREAD") {
      return <Text style={styles.messageRead}><Icon name="done-all-outline" fill={"#555"} width={15} height={15} /></Text>
    }
    if (state === "SEND") {
      return <Text style={styles.messageRead}><Icon name="checkmark-outline" fill={"#555"} width={15} height={15} /></Text>
    }
    if (state === "NOTSEND") {
      return <Text style={styles.messageRead}><Icon name="clock-outline" fill={"#555"} width={15} height={15} /></Text>
    }
  }

  function getdate(info, Color) {
    const datetime = parseInt(info)
    const date = new Date(datetime * 1000)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const time = `${date.getHours()}:${date.getMinutes()}`
    // console.log(time, "datetime")
    //return `${day}/${month}/${year} ${time}`
    return <Text style={{
      marginLeft: 5,
      textAlign: "right",
      paddingRight: 20,
      color: Color,
    }}>{`${time} p.m.`}</Text>
  }

  const forwarded = () => {
    return false
    return (
      <View style={{ flexDirection: "row" }}>
        <Icon name="undo" fill={"silver"} width={20} height={20} />
        <Text style={{ color: "#777", fontWeight: "600", marginLeft: 5 }}>Reenviado</Text>
      </View>
    )
  }

  function LINK(data) {
    const passPropsText = (text) =>
      <Hyperlink
        linkDefault
        injectViewProps={url => ({
          testID: url === 'http://link.com' ? 'id1' : 'id2',
          // style: url === 'https://link.com' ? { color: 'red' } : { color: '#0087FF' },
          style: { color: '#0087FF' },
        })}
      ><Text>{text}</Text>
      </Hyperlink>
    return (
      passPropsText(data)
    )
  }


  function FAVORITES(status) {
    if (status === true) {
      return <Icon name="star" fill={"orange"} width={15} height={15} style={{ marginTop: 3 }} />
    }
  }


  //if (data.chat.message.documentMessage) 


  function MessageType(data, direction) {
    if (data.chat) {
      if (data.chat.message.conversation) {
        return <MessageConversation data={data.chat} direction={direction} StatusMSG={StatusMSG} FAVORITES={FAVORITES} getdate={getdate} forwarded={forwarded} LINK={LINK} ColorSend={ColorSend} ColorReceive={ColorReceive} MaxWidth={MaxWidth} />
      }
      else {
        if (data.chat.message.extendedTextMessage) {
          <MessageText data={data.chat} direction={direction} StatusMSG={StatusMSG} FAVORITES={FAVORITES} getdate={getdate} forwarded={forwarded} LINK={LINK} ColorSend={ColorSend} ColorReceive={ColorReceive} MaxWidth={MaxWidth} />
        }
        else {
          if (data.chat.message.imageMessage) {
            return (<MessageImage data={data.chat} direction={direction} StatusMSG={StatusMSG} FAVORITES={FAVORITES} getdate={getdate} forwarded={forwarded} LINK={LINK} ColorSend={ColorSend} ColorReceive={ColorReceive} MaxWidth={MaxWidth} />)
          }
          else {
            if (data.chat.message.audioMessage) {
              return (<MessageAudio data={data.chat} direction={direction} StatusMSG={StatusMSG} FAVORITES={FAVORITES} getdate={getdate} forwarded={forwarded} LINK={LINK} ColorSend={ColorSend} ColorReceive={ColorReceive} MaxWidth={MaxWidth} />)
            }
            else {
              if (data.chat.message.videoMessage) {
                return (<MessageVideo data={data.chat} direction={direction} StatusMSG={StatusMSG} FAVORITES={FAVORITES} getdate={getdate} forwarded={forwarded} LINK={LINK} ColorSend={ColorSend} ColorReceive={ColorReceive} MaxWidth={MaxWidth} />)
              }
              else {
                if (data.chat.message.documentMessage) {
                  return (<MessageDocument data={data.chat} direction={direction} StatusMSG={StatusMSG} FAVORITES={FAVORITES} getdate={getdate} forwarded={forwarded} LINK={LINK} ColorSend={ColorSend} ColorReceive={ColorReceive} MaxWidth={MaxWidth} />)
                }
                else {
                  return (<Text>data.chat.message === undefined</Text>)
                }
              }
            }
          }
        }
      }
    }
    if (data.message) {
      if (data.message.conversation) {
        return <MessageConversation data={data} direction={direction} StatusMSG={StatusMSG} FAVORITES={FAVORITES} getdate={getdate} forwarded={forwarded} LINK={LINK} ColorSend={ColorSend} ColorReceive={ColorReceive} MaxWidth={MaxWidth} />
      }
      else {
        if (data.message.extendedTextMessage) {
          <MessageText data={data} direction={direction} StatusMSG={StatusMSG} FAVORITES={FAVORITES} getdate={getdate} forwarded={forwarded} LINK={LINK} ColorSend={ColorSend} ColorReceive={ColorReceive} MaxWidth={MaxWidth} />
        }
        else {
          if (data.message.imageMessage) {
            return (<MessageImage data={data} direction={direction} StatusMSG={StatusMSG} FAVORITES={FAVORITES} getdate={getdate} forwarded={forwarded} LINK={LINK} ColorSend={ColorSend} ColorReceive={ColorReceive} MaxWidth={MaxWidth} />)
          }
          else {
            if (data.message.audioMessage) {
              return (<MessageAudio data={data} direction={direction} StatusMSG={StatusMSG} FAVORITES={FAVORITES} getdate={getdate} forwarded={forwarded} LINK={LINK} ColorSend={ColorSend} ColorReceive={ColorReceive} MaxWidth={MaxWidth} />)
            }
            else {
              if (data.message.videoMessage) {
                return (<MessageVideo data={data} direction={direction} StatusMSG={StatusMSG} FAVORITES={FAVORITES} getdate={getdate} forwarded={forwarded} LINK={LINK} ColorSend={ColorSend} ColorReceive={ColorReceive} MaxWidth={MaxWidth} />)
              }
              else {
                if (data.message.documentMessage) {
                  return (<MessageDocument data={data} direction={direction} StatusMSG={StatusMSG} FAVORITES={FAVORITES} getdate={getdate} forwarded={forwarded} LINK={LINK} ColorSend={ColorSend} ColorReceive={ColorReceive} MaxWidth={MaxWidth} />)
                }
                else {
                  return (<Text> data.message === undefined</Text>)
                }
              }
            }
          }
        }
      }
    }
  }


  const [checking, setchecking] = useState(false);
  const [checked, setchecked] = useState(false);




  return (
    <TouchableOpacity
      style={{
        width: "100%",
        padding: 5,
        marginBottom: 2,
        justifyContent: flex,
        alignContent: flex,
        alignItems: flex,
        flexDirection: "row",

        borderBottomColor: "rgba(255,255,255,0.2)",
        borderBottomWidth: checking === true ? 1 : 0

      }}
    // onPress={() => OnSelect(props.data)}
    // onLongPress={() => LongSelect(props.data)}
    >







      {/*   
      
      


      {
        props.data.selected === true &&
        <TouchableOpacity
          onPress={() => props.CreateSelection(props.data)}
          style={{ position: "absolute", zIndex: 2, backgroundColor: "rgba(255,255,255,0.3)", width: "100%", height: "100%" }}></TouchableOpacity>
      } */}



      {/* {checking === true && <View style={{ position: "absolute", zIndex: 2, backgroundColor: "rgba(255,255,255,0.3)", width: "100%", height: "100%" }}></View>} */}



      {checking === true &&
        <TouchableOpacity
          onPress={() => setchecked(!checked)} style={{ width: "10%", alignItems: "center", alignContent: "center", flex: 1, alignSelf: "center" }}>
          <Icon name={checked ? "checkmark-square-2" : "square-outline"} fill="#fff" width={25} height={25} />
        </TouchableOpacity>
      }


      <View style={{
        width: checking === true ? "90%" : "100%",
        padding: 5,
        marginBottom: 2,
        justifyContent: flex,
        alignContent: flex,
        alignItems: flex,

      }}>



        {
          MessageType(props.data, direction)
          //GetTypeMessage(props.data, direction)
        }





      </View>





    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrap: {
    marginVertical: 1,
    shadowColor: "#000",
    maxWidth: MaxWidth,
    minWidth: "30%",
    paddingVertical: 5,
    paddingHorizontal: 10,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  messageRead: {
    position: "absolute",
    bottom: 0,
    right: 5
  }
});