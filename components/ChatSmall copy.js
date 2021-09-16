import React from 'react';
import { View, Text, Image, TouchableOpacity, } from 'react-native';
import { Icon } from 'react-native-eva-icons';



function ChatSmall(props) {





  function LookingLast(data, type) {
    let variable
    const count = data.length
    if (data[count - 1].message.imageMessage) {
      if (data[count - 1].message.imageMessage.caption) {
        variable = data[count - 1].message.imageMessage.caption
      }
      else {
      }
    }
    if (data[count - 1].message.audioMessage) {
    }
    if (data[count - 1].message.conversation) {
      variable = data[count - 1].message.conversation
    }
    if (type === "msg") { return variable; }
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





  return (
    <TouchableOpacity
      onPress={() => props.goToScreen("Chat", props.data)}
      onLongPress={() => props.SelectMany(props.data)}
      style={{
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderBottomColor: "rgba(255,255,255,0.4)",
        borderBottomWidth: 0.3,
        backgroundColor: "rgba(255,255,255,1)"
      }}>



<Text>35t5orghu3tg</Text>

      {/* <View style={{ width: "20%", alignContent: "center", alignItems: "center", justifyContent: "center" }}>
       
       
       
       
       {props.data.selected === true &&
          <View style={{ position: "absolute", zIndex: 9, bottom: -5, right: 0, backgroundColor: "white", borderRadius: 20, justifyContent: "center", alignContent: "center", alignItems: "center" }}>
            <Icon name="checkmark-circle-2" fill={"#2ECC71"} width={30} height={30} />
          </View>
        }



        <View style={{ width: 60, height: 60, borderRadius: 40, backgroundColor: "silver", overflow: "hidden" }}>
          <Image style={{ width: null, height: null, resizeMode: "cover",flex: 1}} source={{uri:props.data.profilePicture}} />
        </View>
      </View>




*/}
      <View style={{ width: "80%", paddingLeft: 15 }}>
       
      <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 20, width: "75%" }}>{props.data.name}</Text>
          <Text style={{ color: "white", width: "25%", lineHeight: 25 }}>{LookingLast(props.data.messages, "time")}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          {LookingLast(props.data.messages, "from")}
          <Text style={{ color: "white", marginLeft: 5, fontSize: 18 }}>
            {((LookingLast(props.data.messages, "msg")).length > 32) ? (((LookingLast(props.data.messages, "msg")).substring(0, 32 - 3)) + '...') : LookingLast(props.data.messages, "msg")}
          </Text>
        </View>


      </View> 
    </TouchableOpacity>

  );
}


export default ChatSmall;