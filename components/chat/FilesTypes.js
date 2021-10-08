import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, ShadowPropTypesIOS } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { colorAlfa, colorBeta, colorGamma } from '../../Colors.js'







function FilesTypes(props) {
  const Document = () => {
    let type = "Document"
    return type
  }
  const Gallery = () => {
    let type = "Gallery"
    return type
  }







  // const Document = () => {
  //   let type = "Document"
  //   return type
  // }
  const Camera = () => {
    let type = "Camera"
    return type
  }
  const Audio = () => {
    let type = "Audio"
    return type
  }
  const LivingRoom = () => {
    let type = "LivingRoom"
    return type
  }
  const Location = () => {
    let type = "Location"
    return type
  }
  const Contact = () => {
    let type = "Contact"
    return type
  }

  function selectTypeFile(callback) {
    let type = callback()
    props.ShowLoadFile()
    props.getTypeMessage(type)
  }

  return (
    <TouchableOpacity style={[styles.wrapper, {
      display: props.show === true ? "flex" : "none"
    }]} onPress={() => props.ShowLoadFile()}>
      <View style={styles.wrap}>

        <TouchableOpacity style={styles.option} onPress={() => selectTypeFile(Document)}>
          <View style={[{ backgroundColor: "#FFDC00" }, styles.circle]}>
            <Icon name="folder" fill={"white"} width={30} height={30} />
            <View style={styles.shadow}></View>
          </View>
          <Text style={styles.text}>Documento</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => selectTypeFile(Gallery)}>
          <View style={[{ backgroundColor: "#E644FF" }, styles.circle]}>
            <Icon name="image-2" fill={"white"} width={30} height={30} />
            <View style={styles.shadow}></View>
          </View>
          <Text style={styles.text}>Galería</Text>
        </TouchableOpacity>





    {/* <TouchableOpacity style={styles.option} onPress={() => selectTypeFile(Document)}>
        <View style={[{ backgroundColor: "#6F44FF" }, styles.circle]}>
          <Icon name="file" fill={"white"} width={30} height={30} />
          <View style={styles.shadow}></View>
        </View>
        <Text style={styles.text}>Documento</Text>
      </TouchableOpacity> */}

        {/* 
    <TouchableOpacity style={styles.option} onPress={() => selectTypeFile(Camera)}>
        <View style={[{ backgroundColor: "#FF445E" }, styles.circle]}>
          <Icon name="camera" fill={"white"} width={30} height={30} />
          <View style={styles.shadow}></View>
        </View>
        <Text style={styles.text}>Cámara</Text>
      </TouchableOpacity>
      */}

        {/* 
      <TouchableOpacity style={styles.option} onPress={() => selectTypeFile(LivingRoom)}>
        <View style={[{ backgroundColor: "#FFA744" }, styles.circle]}>
          <Icon name="headphones" fill={"white"} width={30} height={30} />
          <View style={styles.shadow}></View>
        </View>
        <Text style={styles.text}>Audio</Text>
      </TouchableOpacity>
 */}

        {/* 
      <TouchableOpacity style={styles.option} onPress={() => selectTypeFile(LivingRoom)}>
        <View style={[{ backgroundColor: "#44DAFF" }, styles.circle]}>
          <Icon name="video" fill={"white"} width={30} height={30} />
          <View style={styles.shadow}></View>
        </View>
        <Text style={styles.text}>Sala</Text>
      </TouchableOpacity>
 */}

        {/* 
      <TouchableOpacity style={styles.option} onPress={() => selectTypeFile(Location)}>
        <View style={[{ backgroundColor: "#2ECC71" }, styles.circle]}>
          <Icon name="pin" fill={"white"} width={30} height={30} />
          <View style={styles.shadow}></View>
        </View>
        <Text style={styles.text}>Ubicación</Text>
      </TouchableOpacity>
 */}

        {/* 
      <TouchableOpacity style={styles.option} onPress={() => selectTypeFile(Contact)}>
        <View style={[{ backgroundColor: "#7D3C98" }, styles.circle]}>
          <Icon name="person" fill={"white"} width={30} height={30} />
          <View style={styles.shadow}></View>
        </View>
        <Text style={styles.text}>Contacto</Text>
      </TouchableOpacity>
 */}
      </View>
    </TouchableOpacity>
  )
}

const circle = 70
const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.2)",
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignContent: "center",
    alignItems: "center",
    paddingBottom: 75
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "white",
    width: "90%",
    borderRadius: 12,
    padding: 10,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  option: {
    marginHorizontal: 20,
    marginVertical: 5
  },
  circle: {
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    width: circle,
    height: circle,
    borderRadius: circle / 2,
  },
  shadow: {
    backgroundColor: "rgba(0,0,0,0.1)",
    zIndex: -1,
    width: circle,
    height: circle / 2,
    position: "absolute",
    top: 0
  },
  text: {
    color: "#777",
    textAlign: "center"
  },
});
export default FilesTypes