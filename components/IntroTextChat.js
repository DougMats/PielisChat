import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { colorAlfa, colorBeta, colorGamma}from '../Colors.js'
//import PhotoUpload from 'react-native-photo-upload'



// <PhotoUpload
//    onPhotoSelect={avatar => {
//      if (avatar) {
//        console.log('Image base64 string: ', avatar)
//      }
//    }}
//  >
//    <Image
//      style={{
//        paddingVertical: 30,
//        width: 150,
//        height: 150,
//        borderRadius: 75
//      }}
//      resizeMode='cover'
//      source={{
//        uri: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
//      }}
//    />
//  </PhotoUpload>


function IntroTextChat(props) {
  const [textMessage, settextMessage] = useState("");
  const [AudioBase64, setAudioBase64] = useState("");
  const [ImageUpload, setImageUpload] = useState(false);
  const [VideoBase64, setVideoBase64] = useState(false);
  const [isOpen, setisOpen] = useState(false);
  const [file, setfile] = useState({
    name: "",
    size: ""
  });
  const [fileImage, setfileImage] = useState("")
  const toggle = () => setisOpen(!isOpen);



console.log("tipo de mensaje capturado", props.typeMessage)






  const [message, setmessage] = useState({msg: "", msg2: "TextInput has by default a border at the bottom of its view. This border has its padding set by the background image provided by the system, and it cannot be changed. Solutions to avoid this are to either not set height explicitly, in which case the system will take care of displaying the border in the correct position, or to not display the border by setting underlineColorAndroid to transparent.  Note that on Android performing text selection in an input can change the app's activity windowSoftInputMode param to adjustResize. This may cause issues with components that have position: 'absolute' while the keyboard is active. To avoid this behavior either specify windowSoftInputMode in AndroidManifest.xml ( https://developer.android.com/guide/topics/manifest/activity-element.html ) or control this param programmatically with native code." });
  const [writing, setwriting] = useState(false);
  const [recording, setrecording] = useState(false);
  const [SudoRecording, setSudoRecording] = useState(false);
  const [soundRecordTimer, setsoundRecordTimer] = useState("00:01");

  function onChangeText(text, key) {
    setmessage({
      ...message,
      [key]: text
    })
  }

  useEffect(() => {
    if (message.msg !== "") {
      setwriting(true);
    }
    else {
      if (message.msg == "") {
        setwriting(false);
      }
    }
  }, [message.msg]);


  function SendText() { }
  function SendAudio() { }

  function record() {
    setrecording(true);
    console.log("record")
  }


  useEffect(() => {
    setTimeout(() => {
      if (recording === true && SudoRecording === false) {
        //setrecording(false);
      }
    }, 1000);
  }, [recording]);

  // useEffect(() => {
  //   if (recording === true) {
  //     Kronos();
  //   }
  // }, [recording]);
  // function Kronos() {
  //   if (soundRecordTimer < 10000000000000) {
  //     setTimeout(() => {
  //       setsoundRecordTimer(soundRecordTimer + 1)
  //     }, 100);
  //   }
  // }


  console.log("mensaje: ", message.msg)

  return (
    <View style={{
      position: "absolute",
      bottom: 0,
      width: "100%",
      minHeight: 60,
      padding: 5,
      flexDirection: "row",
    }}>


      {recording === false &&
        <View style={{ overflow: "hidden", paddingHorizontal: 5, width: "85%", backgroundColor: "#555", borderRadius: 25, minHeight: 50, maxHeight: 200, flexDirection: "row", }}>
         
          <View style={{ justifyContent: "center", width: 40, position:"absolute", bottom:10, left:10 }}>
            <TouchableOpacity><Icon name="smiling-face" fill={"white"} width={30} height={30} /></TouchableOpacity>
          </View>

          <View style={{marginLeft:40, width: "75%",}}>
            <TextInput
              multiline
              //numberOfLines={4}
              value={message.msg}
              onChangeText={text => onChangeText(text, 'msg')}
              placeholder="Escribe un mensaje"
              placeholderTextColor="silver"
              style={{ fontSize: 18, color: "white", }}
            />
          </View>
          <View style={{ width: writing === true ? 40 : 80, right: 5, position: "absolute", bottom:0, height: 50, flexDirection: "row", justifyContent: "space-around", alignItems: "center", alignContent: "center" }}>
            <TouchableOpacity onPress={()=>props.ShowLoadFile()}><Icon name="attach" fill={"white"} width={30} height={30} /></TouchableOpacity>
            {writing === false &&
              <TouchableOpacity><Icon name="camera" fill={"white"} width={30} height={30} /></TouchableOpacity>
            }
          </View>
        </View>
      }



      {recording === true &&
        <View style={{ overflow: "hidden", paddingHorizontal: 5, width: "85%", backgroundColor: "#555", borderRadius: 25, height: 50, flexDirection: "row" }}>
          <View style={{ justifyContent: "center", width: "50%", }}>
            <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: "bold", color: "white" }}>{soundRecordTimer}</Text>
          </View>
          <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", alignContent: "center", width: "50%", flexDirection: "row" }}>
            <Icon name="arrow-ios-back-outline" fill={"silver"} width={15} height={15} />
            <Text style={{ fontSize: 12, color: "silver" }}>desliza para cancelar</Text>
          </TouchableOpacity>
        </View>
      }

      <View style={{ width: "15%", justifyContent: "flex-end", alignContent: "center", alignItems: "center" }}>
        {writing === true ?
          <TouchableOpacity onPress={() => SendText()} style={{ backgroundColor: colorBeta, height: 50, width: 50, borderRadius: 25, justifyContent: "center", alignContent: "center", alignItems: "center" }}>
            <Icon name="paper-plane-outline" fill={"white"} width={30} height={30} />
          </TouchableOpacity>
          :
          <TouchableOpacity onLongPress={() => record()} onPress={() => SendAudio()} style={{ backgroundColor: colorBeta, height: 50, width: 50, borderRadius: 25, justifyContent: "center", alignContent: "center", alignItems: "center" }}>
            <Icon name="mic" fill={"white"} width={30} height={30} />
          </TouchableOpacity>
        }
      </View>

      {/* 
<View style={{
width:50,
backgroundColor:"red",
height:200,
position:"relative",
right:50,
bottom:150,
zIndex:1

}}>

  </View> */}



    </View>
  );
}
const styles = StyleSheet.create({
  wrap: {},
  btn: {}
})
export default React.memo(IntroTextChat);