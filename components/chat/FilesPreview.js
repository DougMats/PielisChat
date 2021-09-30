import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, Image, View, Text, TouchableOpacity, Dimensions } from 'react-native'
import { Icon } from 'react-native-eva-icons';
import { colorBeta, colorGamma, colorDseta } from '../../Colors.js'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function FilesPreview(props) {
  if (props.data.uri) {
    return (
      <View style={[styles.wrap, { display: props.data !== {} ? "flex" : "none" }]}>
        <TouchableOpacity
          onPress={() => props.delete()}
          style={[styles.btnUp, { right: 10 }]}>
          <Icon name="trash" fill={"#555"} width={25} height={25} />
        </TouchableOpacity>
        <View style={styles.wrapImage}>
          <Image
            style={styles.img}
            source={{ uri: props.data.uri }}
          />
        </View>
      </View>
    )
  }
  else {
    return (<></>)
  }

}
const styles = StyleSheet.create({
  wrap: {
    //marginBottom: -5,
    backgroundColor: "#555",//"rgba(0,0,0,0.8)",
    width: "100%",
    flexDirection: "column",
    padding: 5,
    paddingTop: 50
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
    width: windowWidth - 10,
    height: windowWidth
  },
  img: {
    width: null,
    height: null,
    flex: 1,
    resizeMode: "cover"
  }
})
export default FilesPreview;