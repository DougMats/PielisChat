import React, { useState, useEffect, useRef } from "react";
import { Animated, View, StyleSheet, PanResponder, TouchableOpacity, Dimensions, Text } from "react-native";
import { Icon } from 'react-native-eva-icons';
import Hyperlink from 'react-native-hyperlink';



//import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
// //import { GetTypeMessage } from './GetTypeMessage.js'

import MessageImage from './TypeMessages/MessageImage.js'
import MessageConversation from './TypeMessages/MessageConversation.js'
import MessageText from './TypeMessages/MessageText.js'
import MessageAudio from './TypeMessages/MessageAudio.js'
import MessageDocument from './TypeMessages/MessageDocument.js'
import MessageVideo from './TypeMessages/MessageVideo.js'
import MessageOther from './TypeMessages/MessageOther.js'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const ColorSend = "#FFF"
const ColorReceive = "#EEE"
const MaxWidth = (windowWidth / 12) * 10

export default function Message(props) {
  const flex = props.data.key.fromMe ? "flex-end" : "flex-start";
  const direction = props.data.key.fromMe ? "left" : "right";
  const [check, setcheck] = useState(false);
  const pan = useRef(new Animated.ValueXY()).current;

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
      return <Text style={styles.messageRead}><Icon name="checkmark-outline" fill={"#555"} width={15} height={15} /></Text>
    }
  }

  function zfill(number, width) {
    var numberOutput = Math.abs(number);
    var length = number.toString().length;
    var zero = "0";
    if (width <= length) {
      if (number < 0) {
        return ("-" + numberOutput.toString());
      } else {
        return numberOutput.toString();
      }
    } else {
      if (number < 0) {
        return ("-" + (zero.repeat(width - length)) + numberOutput.toString());
      } else {
        return ((zero.repeat(width - length)) + numberOutput.toString());
      }
    }
  }

  function getdate(info, Color) {
    const datetime = parseInt(info)
    const date = new Date(datetime * 1000)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const time = `${date.getHours()}:${date.getMinutes()}`
    return <Text style={{ marginLeft: 5, textAlign: "right", paddingRight: 20, color: Color, }}>{`${zfill(day, 2)}-${zfill(month, 2)}-${year}. ${time} p.m.`}</Text>
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
          style: url === 'https://link.com' ? { color: 'red' } : { color: '#0087FF' },
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

  function MessageType(data, direction) {
    if (data.chat) {
      if (data.chat.message.conversation) {
        return (<MessageConversation contact={props.contact} data={data.chat} direction={direction} StatusMSG={StatusMSG} FAVORITES={FAVORITES} getdate={getdate} forwarded={forwarded} LINK={LINK} ColorSend={ColorSend} ColorReceive={ColorReceive} MaxWidth={MaxWidth} />)
      }
      else {
        if (data.chat.message.extendedTextMessage) {
          return (<MessageText contact={props.contact} data={data.chat} direction={direction} StatusMSG={StatusMSG} FAVORITES={FAVORITES} getdate={getdate} forwarded={forwarded} LINK={LINK} ColorSend={ColorSend} ColorReceive={ColorReceive} MaxWidth={MaxWidth} />)
        }
        else {
          if (data.chat.message.imageMessage) {
            return (<MessageImage contact={props.contact} data={data.chat} direction={direction} StatusMSG={StatusMSG} FAVORITES={FAVORITES} getdate={getdate} forwarded={forwarded} LINK={LINK} ColorSend={ColorSend} ColorReceive={ColorReceive} MaxWidth={MaxWidth} />)
          }
          else {
            if (data.chat.message.audioMessage) {
              return (<MessageAudio contact={props.contact} data={data.chat} direction={direction} StatusMSG={StatusMSG} FAVORITES={FAVORITES} getdate={getdate} forwarded={forwarded} LINK={LINK} ColorSend={ColorSend} ColorReceive={ColorReceive} MaxWidth={MaxWidth} />)
            }
            else {
              if (data.chat.message.videoMessage) {
                return (<MessageVideo contact={props.contact} data={data.chat} direction={direction} StatusMSG={StatusMSG} FAVORITES={FAVORITES} getdate={getdate} forwarded={forwarded} LINK={LINK} ColorSend={ColorSend} ColorReceive={ColorReceive} MaxWidth={MaxWidth} />)
              }
              else {
                if (data.chat.message.documentMessage) {
                  return (<MessageDocument contact={props.contact} data={data.chat} direction={direction} StatusMSG={StatusMSG} FAVORITES={FAVORITES} getdate={getdate} forwarded={forwarded} LINK={LINK} ColorSend={ColorSend} ColorReceive={ColorReceive} MaxWidth={MaxWidth} />)
                }
                else {
                  console.log("data.chat.message === undefined")
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
        return <MessageConversation contact={props.contact} data={data} direction={direction} StatusMSG={StatusMSG} FAVORITES={FAVORITES} getdate={getdate} forwarded={forwarded} LINK={LINK} ColorSend={ColorSend} ColorReceive={ColorReceive} MaxWidth={MaxWidth} />
      }
      else {
        if (data.message.extendedTextMessage) {
          return (<MessageText contact={props.contact} data={data} direction={direction} StatusMSG={StatusMSG} FAVORITES={FAVORITES} getdate={getdate} forwarded={forwarded} LINK={LINK} ColorSend={ColorSend} ColorReceive={ColorReceive} MaxWidth={MaxWidth} />)
        }
        else {
          if (data.message.imageMessage) {
            return (<MessageImage contact={props.contact} data={data} direction={direction} StatusMSG={StatusMSG} FAVORITES={FAVORITES} getdate={getdate} forwarded={forwarded} LINK={LINK} ColorSend={ColorSend} ColorReceive={ColorReceive} MaxWidth={MaxWidth} />)
          }
          else {
            if (data.message.audioMessage) {
              return (<MessageAudio contact={props.contact} data={data} direction={direction} StatusMSG={StatusMSG} FAVORITES={FAVORITES} getdate={getdate} forwarded={forwarded} LINK={LINK} ColorSend={ColorSend} ColorReceive={ColorReceive} MaxWidth={MaxWidth} />)
            }
            else {
              if (data.message.videoMessage) {
                return (<MessageVideo contact={props.contact} data={data} direction={direction} StatusMSG={StatusMSG} FAVORITES={FAVORITES} getdate={getdate} forwarded={forwarded} LINK={LINK} ColorSend={ColorSend} ColorReceive={ColorReceive} MaxWidth={MaxWidth} />)
              }
              else {
                if (data.message.documentMessage) {
                  return (<MessageDocument contact={props.contact} data={data} direction={direction} StatusMSG={StatusMSG} FAVORITES={FAVORITES} getdate={getdate} forwarded={forwarded} LINK={LINK} ColorSend={ColorSend} ColorReceive={ColorReceive} MaxWidth={MaxWidth} />)
                }
                else {
                  console.log("data.message === undefined")
                  return (<Text> data.message === undefined</Text>)
                }
              }
            }
          }
        }
      }
    }
    else {
      return (<MessageOther contact={props.contact} data={data} direction={direction} StatusMSG={StatusMSG} FAVORITES={FAVORITES} getdate={getdate} forwarded={forwarded} LINK={LINK} ColorSend={ColorSend} ColorReceive={ColorReceive} MaxWidth={MaxWidth} />)
    }
  }

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        {
          dx: pan.x,
          //dy: pan.y
        }
      ],
        { useNativeDriver: false }),
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true
        }).start();
      },
      onPanResponderEnd: (e, gestureState) => {
        async function send() {
          if (gestureState.dx > 100) {
            await props.messagesSelectesInsert(props.data)
          }
          if (gestureState.dx < -100) {
            await props.messagesSelectesDelete(props.data)
          }
        }
        send()
      }
    })
  ).current;




  useEffect(() => {
    async function actives() {
      const active = props.messagesSelectes.filter(element => element.key.id === props.data.key.id)
      if (active.length === 0) { setcheck(false) }
      if (active.length === 1) { setcheck(true) }
    }
    actives()
}, [props.messagesSelectes]);

// data={i}
// contact={props.contact}
// CreateSelection={props.CreateSelection}
// selectToAnswer={props.selectToAnswer}
// messagesSelectes={props.messagesSelectes}
// messagesSelectesInsert={props.messagesSelectesInsert}
// messagesSelectesDelete={props.messagesSelectesDelete}
// messagesSelectesClear={props.messagesSelectesClear}

async function OnSelect(data) {
  if (props.messagesSelectes.length === 0) {
    props.messagesSelectesInsert(props.data)
    props.messagesSelectesDelete(props.data)
  }
  else {
    props.messagesSelectesInsert(props.data)
    props.messagesSelectesDelete(props.data)
  }
}

async function LongSelect(data) {
  if (props.messagesSelectes.length === 0) {
    props.messagesSelectesInsert(props.data)
    props.messagesSelectesDelete(props.data)
  }
  else {
    props.messagesSelectesInsert(props.data)
    props.messagesSelectesDelete(props.data)
  }
}

return (
  <Animated.View
    style={{
      flexDirection: "row",
      transform: [{ translateX: pan.x }, { translateY: pan.y }]
    }}
    {...panResponder.panHandlers}
  >
    {check === true &&
      <TouchableOpacity
        onPress={() => props.messagesSelectesDelete(props.data)} style={{ width: "10%", alignItems: "center", alignContent: "center", flex: 1, alignSelf: "center" }}>
        <Icon name={check ? "checkmark-square-2" : "square-outline"} fill="#fff" width={25} height={25} />
      </TouchableOpacity>
    }
    <TouchableOpacity
      style={{
        width: check === true ? "90%" : "100%",
        marginBottom: 1,
        justifyContent: flex,
        alignContent: flex,
        alignItems: flex,
      }}
      onPress={() => OnSelect(props.data)}
      onLongPress={() => LongSelect(props.data)}
    >
      {MessageType(props.data, direction)}
    </TouchableOpacity>
    {
      check &&
      <View style={{ position: "absolute", zIndex: 2, backgroundColor: "rgba(255,255,255,0.2)", width: "100%", height: "100%" }}></View>
    }
  </Animated.View>
);
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