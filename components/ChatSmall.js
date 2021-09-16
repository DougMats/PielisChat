import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, } from 'react-native';
import { Icon } from 'react-native-eva-icons';

function ChatSmall(props) {
  //console.log("chat small")
  const [show, setshow] = useState(false);
  const [writing, setwriting] = useState(false);
  const [recordingAudio, setrecordingAudio] = useState(false);

  function letterCounter(text, max) {
    return ((text.length > max) ? ((text.substring(0, max - 3)) + '...') : text)
  }

  function LookingLast(data, type) {
    const count = data.length
    if (type === "msg") {

      if (data[count - 1].message) {
        console.log("type msg", data[count - 1].message);

        if (data[count - 1].message.conversation) {
          return (<Text style={{ width: "100%" }}>{letterCounter(data[count - 1].message.conversation, 27)}</Text>)
        }

        if (data[count - 1].message.extendedTextMessage) {
          if (data[count - 1].message.extendedTextMessage.canonicalUrl) {
            return (<Text>{letterCounter(data[count - 1].message.extendedTextMessage.canonicalUrl, 27)}</Text>)
          }
          if (data[count - 1].message.extendedTextMessage.text) {
            return (<Text>{letterCounter(data[count - 1].message.extendedTextMessage.text, 27)}</Text>)
          }
        }

        if (data[count - 1].message.imageMessage) {
          return (
              <View style={{ width:"100%", flexDirection:"row"}}>
                <Icon name="image-2" fill={"white"} width={30} height={30} />
                <Text style={{width:"50%", color:"white", lineHeight:30, fontSize:16, fontWeight:"bold"}}>Foto</Text>
              </View>
          )
        }

        if (data[count - 1].message.audioMessage) {
          return (
            <View style={{ width: "100%", flexDirection: "row" }}>
              <Icon name="mic" fill={"white"} width={25} height={25} />
              <Text style={{ width: "50%", color: "white", lineHeight: 30, fontSize: 16, fontWeight: "bold" }}>0:08</Text>
            </View>
          )
        }
        else {
          console.log("ERROR = type message undefined")
        }

      }
      else {
        console.log("NOT MESSAGE  ");
      }
    }
    if (type === "from") {
      if (data[count - 1].status) {
        if (data[count - 1].status === "READ") {
          return <Icon name="done-all-outline" fill={"#0087FF"} width={15} height={15} style={{ top: 6 }} />
        }
        if (data[count - 1].status === "NOTREAD") {
          return <Icon name="done-all-outline" fill={"#FFF"} width={15} height={15} style={{ top: 6 }} />
        }
        if (data[count - 1].status === "SEND") {
          return <Icon name="checkmark-outline" fill={"#FFF"} width={15} height={15} style={{ top: 6 }} />
        }
        if (data[count - 1].status === "NOTSEND") {
          return <Icon name="clock-outline" fill={"#FFF"} width={15} height={15} style={{ top: 6 }} />
        }
      }
    }
    if (type === "time") {
      const datetime = parseInt(data[count - 1].messageTimestamp)
      const date = new Date(datetime * 1000)
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      const time = `${date.getHours()}:${date.getMinutes()}`
      //console.log(time, "datetime")
      //return `${day}/${month}/${year} ${time}`
      return `${time} p.m.`
    }
  }

  //seleccion simple onpress
  function simple(id) {
    console.log("simple")
    if (props.selectList === 0) {
      props.goToScreen("Chat", id)
    }
    else {
      props.SelectMany(id.jid)
    }
  }
  //seleccion long  longonpress
  function long(id) {
    props.SelectMany(id.jid)
  }

  return (
    <TouchableOpacity
      onPress={() => simple(props.data)}
      onLongPress={() => long(props.data)}
      style={{
        overflow: "hidden",
        //height: show === true ? null : 80,
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderBottomColor: "rgba(255,255,255,0.4)",
        borderBottomWidth: 0.3,
        backgroundColor: props.data.selected === true ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0)"
      }}>
      <View style={{ width: "20%", alignContent: "center", alignItems: "center", justifyContent: "center" }}>
        {props.data.selected === true &&
          <View style={{ position: "absolute", zIndex: 9, bottom: -5, right: 0, backgroundColor: "white", borderRadius: 20, justifyContent: "center", alignContent: "center", alignItems: "center" }}>
            <Icon name="checkmark-circle-2" fill={"#2ECC71"} width={30} height={30} />
          </View>
        }
        <View style={{ width: 60, height: 60, borderRadius: 40, backgroundColor: "silver", overflow: "hidden" }}>
          <Image style={{ width: null, height: null, resizeMode: "cover", flex: 1 }} source={{ uri: props.data.profilePicture }} />
        </View>
      </View>
      <View style={{ width: "80%", paddingLeft: 15 }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ height: 28, overflow: "hidden", color: "white", fontWeight: "bold", fontSize: 20, width: "70%", overflow: "hidden" }}>
            {
              letterCounter(props.data.name, 20)
            }
          </Text>
          <Text style={{ color: "white", width: "30%", lineHeight: 25 }}>{LookingLast(props.data.messages, "time")}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          {LookingLast(props.data.messages, "from")}



          <Text style={{ width: "95%", overflow: "hidden", color: "white", marginLeft: 5, fontSize: 18 }}>
            {LookingLast(props.data.messages, "msg")}
          </Text>


        </View>
        {writing === true && <Text style={{ color: "white", marginBottom: -10, fontWeight: "bold", fontSize: 14 }}>Escribiendo...</Text>}
        {recordingAudio === true && <Text style={{ color: "white", marginBottom: -10, fontWeight: "bold", fontSize: 14 }}>Grabando audio...</Text>}
      </View>
    </TouchableOpacity>
  );
}
export default ChatSmall;