import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, Image, View, Text, TouchableOpacity, Dimensions } from 'react-native'
import { Icon } from 'react-native-eva-icons';
import { colorBeta } from '../../Colors.js'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function FilesPreviewMultiples(props) {
  const [MultiplesFilesPosition, setMultiplesFilesPosition] = useState(0);
  const [Picture, setPicture] = useState("");
  const [ShowSelected, setShowSelected] = useState(true);

  useEffect(() => {
    if (props.data.length >= 1) {
      setPicture(props.data[0].uri)
    }
  }, [props.data]);

  useEffect(() => {
    if (Picture !== "") {
      setShowSelected(true)
    }
  }, [Picture]);

  function deleteItem() {
    props.delete(Picture)
  }
  return (
    <View style={[styles.wrap, { display: props.data.length !== 0 ? "flex" : "none", paddingTop: ShowSelected === true ? 50 : 0 }]}>

      {ShowSelected === true &&
        <TouchableOpacity onPress={() => setShowSelected(!ShowSelected)}
          style={[styles.btnUp, { left: 10 }]}>
          <Icon name="arrow-ios-downward" fill={"#555"} width={25} height={25} />
        </TouchableOpacity>
      }

      {ShowSelected === true &&
        <TouchableOpacity onPress={() => deleteItem()}
          style={[styles.btnUp, { right: 10 }]}>
          <Icon name="trash" fill={"#555"} width={25} height={25} />
        </TouchableOpacity>
      }

      {ShowSelected === true &&
        <View style={styles.wrapImage}>
          {Picture !== "" &&
            <Image source={{ uri: Picture }} style={styles.img} />
          }
        </View>
      }
      <ScrollView horizontal={true}>
        {props.data.map((i, key) => {
          return (
            <TouchableOpacity key={key} onPress={() => [setMultiplesFilesPosition(key), setPicture(i.uri), setShowSelected(true)]} style={styles.btn}>
              <Text style={styles.text}>
                {key + 1}/{props.data.length}
              </Text>
              <Image
                source={{ uri: i.uri }}
                style={[styles.img,{ borderColor: MultiplesFilesPosition === key ? colorBeta : "black", borderWidth: MultiplesFilesPosition === key ? 2 : 0, }]}
              />
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  wrap: {
    marginBottom:-5,
    backgroundColor: "#555",//"rgba(0,0,0,0.8)",
    width: "100%",
    flexDirection: "column",
    paddingHorizontal: 5,
  },
  btnUp: {
    position: "absolute",
    zIndex: 9999,
    top: 10,
    width: 35,
    borderRadius: 20,
    height: 35,
    backgroundColor: "rgba(255,255,255,1)",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  wrapImage: {
    marginBottom: 5,
    width: windowWidth - 20,
    height: windowWidth
  },
  img: {
    width: null,
    height: null,
    flex: 1,
    resizeMode: "cover"
  },
  btn: {
    width: 80,
    height: 80,
    margin: 5,
    borderRadius: 8
  },
  text: {
    position: "absolute",
    zIndex: 9999,
    top: 2,
    left: 2,
    lineHeight: 20,
    textAlign: "center",
    paddingHorizontal: 2,
    fontSize: 10,
    backgroundColor: "rgba(255,255,255,0.5)",
    color: "#555"
  },
})
export default FilesPreviewMultiples;
