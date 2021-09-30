import React from "react";
import { StyleSheet, View, Text, } from "react-native";
import { Icon } from 'react-native-eva-icons';
function MessageText(props) {
  return (
    <View style={[styles.wrap, {
      maxWidth: props.MaxWidth,
      //backgroundColor: props.data.key.fromMe ? props.ColorSend : props.ColorReceive,
      borderTopRightRadius: props.direction === "left" ? 0 : 20,
      borderBottomRightRadius: props.direction === "left" ? 0 : 20,
      borderTopLeftRadius: props.direction === "left" ? 20 : 0,
      borderBottomLeftRadius: props.direction === "left" ? 20 : 0
    }]}>
      {props.forwarded()}
      <Text style={{ color: "#000" }}>{props.data.message.conversation}</Text>
      <View style={{ flexDirection: "row" }}>
        {
          <Icon name="star" fill={"orange"} width={15} height={15} style={{ marginTop: 3 }} />
        }
        {props.getdate(props.data.messageTimestamp, "#555")}
        {props.data.key.fromMe && props.StatusMSG(props.data.status)}
      </View>
    </View>
  )
}

export default MessageText;
const styles = StyleSheet.create({
  wrap: {
    marginVertical: 1,
    shadowColor: "#000",
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
});







// function MessageTypeExtendedTextMessage(props) {
//   function filter() {
//     if (props.data.message.extendedTextMessage.canonicalUrl) {
//       //console.log("ExtendedTextMessage -----> canonicalUrl", props.data.message.extendedTextMessage.canonicalUrl)
//       return LINK(props.data.message.extendedTextMessage.canonicalUrl)
//     }
//     if (props.data.message.extendedTextMessage.text) {
//       //console.log("ExtendedTextMessage -----> text", props.data.message.extendedTextMessage.text)
//       return LINK(props.data.message.extendedTextMessage.text)
//     }
//   }
//   return (
//     <View style={[styles.wrap, {
//       backgroundColor: props.data.key.fromMe ? ColorSend : ColorReceive,
//       //backgroundColor: "orange",
//       borderTopRightRadius: props.direction === "left" ? 0 : 20, borderBottomRightRadius: props.direction === "left" ? 0 : 20, borderTopLeftRadius: props.direction === "left" ? 20 : 0, borderBottomLeftRadius: props.direction === "left" ? 20 : 0
//     }]}>

//       {forwarded()}
//       <View style={{ backgroundColor: "rgba(0,0,0,0.1)", minWidth: "100%", padding: 5, borderRadius: 8, }}>
//         <Text>rtrtrt</Text>
//       </View>
//       {filter()}
//       <View style={{ flexDirection: "row" }}>
//         {<Icon name="star" fill={"orange"} width={15} height={15} style={{ marginTop: 3 }} />}
//         {getdate(props.data.messageTimestamp, "#555")}
//         {props.data.key.fromMe && StatusMSG(props.data.status)}
//       </View>
//     </View>
//   )
// }
