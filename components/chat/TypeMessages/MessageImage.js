import React, { useState } from "react";
import { StyleSheet, View, Text, Modal, TouchableOpacity, Image, Dimensions, ActivityIndicator } from "react-native";
import { Icon } from 'react-native-eva-icons';
import ImageZoom from 'react-native-image-pan-zoom';
import axios from 'axios';
import Toast from 'react-native-simple-toast';

export default function MessageImage(props) {
  const [modal, setmodal] = useState(false);
  const [modalImage, setmodalImage] = useState(null);
  const [Load, setLoad] = useState(false);
  const format = props.data.message.imageMessage.mimetype
  const Codebase64 = props.data.message.imageMessage.jpegThumbnail
  const base64Image = `data:${format};base64,${Codebase64}`;
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const ImageWidth = 110
  const ImageHeight = 160

  async function GetImageModal(mediaKey, url) {
    var bodyFormData = new FormData();
    bodyFormData.append('mediakey', mediaKey)
    bodyFormData.append('filenc', url)
    try {
      const response = await axios({
        method: "post",
        url: `https://pdtclientsolutions.com:5000/decrypt`,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" }
      })
      console.log("esponse.data.file", response.data.file)
      return response.data.file
    }
    catch (error) {
      console.log("error: ", error)
    }
  }

  async function ShowModal() {
    setLoad(true)
    let imagen = await GetImageModal(props.data.message.imageMessage.mediaKey, props.data.message.imageMessage.url)
    console.log("img->", imagen)
    if (imagen === undefined) {
      Toast.show('Error al descargar imagen');
    }
    else {
      setLoad(false)
      setmodal(true)
      setmodalImage(imagen)
    }
  }

  function HiddenModal() {
    setmodal(false)
    setmodalImage(null);
  }

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
      <TouchableOpacity onPress={() => ShowModal()}>
        {Load &&
          <View style={{
            position: "absolute",
            zIndex: 999,
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            width: ImageWidth,
            height: ImageHeight
          }}>
            <ActivityIndicator color="white" size={40} />
          </View>
        }
        <Image style={{ width: ImageWidth, height: ImageHeight, resizeMode: "cover", borderRadius: 8, margin: 5 }} source={{ uri: base64Image }} />
      </TouchableOpacity>
      <View style={{ flexDirection: "row" }}>
        {<Icon name="star" fill={"orange"} width={15} height={15} style={{ marginTop: 3 }} />}
        {props.getdate(props.data.messageTimestamp, "#555")}
        {props.data.key.fromMe && props.StatusMSG(props.data.status)}
      </View>
      <Modal animationType="slide" transparent={true} visible={modal} >
        <View style={{ backgroundColor: "rgba(0,0,0,0.8)", width: "100%", justifyContent: "center", alignContent: "center", alignItems: "center", height: "100%", position: "absolute", zIndex: 999, alignContent: "center", alignItems: "center", }}>
          <TouchableOpacity
            onPress={() => HiddenModal(false)}
            style={{
              backgroundColor: "rgba(0,0,0,0.8)",
              zIndex: 999999999,
              position: "absolute", right: 10, top: 10, borderRadius: 50, padding: 4
            }}>
            <Icon name="close-circle-outline" fill="#FFF" width={30} height={30} />
          </TouchableOpacity>
          <ImageZoom
            cropWidth={windowWidth-20}
            cropHeight={windowHeight-10}
            imageWidth={windowWidth-20}
            imageHeight={windowHeight-20}
            >
            <Image
              style={{ width:"100%", height: "100%", flex: 1, resizeMode:"center"  }}
              source={{ uri: modalImage }}
            /> 
            <View style={[StyleSheet.absoluteFillObject,{position: "absolute", zIndex: -1, justifyContent: "center", alignContent: "center", alignItems: "center" }]}>
              <ActivityIndicator color={"white"} size={80} />
            </View>
          </ImageZoom>
        </View>
      </Modal>
    </View>
  )
}

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
  }

});