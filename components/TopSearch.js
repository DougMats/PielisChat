import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from "react-native";
import { Icon } from 'react-native-eva-icons';
import { colorAlfa, colorBeta, colorGamma, colorEpsilon, colorDseta } from '../Colors.js'

function TopSearch(props) {
  const [text, settext] = useState("");
  function onChangeText(text) {
    settext(text)
  }

  useEffect(() => {
    props.search(text)
  }, [text]);



  return (
    <View style={{
      width: "100%",
      backgroundColor: colorBeta,
      flexDirection: "column",
      paddingVertical: 20,
      display: props.show === true ? "flex" : "none",
      borderBottomColor: "rgba(0,0,0,0.15)",
      borderBottomWidth: 1.5
    }}>
      <View style={{ width: "100%", padding: 10, flexDirection: "row" }}>
        <TouchableOpacity onPress={() => props.closeTopMenuSearch()}>
          <Icon name="arrow-back-outline" fill={"white"} width={30} height={30} style={{ top: 5 }} />
        </TouchableOpacity>
        <TextInput
          value={text}
          placeholder="Buscar..."
          placeholderTextColor="silver"
          style={{ color: "white", width: "85%", left: 15, fontSize: 20 }}
          onChangeText={text => onChangeText(text)}
        />
      </View>

      <View style={{
        paddingVertical: 5,
        paddingHorizontal: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",

      }}>
        <TouchableOpacity style={styles.btn}>
          <Icon name="image" fill={"white"} width={25} height={25} />
          <Text style={styles.btnText}>Fotos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Icon name="video" fill={"white"} width={25} height={25} />
          <Text style={styles.btnText}>Videos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Icon name="link" fill={"white"} width={25} height={25} />
          <Text style={styles.btnText}>Enlaces</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Icon name="gift" fill={"white"} width={25} height={25} />
          <Text style={styles.btnText}>GIF</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Icon name="music" fill={"white"} width={25} height={25} />
          <Text style={styles.btnText}>Audio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Icon name="file-text" fill={"white"} width={25} height={25} />
          <Text style={styles.btnText}>Documentos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: "32%",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 2,
    marginVertical: 5
  },
  btnText: {
    left: 5,
    color: "white",
    lineHeight: 20,
    fontWeight: "bold",
    fontSize: 14
  }
})
export default React.memo(TopSearch);