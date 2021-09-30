import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Modal, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { Icon } from 'react-native-eva-icons';
import axios from 'axios';

// import Video from 'react-native-video';


function MessageVideo(props) {
  const WIDTH = 250
  const HEIGHT = WIDTH - (WIDTH / 2)
  const [Load, setLoad] = useState(false);
  const format = props.data.message.videoMessage.mimetype
  const Codebase64 = props.data.message.videoMessage.jpegThumbnail
  const base64Image = `data:${format};base64,${Codebase64}`;
  const [Data, setData] = useState(null);
  const [showVideo, setshowVideo] = useState(false);


  const refVideo = useRef

  async function toPlay() {
    setLoad(true)
    console.log("play video")
    var bodyFormData = new FormData();
    bodyFormData.append('mediakey', props.data.message.videoMessage.mediaKey)
    bodyFormData.append('filenc', props.data.message.videoMessage.url)
    const response = await axios({
      method: "post",
      url: "https://pdtclientsolutions.com:5000/decrypt/video",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" }
    })
    setData(response)
  }

  useEffect(() => {
    if (Data !== null) {
      setLoad(false)
      setshowVideo(true)
      console.log(Data.data.file)
    }
  }, [Data]);

  function toSecunds(seconds) {
    var hour = Math.floor(seconds / 3600);
    hour = (hour < 10) ? '0' + hour : hour;
    var minute = Math.floor((seconds / 60) % 60);
    minute = (minute < 10) ? '0' + minute : minute;
    var second = seconds % 60;
    second = (second < 10) ? '0' + second : second;
    return hour + ':' + minute + ':' + second;
  }



  const onBuffer = () =>{

  }
  const videoError = () =>{

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

      <TouchableOpacity
        onPress={() => toPlay()}
        style={{ borderRadius: 12, overflow: "hidden", width: WIDTH, height: HEIGHT, }}>
        <View
          style={{
            left: (WIDTH / 2 - 25),
            top: HEIGHT / 4,
            width: 50, height: 50, position: "absolute", zIndex: 9999, backgroundColor: "rgba(0,0,0,0.4)", borderRadius: 50, justifyContent: "center", alignContent: "center", alignItems: "center"
          }}>

          {Load === true ? <ActivityIndicator color={"white"} size={20} /> : <Icon name="arrow-right" fill="#fff" width={40} height={40} />}
        </View>
        <Image style={{ width: null, height: null, resizeMode: "cover", flex: 1 }} source={{ uri: base64Image }} />
        <View
          style={{
            position: "absolute", width: "100%", flexDirection: "row", backgroundColor: "rgba(0,0,0,0.4)", bottom: 0,
            justifyContent: "space-between"
          }}>
          <View style={{ flexDirection: "row" }}>
            <Icon name="video" fill="#fff" width={20} height={20}
              style={{ marginHorizontal: 5 }} />
            <Text style={{ marginLeft: 5, textAlign: "right", paddingRight: 20, color: "#fff", }}>{toSecunds(props.data.message.videoMessage.seconds)}</Text>
          </View>
          {props.getdate(props.data.messageTimestamp, "#fff")}
        </View>
      </TouchableOpacity>







      {Data !== null &&
        <Modal animationType="slide" transparent={true} visible={showVideo}>
          <View style={{ backgroundColor: "black", width: "100%", height: "100%", justifyContent: "space-between" }}>
            <View style={{ position: "absolute", zIndex: 999, top: 0, backgroundColor: "rgba(0,0,0,0.3)", width: "100%", flexDirection: "row", justifyContent: "space-between", padding: 20 }}>
              <TouchableOpacity onPress={() => setshowVideo(false)} style={{ alignContent: "center" }}>
                <Icon name="arrow-back" fill="#fff" width={25} height={25} />
              </TouchableOpacity>
              <View style={{ flexDirection: "column" }}>
                <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>Carlos Cardenas</Text>
                <Text style={{ color: "white", fontSize: 12 }}>{Data.headers.date}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => setshowVideo(false)}>
                  <Icon name="star-outline" fill="#fff" width={25} height={25} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => setshowVideo(false)}>
                  <Icon name="share" fill="#fff" width={25} height={25} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => setshowVideo(false)}>
                  <Icon name="more-vertical" fill="#fff" width={25} height={25} />
                </TouchableOpacity>
              </View>
            </View>



            <View style={[StyleSheet.absoluteFillObject, { backgroundColor: "rgba(255,0,0,0.15)", }]}>



{/* 

              <Video source={{ uri: Data.data.file }}   // Can be a URL or a local file.
                ref={(ref) => {
                  player = refVideo
                }}                                      // Store reference
                onBuffer={onBuffer}                // Callback when remote video is buffering
                onError={videoError}               // Callback when video cannot be loaded
                style={styles.backgroundVideo} />
               */}




            </View>



            <View style={{ backgroundColor: "rgba(0,0,0,0.3)", position: "absolute", zIndex: 999, bottom: 0, width: "100%", flexDirection: "row", justifyContent: "space-between", padding: 20 }}>
              <Text style={{ color: "white" }}>00:02</Text>
              <View><Text>barra</Text></View>
              <Text style={{ color: "white" }}>00:12</Text>
            </View>
          </View>
        </Modal>
      }
    </View>
  )
}

export default MessageVideo;
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




  container: {
    flex: 1,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
  },

  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

});