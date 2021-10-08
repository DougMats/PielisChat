import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { colorGamma } from '../../Colors';

function UserMessage(props) {
  //console.log("chat small")
  const [show, setshow] = useState(false);
  const [writing, setwriting] = useState(false);
  const [recordingAudio, setrecordingAudio] = useState(false);


  function letterCounter(text, max) {
    return ((text.length > max) ? ((text.substring(0, max - 3)) + '...') : text)
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




  function LookingLast(data, type) {
    const count = data.length
    if (type === "msg") {
      if (data[count - 1].message) {
        //console.log("type msg", data[count - 1].message);
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
            <View style={{ width: "100%", flexDirection: "row" }}>
              <Icon name="image-2" fill={"white"} width={30} height={30} />
              <Text style={{ width: "50%", color: "white", lineHeight: 30, fontSize: 16, fontWeight: "bold" }}>Foto</Text>
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
        if (data[count - 1].message.documentMessage) {
          return (
            <View style={{ width: "100%", flexDirection: "row" }}>
              <Icon name="file-text-outline" fill={"white"} width={25} height={25} />
              <Text style={{ width: "50%", color: "white", lineHeight: 30, fontSize: 16, fontWeight: "bold" }}>
                {letterCounter(data[count - 1].message.documentMessage.fileName, 27)}
              </Text>
            </View>
          )
        }
        else {
          //console.log("ERROR = type message undefined")
        }
      }
      else {
        //console.log("NOT MESSAGE  ");
      }
    }


    if (type === "from") {




      return <Icon name="done-all-outline" fill={"#0087FF"} width={15} height={15} style={{ top: 6 }} />
      // if (data[count - 1].status) {
      // // console.log("estado del mensaje:", data[count - 1].status)
      // if (data[count - 1].status === "DELIVERY_ACK") {
      //   return <Icon name="done-all-outline" fill={"#0087FF"} width={15} height={15} style={{ top: 6 }} />
      // }
      //   if (data[count - 1].status === "READ") {
      //     return <Icon name="done-all-outline" fill={"#0087FF"} width={15} height={15} style={{ top: 6 }} />
      //   }
      //   if (data[count - 1].status === "NOTREAD") {
      //     return <Icon name="done-all-outline" fill={"#FFF"} width={15} height={15} style={{ top: 6 }} />
      //   }
      //   if (data[count - 1].status === "SEND") {
      //     return <Icon name="checkmark-outline" fill={"#FFF"} width={15} height={15} style={{ top: 6 }} />
      //   }
      //   if (data[count - 1].status === "NOTSEND") {
      //     return <Icon name="clock-outline" fill={"#FFF"} width={15} height={15} style={{ top: 6 }} />
      //   }
      // }
    }


    if (type === "time") {
      const datetime = parseInt(data[count - 1].messageTimestamp)
      const date = new Date(datetime * 1000)
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      const hours = zfill(date.getHours(), 2)
      const minutes = zfill(date.getMinutes(), 2)
      const ampm = date.getHours() >= 12 ? 'pm' : 'am';
      const time = `${hours > 12 ? zfill((hours - 12), 2) : zfill(hours, 2)}:${minutes} ${ampm}`
      return <Text style={{ marginLeft: 5, fontSize: 12, lineHeight: 16, textAlign: "right", paddingRight: 20, color: "white" }}>{`${zfill(day, 2)}-${zfill(month, 2)}-${year}\n${time}`}</Text>
    }





  }


  //seleccion simple onpress
  function simple(id) {
    // console.log("simple")
    if (props.selectList === 0) {
      props.goToScreen("Chat", id, props.users)
    }
    else {
      props.SelectMany(id.jid)
    }
  }
  //seleccion long  longonpress
  function long(id) {
    props.SelectMany(id.jid)
  }

// console.log("__________________")
// console.log("--- count: ",props.data.count," ---")
// console.log("------------------")

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
        <TouchableOpacity onPress={() => props.showAvatar(props.data)}
          style={{ width: 60, height: 60, borderRadius: 40, overflow: "hidden" }}>
          {/* <View style={{zIndex:2, position:"absolute", width:"100%", height:"100%"}}><Image style={{ width: null, height: null, resizeMode: "cover", flex: 1 }} source={{ uri: props.data.profilePicture }} /></View> */}
          <View style={{ zIndex: 1, position: "absolute", width: "100%", height: "100%" }}><Image style={{ width: null, height: null, resizeMode: "cover", flex: 1 }} source={require("../../images/isotype2.png")} /></View>
        </TouchableOpacity>
      </View>
      <View style={{ width: "80%", paddingLeft: 15 }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ height: 28, overflow: "hidden", color: "white", fontWeight: "bold", fontSize: 20, width: "70%", overflow: "hidden" }}>
            {
              letterCounter(props.data.name, 20)
            }
          </Text>
          {/* <Text style={{ color: "white", width: "30%", lineHeight: 25 }}> */}
          {LookingLast(props.data.messages, "time")}
          {/* </Text> */}
        </View>
        <View style={{ flexDirection: "row", width: "100%" }}>


          {LookingLast(props.data.messages, "from")}


          <Text style={{ width: "80%", overflow: "hidden", color: "white", marginLeft: 5, fontSize: 18 }}>
            {LookingLast(props.data.messages, "msg")}
          </Text>


          {
            props.data.count !== 0 &&
            <View style={{ marginTop: 5, width: "20%", backgroundColor: "#2ECC71", width: 25, height: 25, borderRadius: 25, justifyContent: "center", alignContent: "center", alignItems: "center" }}>
              <Text style={{ color: "white", position: "absolute", fontSize: 10 }}>{props.data.count}</Text>
              <Icon name="radio-button-off" fill={"white"} width={24} height={24} />
            </View>
          }


        </View>


        {writing === true && <Text style={{ color: "white", marginBottom: -10, fontWeight: "bold", fontSize: 14 }}>Escribiendo...</Text>}
        {recordingAudio === true && <Text style={{ color: "white", marginBottom: -10, fontWeight: "bold", fontSize: 14 }}>Grabando audio...</Text>}
      </View>
    </TouchableOpacity>
  );
}
export default UserMessage;