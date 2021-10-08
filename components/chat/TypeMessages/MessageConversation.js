import React from "react";
import { StyleSheet, View, Text, } from "react-native";
import { Icon } from 'react-native-eva-icons';
function MessageConversation(props) {
  return (
    <View style={[styles.wrap, {
      maxWidth: props.MaxWidth,
      backgroundColor: props.data.key.fromMe ? props.ColorSend : props.ColorReceive,
      //backgroundColor:"red",
      borderTopRightRadius: props.direction === "left" ? 0 : 20,
      borderBottomRightRadius: props.direction === "left" ? 0 : 20,
      borderTopLeftRadius: props.direction === "left" ? 20 : 0,
      borderBottomLeftRadius: props.direction === "left" ? 20 : 0
    }]}>
      {props.forwarded()}
      <Text style={{ color: "#000" }}>{props.data.message.conversation}</Text>
      <View style={{ flexDirection: "row" }}>
      {props.FAVORITES("douglas")}
        {props.getdate(props.data.messageTimestamp, "#555")}
        {props.data.key.fromMe && props.StatusMSG(props.data.status)}
      </View>
    </View>
  )
}
export default MessageConversation;
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
