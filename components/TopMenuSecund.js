import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { colorBeta } from '../Colors.js'
function TopMenuSecund(props) {
  function SETSection(e) {
    props.changeSection(e)
  }
  return (
    <View style={styles.wrap}>
      <TouchableOpacity onPress={() => SETSection(0)} style={[styles.btn, { borderBottomColor: props.section === "camera" ? colorBeta : "#rgba(0,0,0,0)", width: "10%", }]}><Icon name="camera" fill={props.section === "camera" ? colorBeta : "white"} width={30} height={30} style={{}} /></TouchableOpacity>
      <TouchableOpacity onPress={() => SETSection(1)} style={[styles.btn, { borderBottomColor: props.section === "chats" ?  colorBeta : "#rgba(0,0,0,0)", width: "30%" }]}><Text style={[styles.text, { color: props.section === "chats" ? colorBeta : "white"}]}>CHATS ({props.data.length})</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => SETSection(2)} style={[styles.btn, { borderBottomColor: props.section === "states" ? colorBeta : "#rgba(0,0,0,0)", width: "30%" }]}><Text style={[styles.text, { color: props.section === "states" ? colorBeta : "white"}]}>ESTADOS</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => SETSection(3)} style={[styles.btn, { borderBottomColor: props.section === "calls" ?  colorBeta : "#rgba(0,0,0,0)", width: "30%" }]}><Text style={[styles.text, { color: props.section === "calls" ? colorBeta : "white"}]}>LLAMADAS</Text></TouchableOpacity>
    </View>

  );
}

const styles = StyleSheet.create({
  wrap: { width: "100%", flexDirection: "row" },
  btn: {
    borderBottomWidth: 2,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  text: {
    textAlign: "center", lineHeight: 30, fontWeight: "bold",fontSize: 16
  }

})
export default React.memo(TopMenuSecund);