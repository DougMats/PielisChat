import React from "react";
import { StyleSheet, View, Text, } from "react-native";
import { Icon } from 'react-native-eva-icons';
import { colorBeta } from "../../../Colors";
function MessageText(props) {
  return (
    <View style={[styles.wrap, {
      maxWidth: props.MaxWidth,
      backgroundColor: props.data.key.fromMe ? props.ColorSend : props.ColorReceive,
      borderTopRightRadius: props.direction === "left" ? 0 : 20,
      borderBottomRightRadius: props.direction === "left" ? 0 : 20,
      borderTopLeftRadius: props.direction === "left" ? 20 : 0,
      borderBottomLeftRadius: props.direction === "left" ? 20 : 0
    }]}>
      {props.forwarded()}
      <View style={{ flexDirection: "column" }}>
        <View style={{ borderLeftColor: colorBeta, borderLeftWidth: 4, backgroundColor: "rgba(0,0,0,0.05)", borderRadius: 5, padding: 5 }}>
          <Text style={{ fontWeight: "bold", fontSize: 14, color: colorBeta }}>
            {props.data.key.fromMe === true ? "Tú" : props.contact.name}
          </Text>
          <Text style={styles.text}>{props.data.message.extendedTextMessage.contextInfo.quotedMessage.conversation}</Text>
        </View>
        <Text style={styles.text}>{props.data.message.extendedTextMessage.text}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
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
  text: {
    padding: 5,
    fontSize: 14,
    color: "black"
  }
});