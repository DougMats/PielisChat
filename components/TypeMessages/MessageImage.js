import React, { useState } from "react";
import { StyleSheet, View, Text, Modal, TouchableOpacity, Image, Dimensions } from "react-native";
import { Icon } from 'react-native-eva-icons';
import ImageZoom from 'react-native-image-pan-zoom';
import axios from 'axios';
export default function MessageImage(props) {
  const [modal, setmodal] = useState(false);
  const [modalImage, setmodalImage] = useState(null);
  const format = props.data.message.imageMessage.mimetype
  const Codebase64 = props.data.message.imageMessage.jpegThumbnail
  const base64Image = `data:${format};base64,${Codebase64}`;
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;


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
    let imagen = await GetImageModal(props.data.message.imageMessage.mediaKey, props.data.message.imageMessage.url)
    console.log("img->", imagen)
    if (imagen._W === null) {
      Toast.show('Error de conexión');
    }
    else {
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
      //backgroundColor: "blue",
      borderTopRightRadius: props.direction === "left" ? 0 : 20,
      borderBottomRightRadius: props.direction === "left" ? 0 : 20,
      borderTopLeftRadius: props.direction === "left" ? 20 : 0,
      borderBottomLeftRadius: props.direction === "left" ? 20 : 0
    }]}>
      {props.forwarded()}



      <TouchableOpacity onPress={() => ShowModal()}>
        <Image style={{ width: 100, height: 50, resizeMode: "cover", }} source={{ uri: base64Image }} />
      </TouchableOpacity>
      <View style={{ flexDirection: "row" }}>
        {<Icon name="star" fill={"orange"} width={15} height={15} style={{ marginTop: 3 }} />}
        {props.getdate(props.data.messageTimestamp, "#555")}
        {props.data.key.fromMe && props.StatusMSG(props.data.status)}
      </View>






      <Modal animationType="slide" transparent={true} visible={modal} >
        <View style={{ backgroundColor: "rgba(0,0,0,0.7)", width: "100%", justifyContent: "center", alignContent: "center", alignItems: "center", height: "100%", position: "absolute", zIndex: 999, alignContent: "center", alignItems: "center", }}>
          <TouchableOpacity
            onPress={() => HiddenModal(false)}
            style={{
              backgroundColor: "rgba(0,0,0,0.3)",
              zIndex: 999999999,
              position: "absolute", right: 10, top: 10, borderRadius: 50, padding: 4
            }}>
            <Icon name="close-circle-outline" fill="#FFF" width={40} height={40} />
          </TouchableOpacity>

          <ImageZoom cropWidth={windowWidth}
            cropHeight={windowHeight}
            imageWidth={windowWidth}
            imageHeight={windowHeight}>
            <Image style={{ width: windowWidth, height: windowHeight }}
              source={{ uri: modalImage }} />
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