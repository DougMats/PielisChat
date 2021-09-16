import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, Modal } from "react-native";
import { Icon } from 'react-native-eva-icons';
import _, { cloneWith } from 'lodash';
import { colorAlfa, colorBeta, colorDseta, colorGamma } from "../Colors";
import axios from 'axios';
import { base_url, ApiCrm, ApiWhatsapp } from '../Env';
import Toast from 'react-native-simple-toast';
import Hyperlink from 'react-native-hyperlink';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// console.log("windowWidth", windowWidth)
// console.log("windowHeight", windowHeight)

const ColorSend = "#FFF"
const ColorReceive = "#EEE"
const MaxWidth = (windowWidth / 12) * 10

function getdate(info) {
  const datetime = parseInt(info)
  const date = new Date(datetime * 1000)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  const time = `${date.getHours()}:${date.getMinutes()}`
  // console.log(time, "datetime")
  //return `${day}/${month}/${year} ${time}`
  return <Text style={{
    marginLeft: 5,
    textAlign: "right",
    paddingRight: 20,
    color: "#555",
  }}>{`${time} p.m.`}</Text>
}

function StatusMSG(state) {
  if (state === "READ") {
    return <Text style={styles.messageRead}><Icon name="done-all-outline" fill={"#0087FF"} width={15} height={15} /></Text>
  }
  if (state === "NOTREAD") {
    return <Text style={styles.messageRead}><Icon name="done-all-outline" fill={"#555"} width={15} height={15} /></Text>
  }
  if (state === "SEND") {
    return <Text style={styles.messageRead}><Icon name="checkmark-outline" fill={"#555"} width={15} height={15} /></Text>
  }
  if (state === "NOTSEND") {
    return <Text style={styles.messageRead}><Icon name="clock-outline" fill={"#555"} width={15} height={15} /></Text>
  }
}

function Message(props) {
  const flex = props.data.key.fromMe ? "flex-end" : "flex-start";
  const direction = props.data.key.fromMe ? "left" : "right";

  function MessageType(data, direction) {
    if (data.message) {
      if (data.message.conversation) {
        return <MessageTypeConversation data={data} direction={direction} />
      }
      if (data.message.extendedTextMessage) {
        return <MessageTypeExtendedTextMessage data={data} direction={direction} />
      }
      if (data.message.imageMessage) {
        return <MessageTypeImageMessage data={data} direction={direction} />
      }
      if (data.message.audioMessage) {
        return <MessageTypeAudioMessage data={data} direction={direction} />
      }

    }
    else {
      console.log("ERROR = message undefined")
    }
  }

  async function OnSelect(id) {
    if (props.multipleSelect === true) {
      await props.Selection(id)
    }
  }

  function LongSelect(id) {
    if (props.multipleSelect === false) {
      props.Selection(id, "add")
    }
  }

  return (
    <TouchableOpacity
      style={{
        width: "100%",
        marginBottom: 2,
        justifyContent: flex,
        alignContent: flex,
        alignItems: flex
      }}
      onPress={() => OnSelect(props.data.key.id)}
      onLongPress={() => LongSelect(props.data.key.id)}
    >
      {
        props.data.selected === true &&
        <TouchableOpacity
          onPress={() => props.Selection(props.data.key.id)}
          style={{ position: "absolute", zIndex: 2, backgroundColor: "rgba(255,0,0,0.3)", width: "100%", height: "100%" }}></TouchableOpacity>
      }
      {MessageType(props.data, direction)}
    </TouchableOpacity>
  );
}
export default React.memo(Message);

const styles = StyleSheet.create({
  wrap: {
    marginVertical: 1,
    shadowColor: "#000",
    maxWidth: MaxWidth,
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
  messageRead: {
    position: "absolute",
    bottom: 0,
    right: 0
  }
});


const forwarded = () => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Icon name="undo" fill={"silver"} width={20} height={20} />
      <Text style={{ color: "#777", fontWeight: "600", marginLeft: 5 }}>Reenviado</Text>
    </View>
  )
}


function LINK(data) {
  const passPropsText = (text) =>
    <Hyperlink
      linkDefault
      injectViewProps={url => ({
        testID: url === 'http://link.com' ? 'id1' : 'id2',
        // style: url === 'https://link.com' ? { color: 'red' } : { color: '#0087FF' },
        style: { color: '#0087FF' },
      })}
    ><Text>{text}</Text>
    </Hyperlink>

  return (
    passPropsText(data)
  )
}


function MessageTypeConversation(props) {
  return (
    <View style={[styles.wrap, {
      backgroundColor: props.data.key.fromMe ? ColorSend : ColorReceive,
      //backgroundColor: "pink",
      borderTopRightRadius: props.direction === "left" ? 0 : 20, borderBottomRightRadius: props.direction === "left" ? 0 : 20, borderTopLeftRadius: props.direction === "left" ? 20 : 0, borderBottomLeftRadius: props.direction === "left" ? 20 : 0
    }]}>
      {forwarded()}
      <Text style={{ color: "#000" }}>{props.data.message.conversation}</Text>
      <View style={{ flexDirection: "row" }}>
        {
          <Icon name="star" fill={"orange"} width={15} height={15} style={{ marginTop: 3 }} />
        }
        {getdate(props.data.messageTimestamp)}
        {props.data.key.fromMe && StatusMSG(props.data.status)}
      </View>
    </View>
  )
}


function MessageTypeExtendedTextMessage(props) {
  function filter() {
    if (props.data.message.extendedTextMessage.canonicalUrl) {
      //console.log("ExtendedTextMessage -----> canonicalUrl", props.data.message.extendedTextMessage.canonicalUrl)
      return LINK(props.data.message.extendedTextMessage.canonicalUrl)
    }
    if (props.data.message.extendedTextMessage.text) {
      //console.log("ExtendedTextMessage -----> text", props.data.message.extendedTextMessage.text)
      return LINK(props.data.message.extendedTextMessage.text)
    }
  }
  return (
    <View style={[styles.wrap, {
      backgroundColor: props.data.key.fromMe ? ColorSend : ColorReceive,
      //backgroundColor: "orange",
      borderTopRightRadius: props.direction === "left" ? 0 : 20, borderBottomRightRadius: props.direction === "left" ? 0 : 20, borderTopLeftRadius: props.direction === "left" ? 20 : 0, borderBottomLeftRadius: props.direction === "left" ? 20 : 0
    }]}>
      {forwarded()}
      <View style={{ backgroundColor: "rgba(0,0,0,0.1)", minWidth: "100%", padding: 5, borderRadius: 8, }}>
        <Text>rtrtrt</Text>
      </View>
      {filter()}
      <View style={{ flexDirection: "row" }}>
        {<Icon name="star" fill={"orange"} width={15} height={15} style={{ marginTop: 3 }} />}
        {getdate(props.data.messageTimestamp)}
        {props.data.key.fromMe && StatusMSG(props.data.status)}
      </View>
    </View>
  )
}










function MessageTypeImageMessage(props) {
  //   {
  //     "directPath": "/v/t62.7118-24/23767225_1124137531444828_4905033580416281201_n.enc?ccb=11-4&oh=c57e4ba2544103c493536fa9b831bdc5&oe=615CEA9B",
  //     "fileEncSha256": "8mEyH3iWoDUfngoNsu95os25HYsmQQMIP5dWoc25ZqM=",
  //     "fileLength": "36796",
  //     "fileSha256": "BLGmopqabHK0ip+yRq3MvG/AgV1jv2QDOeOvKjiaK3E=",
  //     "height": 1440,
  //     ***"jpegThumbnail": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEgAJAMBIgACEQEDEQH/xAAvAAEAAgMBAAAAAAAAAAAAAAAAAQMCBAYFAQEBAQEAAAAAAAAAAAAAAAAAAwQB/9oADAMBAAIQAxAAAADCOmaMnMOnHMOnFkTrZ9d+XleqAMZgwtiQCurY06yuVZd5siNuUBMAB//EACYQAAEDBAEEAQUAAAAAAAAAAAEAAgMEERJSUQUQFiEgBhQVMTL/2gAIAQEAAT8AAdwsDwVg7UrF2pWLtSsW6hYt1CxbqFi3ULBvA7OLWi7io5oHmwPv4V0bjGAE2MmWMtfe3wd6I9hD9nEi/eQOsMSg19zkQeEBbvUzRsxDih1CABfkIUOoQ9qimZORkjQx3/lfZR8IUESHpeQ1erV5DV6tR+oKoaLyGr1avIavVq//xAAbEQACAwADAAAAAAAAAAAAAAATYgARIAIiI//aAAgBAgEBPwA6w6w674irtdzxbP8A/8QAHBEAAQQDAQAAAAAAAAAAAAAAYgARFCACEyIj/9oACAEDAQE/AIxqKajHfLa/LMvYa//Z",
  //     -----"mediaKey": "+wak54L05QYHz2yU/iQMyLrA+BCBJot/kBJu0/+zCwE=",
  //     "mediaKeyTimestamp": "1630973829",
  //     "midQualityFileSha256": "bwjfp3qnbZLzV3GW+ikYGjw3heNICdcj4xJYSmgdJGI=",
  //     **"mimetype": "image/jpeg",
  //     "scanLengths": [4784, 21234, 4963, 5815],
  //     "scansSidecar": "GPRbT9aElIqN165dfra0JeAXjh8N6AEy5vt92qBc3I0AJHpZ6RfAMw==",
  //     -----"url": "https://mmg.whatsapp.net/d/f/AlsHhOsQH0ZoaMAFE0iZk4G1HqQ4t59vGzT9_wbVs5CV.enc",
  //     "width": 720
  // }
  const [modal, setmodal] = useState(false);
  const [modalImage, setmodalImage] = useState(null);
  const format = props.data.message.imageMessage.mimetype
  const Codebase64 = props.data.message.imageMessage.jpegThumbnail
  const base64Image = `data:${format};base64,${Codebase64}`;
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
      //console.log(response.data.file)
      return response.data.file
    }
    catch (error) {
      console.log("error: ", error)
    }
  }
  function ShowModal() {
    let imagen = GetImageModal(props.data.message.imageMessage.mediaKey, props.data.message.imageMessage.url)
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
      backgroundColor: props.data.key.fromMe ? ColorSend : ColorReceive,
      //backgroundColor: "red",
      borderTopRightRadius: props.direction === "left" ? 0 : 20, borderBottomRightRadius: props.direction === "left" ? 0 : 20, borderTopLeftRadius: props.direction === "left" ? 20 : 0, borderBottomLeftRadius: props.direction === "left" ? 20 : 0
    }]}>
      {forwarded()}
      <TouchableOpacity onPress={() => ShowModal()}>
        <Image style={{ width: 100, height: 50, resizeMode: "cover",  }} source={{ uri: base64Image }} />
      </TouchableOpacity>
      <View style={{ flexDirection: "row" }}>
        {<Icon name="star" fill={"orange"} width={15} height={15} style={{ marginTop: 3 }} />}
        {getdate(props.data.messageTimestamp)}
        {props.data.key.fromMe && StatusMSG(props.data.status)}
      </View>
      <Modal animationType="slide" transparent={true} visible={modal} >
        <View style={{ backgroundColor: "rgba(0,0,0,0.7)", width: "100%", justifyContent: "center", alignContent: "center", alignItems: "center", height: "100%", position: "absolute", zIndex: 999, alignContent: "center", alignItems: "center", }}>
          <TouchableOpacity
            onPress={() => HiddenModal(false)}
            style={{
              position: "absolute", right: 10, top: 10
            }}>
            <Icon name="close-circle-outline" fill="#FFF" width={40} height={40} />
          </TouchableOpacity>
          <View style={{ width: windowWidth, height: windowWidth, backgroundColor: "rgba(255,255,255,0.05)" }}>
            <Text>{modalImage}</Text>
            <Image style={{ width: null, height: null, flex: 1, resizeMode: "cover" }} source={{ uri: modalImage }} />
          </View>
        </View>
      </Modal>
    </View>
  )
}











function MessageTypeAudioMessage(props) {
  // console.log("??", props.data)
  // {"ephemeralOutOfSync": false, "key": {"fromMe": false, "id": "3AD55FCCE55C7A95D324", "remoteJid": "573106821767@s.whatsapp.net"}, "message": {"audioMessage": {"directPath": "/v/t62.7117-24/32988231_1468617173504780_6360866000172518761_n.enc?ccb=11-4&oh=bee1b4a3d9e55091bf0315848e1a858a&oe=615B8B42", "fileEncSha256": "vkQKVLrlgfB+dDAg1A+HokXa7gWc1dPpgFvryGQC3ns=", "fileLength": "11986", "fileSha256": "+VfxzSHejl2wI1uTCDsaZx9MFUhTLYmA3+tfDoP4e+U=", "mediaKey": "slW9bN+NKar1wZTGXGkqgftx+tCCBWO8zZ7bgv5eMyI=", "mediaKeyTimestamp": "1630953534", "mimetype": "audio/ogg; codecs=opus", "ptt": true, "seconds": 5, "url": "https://mmg.whatsapp.net/d/f/AlAR6B6O9xV8WzqJhum_MA7ntijdFyypfzaTEDpu6dPM.enc"}}, "messageTimestamp": "1630953541", "selected": false, "status": "PLAYED"}
  // {
  //   "directPath": "/v/t62.7117-24/32988231_1468617173504780_6360866000172518761_n.enc?ccb=11-4&oh=bee1b4a3d9e55091bf0315848e1a858a&oe=615B8B42",
  //   "fileEncSha256": "vkQKVLrlgfB+dDAg1A+HokXa7gWc1dPpgFvryGQC3ns=",
  //   "fileLength": "11986",
  //   "fileSha256": "+VfxzSHejl2wI1uTCDsaZx9MFUhTLYmA3+tfDoP4e+U=",
  //   "mediaKey": "slW9bN+NKar1wZTGXGkqgftx+tCCBWO8zZ7bgv5eMyI=",
  //   "mediaKeyTimestamp": "1630953534",
  //   "mimetype": "audio/ogg; codecs=opus",
  //   "ptt": true,
  //   "seconds": 5,
  //   "url": "https://mmg.whatsapp.net/d/f/AlAR6B6O9xV8WzqJhum_MA7ntijdFyypfzaTEDpu6dPM.enc"
  // }
  // "data": {
  //   "ephemeralOutOfSync": false,
  //     "key": {
  //     "fromMe": false,
  //     "id": "3AD55FCCE55C7A95D324",
  //     "remoteJid": "573106821767@s.whatsapp.net"
  //   },
  //   "message": {
  //     "audioMessage": [Object]
  //   },
  //   "messageTimestamp": "1630953541",
  //    "selected": false,
  //    "status": "PLAYED"
  // },
  // "direction": "right"
  const timer = Date(1630953541)
  return (
    <View style={[styles.wrap, {
      //backgroundColor: props.data.key.fromMe ? ColorSend : ColorReceive,
      backgroundColor: "green",
      borderTopRightRadius: props.direction === "left" ? 0 : 20, borderBottomRightRadius: props.direction === "left" ? 0 : 20, borderTopLeftRadius: props.direction === "left" ? 20 : 0, borderBottomLeftRadius: props.direction === "left" ? 20 : 0
    }]}>
      {/* {forwarded()} */}
      <View style={{ flexDirection: "row", marginVertical: 5 }}>
        <TouchableOpacity style={{ justifyContent: "flex-end", paddingBottom: 10, }}>
          <Icon name="arrow-right" fill={"silver"} width={45} height={45} />
        </TouchableOpacity>
        <View style={{ width: (MaxWidth / 6) * 3.8, flexDirection: "column", paddingHorizontal: 5 }}>
          <View style={{ height: 35, justifyContent: "flex-end", paddingBottom: 10, width: "100%" }}>
            <View style={{ height: 2, backgroundColor: "white", width: "100%", backgroundColor: props.data.status === "PLAYED" ? "#0087FF" : "#2ECC71" }}>
            </View>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{color:"#555"}}>0:0{props.data.message.audioMessage.seconds}</Text>
            {getdate(props.data.messageTimestamp)}
          </View>
        </View>
        <View style={{ width: MaxWidth / 6, height: MaxWidth / 6, backgroundColor: "silver", borderRadius: (MaxWidth / 6) / 2 }}>
          <Icon name="mic" fill={props.data.status === "PLAYED" ? "#0087FF" : "#2ECC71"} width={25} height={25} style={{ position: "absolute", zIndex: 2, bottom: -55, left: -5 }} />
        </View>
      </View>
    </View>
  )
}