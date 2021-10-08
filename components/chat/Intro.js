import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, Keyboard, Dimensions } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { colorAlfa, colorBeta, colorGamma } from '../../Colors.js'
// import { Picker } from 'emoji-mart-native'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
// import { WhatsAppService } from '../../src/services'
import DocumentPicker from 'react-native-document-picker'
// import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';




const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// import RNFetchBlob from "rn-fetch-blob";
// import base64 from 'react-native-base64'


function IntroTextChat(props) {
  const [keyboardStatus, setKeyboardStatus] = useState(false); // keyboard on/off?
  const [writing, setwriting] = useState(false); //escribiendo?
  const [recording, setrecording] = useState(false); // grabando audio?



  const [textMessage, settextMessage] = useState(""); // mensaje de texto

  const [Files, setFiles] = useState([]);



  useEffect(() => {
    if (props.FilesTree.length !== 0 && props.typeMessage === "Gallery") {
      for (var i in props.FilesTree) {

        const code = convert64(props.FilesTree[i])
        console.log(i, "______________64: ", code)
      }
    }
  }, [props.FilesTree]);



  async function convert64(e) {

  //  (( const code = base64.encode(e)))

  //   // base64.encode('Some string to encode to base64');
  //   // base64.decode('SW4gbXkgZXllcywgaW5kaXNwb3NlZA0KSW4gZGlzZ3Vpc2VzIG5vIG9uZSBrbm93cw0KUklQIEND==');
  //   // base64.encodeFromByteArray(byteArray: Uint8Array);
  //   return code
  }





  //detectar si el teclado esta visible
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);



  //detectar si esta escribiendo un mensaje 
  useEffect(() => {
    if (textMessage !== "") { setwriting(true); }
    else {
      if (textMessage == "") { setwriting(false); }
    }
  }, [textMessage]);


  function onChangeText(e) {
    settextMessage(e)
  }

  function onSwipeLeft(gestureState) {
    //   console.log("left")
    setrecording(false)
  }

  useEffect(() => {
    console.log("***----", props.typeMessage, "----***")
    if (props.typeMessage === "Document") { upLoadFileDocument() }
    if (props.typeMessage === "Gallery") { upLoadFileGallery() }
    props.clear()
  }, [props.typeMessage]);
  async function upLoadFileDocument(type) {
    try {
      const res = await DocumentPicker.pickMultiple({ type: [DocumentPicker.types.allFiles] })
      props.getFiles(res)
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err
      }
    }
  }


  async function upLoadFileGallery(type) {
    try {
      const res = await DocumentPicker.pickMultiple({ type: [DocumentPicker.types.images] })
      props.getFiles(res)
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err
      }
    }
  }


  async function SendMessage() {
    console.log("enviando...")
    console.log("text:", textMessage)
    //console.log("file: ", File)
    console.log("files ", MultiplesFiles)


    if (textMessage !== "") {
      console.log("case 0")
      await props.addMessage(textMessage, "textMessage")
      settextMessage("")
    }
  }


  return (
    <View style={[styles.wrap, { bottom: keyboardStatus === true ? 10 : 0 }]}>
      <View style={styles.wrapper}>
        {recording === false &&
          <View style={[styles.container, { minHeight: 50, maxHeight: 200, flexDirection: "row", }]}>
            <View style={styles.emoji}>
              <TouchableOpacity><Icon name="smiling-face" fill={"white"} width={30} height={30} /></TouchableOpacity>
            </View>
            <View style={styles.wrapperText}>
              <TextInput
                multiline
                value={textMessage}
                onChangeText={text => onChangeText(text)}
                onSubmitEditing={Keyboard.dismiss}
                placeholder="Escribe un mensaje"
                placeholderTextColor="silver"
                style={styles.TextInput}
              />
            </View>
            <View style={[styles.moreOptions, { width: writing === true ? 40 : 80, }]}>
              <TouchableOpacity onPress={() => props.ShowLoadFile()}>
                <Icon name="attach" fill={"white"} width={30} height={30} />
              </TouchableOpacity>
              {writing === false &&
                <TouchableOpacity >
                  <Icon name="camera" fill={"white"} width={30} height={30} />
                </TouchableOpacity>
              }
            </View>
          </View>
        }
        {recording === true &&
          <View style={[styles.container, { height: 50, flexDirection: "row" }]}>
            <View style={styles.wrapAudioTimerCounter}>
              {/* {<RecordingVoice />} */}
            </View>
            <GestureRecognizer onSwipeLeft={() => onSwipeLeft()} style={styles.audioDrag}>
              <Icon name="arrow-ios-back-outline" fill={"silver"} width={15} height={15} />
              <Text style={styles.audioDragText}>desliza para cancelar</Text>
            </GestureRecognizer>
          </View>
        }
        <View style={styles.wrapBtn}>
          {writing === true ?
            <TouchableOpacity onPress={() => SendMessage()} style={styles.btn}>
              <Icon name="paper-plane-outline" fill={"white"} width={30} height={30} />
            </TouchableOpacity>
            :
            <TouchableOpacity
              //onLongPress={() => record()}
              //onPress={() => SendAudio()}
              style={styles.btn}>
              <Icon name="mic" fill={"white"} width={30} height={30} />
            </TouchableOpacity>
          }
        </View>
      </View>
    </View>
  );
}




const styles = StyleSheet.create({
  wrap: {
    //  position: "absolute",
    width: "100%",
    minHeight: 60,
    padding: 5,
    flexDirection: "column",
  },
  wrapper: {
    // position: "absolute",
    width: "100%",
    // minHeight: 60,
    padding: 5,
    flexDirection: "row",
  },
  container: {
    flexDirection: "column",
    overflow: "hidden",
    paddingHorizontal: 5,
    width: "85%",
    backgroundColor: "#555",
    borderRadius: 25,
  },
  emoji: {
    justifyContent: "center",
    width: 40,
    position: "absolute",
    bottom: 10, left: 10
  },
  wrapperText: {
    marginLeft: 40,
    width: "75%",
  },
  TextInput: {
    fontSize: 18,
    color: "white",
  },
  moreOptions: {
    right: 5,
    position: "absolute",
    bottom: 0,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "center"
  },
  wrapAudioTimerCounter: {
    justifyContent: "center",
    width: "50%",
  },
  audioTimerCounter: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "white"
  },
  audioDrag: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    width: "50%",
    flexDirection: "row"
  },
  audioDragText: {
    fontSize: 12,
    color: "silver"
  },
  wrapBtn: {
    width: "15%",
    justifyContent: "flex-end",
    alignContent: "center",
    alignItems: "center"
  },
  btn: {
    backgroundColor: colorBeta,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  }
})
export default React.memo(IntroTextChat);