import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-eva-icons';
import { colorAlfa, colorBeta, colorDseta, colorGamma } from "../Colors";
import Toast from 'react-native-simple-toast';

function MessageAudio(props) {
  async function playAudio() { }
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
      <View style={{ flexDirection: "row", marginVertical: 5 }}>
        <TouchableOpacity
          onPress={() => playAudio()}
          style={{ justifyContent: "flex-end", paddingBottom: 10, }}>
          <Icon name="arrow-right" fill={"silver"} width={45} height={45} />
        </TouchableOpacity>
        <View style={{ width: (props.MaxWidth / 6) * 3.8, flexDirection: "column", paddingHorizontal: 5 }}>
          <View style={{ height: 35, justifyContent: "flex-end", paddingBottom: 10, width: "100%" }}>
            <View style={{ height: 2, backgroundColor: "white", width: "100%", backgroundColor: props.data.status === "PLAYED" ? "#0087FF" : "#2ECC71" }}>
            </View>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ color: "#555" }}>0:0{props.data.message.audioMessage.seconds}</Text>
            {props.getdate(props.data.messageTimestamp, "#555")}
          </View>
        </View>
        <View style={{ width: props.MaxWidth / 6, height: props.MaxWidth / 6, backgroundColor: "silver", borderRadius: (props.MaxWidth / 6) / 2 }}>
          <Icon name="mic" fill={props.data.status === "PLAYED" ? "#0087FF" : "#2ECC71"} width={25} height={25} style={{ position: "absolute", zIndex: 2, bottom: -55, left: -5 }} />
        </View>
      </View>
    </View>
  )
}

export default MessageAudio;

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