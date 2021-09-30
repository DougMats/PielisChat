import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, TextInput } from "react-native";
import { Icon } from 'react-native-eva-icons';
import { colorAlfa, colorBeta, colorGamma, colorEpsilon, colorDseta } from '../../Colors.js'
import Toast from 'react-native-simple-toast';
import { ScrollView } from "react-native-gesture-handler";



function Search(props) {

  const [text, settext] = useState("");
  function onChangeText(text) {
    settext(text)
  }

  useEffect(() => {
    props.search(text)
  }, [text]);

  //console.log(props.data)

  return (
    <View style={{
      width: "100%",
      backgroundColor: colorBeta,
      flexDirection: "column",
      paddingVertical: 20,
      borderBottomColor: "rgba(0,0,0,0.15)",
      borderBottomWidth: 1.5
    }}>


      <View style={{ width: "100%", padding: 10, flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => props.closeTopMenuSearch()}
        >
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
        width: "100%",
        //paddingBottom: props.data.length !== 0 ? 100 : 0,
        maxHeight: 500, backgroundColor: "rgba(0,0,0,0.1)",
      }}>

        <ScrollView>
          {text !== "" && props.data.length !== 0 && props.data.map((i, key) => {
            return (
              <TouchableOpacity
                style={styles.contact}
                key={key}
                onPress={() => [
                  props.goToScreen("Chat", i),
                  //props.closeTopMenuSearch()
                ]}
              >
                <View style={styles.left}>
                  <View style={styles.avatarWrap}>
                    <Image style={styles.avatar} source={{ uri: i.profilePicture }} />
                  </View>
                </View>
                <View style={styles.right}>
                  <View style={styles.wrap}>
                    <Text style={styles.name}>{i.name}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })}

        </ScrollView>
        {text !== "" && props.data.length === 0 &&
          <Text style={styles.emptyText}>No se encontraron resultados.</Text>
        }

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
        <TouchableOpacity onPress={() => Toast.show("Esta función aun no está disponible en esta versión")}
          style={styles.btn}>
          <Icon name="image" fill={"white"} width={25} height={25} />
          <Text style={styles.btnText}>Fotos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Toast.show("Esta función aun no está disponible en esta versión")}
          style={styles.btn}>
          <Icon name="video" fill={"white"} width={25} height={25} />
          <Text style={styles.btnText}>Videos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Toast.show("Esta función aun no está disponible en esta versión")}
          style={styles.btn}>
          <Icon name="link" fill={"white"} width={25} height={25} />
          <Text style={styles.btnText}>Enlaces</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Toast.show("Esta función aun no está disponible en esta versión")}
          style={styles.btn}>
          <Icon name="gift" fill={"white"} width={25} height={25} />
          <Text style={styles.btnText}>GIF</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Toast.show("Esta función aun no está disponible en esta versión")}
          style={styles.btn}>
          <Icon name="music" fill={"white"} width={25} height={25} />
          <Text style={styles.btnText}>Audio</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Toast.show("Esta función aun no está disponible en esta versión")}
          style={styles.btn}>
          <Icon name="file-text" fill={"white"} width={25} height={25} />
          <Text style={styles.btnText}>Documentos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contact: {
    flexDirection: "row",
    marginVertical: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderBottomColor: "rgba(0,0,0,0.2)",
    borderBottomWidth: 1
  },
  left: {
    width: "15%",
  },
  right: {
    width: "85%",
    padding: 10,
  },
  avatarWrap: {
    width: 60,
    height: 60,
    borderRadius: 60,
    overflow: "hidden",
    backgroundColor: "silver"
  },
  avatar: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover"
  },
  wrap: {
    flexDirection: "column",
  },
  name: {
    fontSize: 14,
    color: "black",
    opacity: 0.6
  },
  emptyText: {
    textAlign: "center",
    paddingVertical: 25,
    fontWeight: "bold",
    opacity: 0.3,
    fontSize: 16
  },
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
export default Search;