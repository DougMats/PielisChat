import React from "react";
import { StyleSheet, View, Text, } from "react-native";
import { Icon } from 'react-native-eva-icons';
function MessageOther(props) {
  //console.log("other: ", props.data)
  // { "key": {"fromMe": true,  "id": "922AB040D8C710927E51475C3E9FF473",  "remoteJid": "573152077862@s.whatsapp.net"}, "messageStubParameters": ["3EB031B19D70"],                     "messageStubType": "REVOKE", "messageTimestamp": "1632420338"},
  // { "key": {"fromMe": true,  "id": "74EE4136AF6EC0F3CF0C9D6C0A0B1710",  "remoteJid": "573152077862@s.whatsapp.net"},                                                                "messageStubType": "REVOKE", "messageTimestamp": "1633029685", "status": "DELIVERY_ACK"},
  // { "key": {"fromMe": true,  "id": "2F25D8E5DD9966168BEBEB4E78C99739",  "remoteJid": "573152077862@s.whatsapp.net"}, "messageStubParameters": ["74EE4136AF6EC0F3CF0C9D6C0A0B1710"], "messageStubType": "REVOKE", "messageTimestamp": "1633029685"},

  return (
    <View style={[styles.wrap, {
      maxWidth: props.MaxWidth,
      backgroundColor: "#999",
      borderRadius: 8,
      flexDirection: "column"
    }]}>
      <View style={{flexDirection:"row"}}>
        <Icon name="slash-outline" fill="#555" width={20} height={20} />
        <Text style={{ color: "#555", fontWeight: "bold", fontSize: 14, marginLeft: 5 }}>Mensaje eliminado</Text>
      </View>
      {/* {props.forwarded()} <Text style={{ color: "#000" }}>{props.data.message.conversation}</Text>*/}
      <View style={{ flexDirection: "row" , alignItems:"flex-end", alignContent:"flex-end", justifyContent:"flex-end"}}>
        {props.FAVORITES("douglas")}
        {props.getdate(props.data.messageTimestamp, "#555")}
        {
          //props.data.key.fromMe && props.StatusMSG(props.data.status)
        }
      </View>
    </View>
  )
}

export default MessageOther;
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
