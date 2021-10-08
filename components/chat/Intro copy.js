import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, Keyboard, Dimensions } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { colorAlfa, colorBeta, colorGamma } from '../../Colors.js'
import { Picker } from 'emoji-mart-native'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { WhatsAppService } from '../../src/services'
import DocumentPicker from 'react-native-document-picker'
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


import base64 from 'react-native-base64'


function IntroTextChat(props) {
  const [textMessage, settextMessage] = useState(""); // mensaje de texto
  const [File, setFile] = useState(false); // mensaje de documento
  const [MultiplesFiles, setMultiplesFiles] = useState([]); // multiples documentos
  const [MultiplesFiles2, setMultiplesFiles2] = useState([]); // multiples documentos




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

  //const [message, setmessage] = useState({ msg: "" });
  const [writing, setwriting] = useState(false);
  const [recording, setrecording] = useState(false);
  const [SudoRecording, setSudoRecording] = useState(false);
  const [soundRecordTimer, setsoundRecordTimer] = useState("00:01");

  useEffect(() => {
    if (textMessage !== "") { setwriting(true); }
    else {
      if (textMessage == "") { setwriting(false); }
    }
  }, [textMessage]);

  useEffect(() => {
    setFile(props.FileSelected)
  }, [props.FileSelected]);

  useEffect(() => {
    setMultiplesFiles(props.FileSelectedMultiplex)
  }, [props.FileSelectedMultiplex]);

  function BaseSixFour(item) {
    console.log("codificando base 64......")
    // let res = base64.encode(item)
    // return res
  }






  useEffect(() => {
    if (File !== false) {
      setFile(""+BaseSixFour(File)+"")
    }
  }, [File]);

  useEffect(() => {
    if (MultiplesFiles.length !== 0) {
      for (var i in MultiplesFiles) {
        let data = BaseSixFour(""+MultiplesFiles[i]+"")
        setMultiplesFiles2([...MultiplesFiles2, data])
        }
      }
  }, [MultiplesFiles]);



  // console.log("file into intro: ", File)
  console.log("MultiplesFiles into intro: ", MultiplesFiles2)


  useEffect(() => {
    console.log("***----", props.typeMessage, "----***")
    if (props.typeMessage === "Document") {
      upLoadFile()
      setMultiplesFiles([])
    }
    if (props.typeMessage === "MultipleDocument") {
      upLoadMultiplesFiles()
      setFile({})
    }
  }, [props.typeMessage]);

  // if(props.typeMessage){
  //   if (props.typeMessage === "Document")         { upLoadFile()}
  //   if (props.typeMessage === "MultipleDocument") { upLoadMultiplesFiles()}
  // }


  function onChangeText(e) {
    settextMessage(e)
  }

  function onSwipeLeft(gestureState) {
    console.log("left")
    setrecording(false)
  }
  // DocumentPicker.types.allFiles
  // DocumentPicker.types.images
  // DocumentPicker.types.plainText
  // DocumentPicker.types.audio
  // DocumentPicker.types.pdf
  // DocumentPicker.types.zip
  // DocumentPicker.types.csv
  // DocumentPicker.types.doc
  // DocumentPicker.types.docx
  // DocumentPicker.types.ppt
  // DocumentPicker.types.pptx
  // DocumentPicker.types.xls
  // DocumentPicker.types.xlsx

  async function upLoadFile() {
    console.log("here upLoad File")
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      })
      props.insertSingleFile(res[0])
      //test(res[0])
      //console.log(res[0].uri, res[0].type, res[0].name, res[0].size,)
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err
      }
    }
  }

  async function upLoadMultiplesFiles() {
    console.log("here upLoad multiplesFile")
    try {
      const results = await DocumentPicker.pickMultiple({ type: [DocumentPicker.types.images] })
      props.insertMultipleFiles(results)
      //setMultiplesFiles(results)
      // for (const res of results) {
      //   console.log( res.uri, res.type, res.name, res.size,)
      // }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err
      }
    }
  }

  const [keyboardStatus, setKeyboardStatus] = useState(false);
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







console.log("FILEeeeeeeeeeeeeee", File)



  async function SendMessage() {

    
    console.log("enviando...")
    if (textMessage !== "") {
      console.log("case 0")
      await props.addMessage(textMessage, "textMessage")
      settextMessage("")
    }

    if (File !== false) {
      console.log("case 1")
      await props.addMessage(File, "imageMessage")
      setFile(false)
    }


    // if (File !== {}) {
    //   console.log("case 2")
    //   for (var i in MultiplesFiles2) {
    //     await props.addMessage(MultiplesFiles2[i], "imageMessage")
    //   }
    //   setMultiplesFiles([]);
    //   setMultiplesFiles2([]);
    // }


    // const [File, setFile] = useState({}); // mensaje de documento
    // const [MultiplesFiles, setMultiplesFiles] = useState([]); // multiples documentos



    // if(typeMessage=== "Document"&&){}
    // if(typeMessage=== "MultipleDocument"&&){}
    // if(typeMessage=== "Camera"&&){}
    // if(typeMessage=== "Gallery"&&){}
    // if(typeMessage=== "Audio"&&){}
    // if(typeMessage=== "LivingRoom"&&){}
    // if(typeMessage=== "Location"&&){}
    // if(typeMessage=== "Contact"&&){}





    // e.preventDefault();
    // //if text value is not emptry then call onaddMessage function
    // if (textMessage !== "") {
    //   props.onaddMessage(textMessage, "textMessage");
    //   settextMessage("");
    // }

    // if (VideoBase64 != false) {
    //   props.onaddMessage(VideoBase64.replace("data:video/mp4;base64,", ""), "VideoMessage");
    //   setVideoBase64(false);
    // }

    // //if file input value is not empty then call onaddMessage function
    // if (file.name !== "") {
    //   file.fileBase64 = file.fileBase64.replace(`data:${file.type_file};base64,`, "")
    //   props.onaddMessage(file, "fileMessage");
    //   setfile({
    //     name: "",
    //     size: ""
    //   })
    // }

    // //if image input value is not empty then call onaddMessage function
    // if (fileImage !== "") {
    //   props.onaddMessage(fileImage, "imageMessage");
    //   setfileImage("")
    // }

    // if (audio) {
    //   props.onaddMessage(audio.replace("data:audio/ogg;base64,", ""), "AudioMessage");
    //   setAudioBase64("")
    // }
  }





























  /* __________________________________________________________________ 
  //function for text input value change
  const handleChange = e => {
    settextMessage(e.target.value)
  }

  //function for add emojis
  const addEmoji = e => {
    let emoji = e.native;
    settextMessage(textMessage + emoji)
  };


  //function for file input change
  const handleFileChange = async (e) => {
    if (e.target.files.length !== 0) {
      const type_file = e.target.files[0].type
      const extenxion = type_file.split("/")[1]
      console.log(type_file, extenxion)
      if (e.target.files[0].type == 'video/mp4') {
        setVideoBase64(await toBase64(e.target.files[0]))
      } else {
        setfile({
          name: e.target.files[0].name,
          size: e.target.files[0].size,
          extenxion,
          type_file,
          fileBase64: await toBase64(e.target.files[0])
        })
      }
    }
  }
  //function for image input change
  const handleImageChange = async (e) => {
    if (e.target.files.length !== 0) {
      //setfileImage(URL.createObjectURL(e.target.files[0]))
      setfileImage(await toBase64(e.target.files[0]))
    }
  }

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.replace("data:image/jpeg;base64,", "").replace("data:image/png;base64,", "").replace("data:image/jpg;base64,", ""));
    reader.onerror = error => reject(error);
  });

  //function for send data to onaddMessage function(in userChat/index.js component)
  const onaddMessage = (e, textMessage, audio = false) => {
    e.preventDefault();
    //if text value is not emptry then call onaddMessage function
    if (textMessage !== "") {
      props.onaddMessage(textMessage, "textMessage");
      settextMessage("");
    }
    if (VideoBase64 != false) {
      props.onaddMessage(VideoBase64.replace("data:video/mp4;base64,", ""), "VideoMessage");
      setVideoBase64(false);
    }
    //if file input value is not empty then call onaddMessage function
    if (file.name !== "") {
      file.fileBase64 = file.fileBase64.replace(`data:${file.type_file};base64,`, "")
      props.onaddMessage(file, "fileMessage");
      setfile({
        name: "",
        size: ""
      })
    }
    //if image input value is not empty then call onaddMessage function
    if (fileImage !== "") {
      props.onaddMessage(fileImage, "imageMessage");
      setfileImage("")
    }
    if (audio) {
      props.onaddMessage(audio.replace("data:audio/ogg;base64,", ""), "AudioMessage");
      setAudioBase64("")
    }
  }



  function onKeyUpValue(event) {
    if (event.key == "Enter" && !event.shiftKey) {
      onaddMessage(event, textMessage)
    }
  }


  async function handleDrop(data) {
    if (data.length !== 0) {
      const type_file = data[0].type
      const extenxion = type_file.split("/")[1]
      console.log(type_file, extenxion)
      if (data[0].type == 'video/mp4') {
        setVideoBase64(await toBase64(data[0]))
      } else {
        setfileImage(await toBase64(data[0]))
      }
    }
    console.log(data)
  }


  function handleDragIn(data) {
    console.log(data)
  }


  const handlePaste = (data) => {
    var item = data.clipboardData.items[0];
    if (item.type.indexOf("image") === 0) {
      var blob = item.getAsFile();
      var reader = new FileReader();
      reader.onload = function (event) {
        setfileImage(event.target.result.replace("data:image/jpeg;base64,", "").replace("data:image/png;base64,", "").replace("data:image/jpg;base64,", ""))
      };
      reader.readAsDataURL(blob);
    }
  };

*/

  /*
  
    /*________________*
    const [stateBackgroundColor, setstateBackgroundColor] = useState("#fff");
    const [stateMyText, setstateMyText] = useState("I\'m ready to get swiped!");
    const [stateGestureName, setstateGestureName] = useState("none");
  
    function onSwipeUp(gestureState) { setstateMyText('You swiped up!'); }
    function onSwipeDown(gestureState) { setstateMyText('You swiped down!'); }
    function onSwipeLeft(gestureState) { setstateMyText('You swiped left!'); }
    function onSwipeRight(gestureState) { setstateMyText('You swiped right!'); }
    const config = { velocityThreshold: 0.3, directionalOffsetThreshold: 80 };
    onSwipe(gestureName, gestureState) {
      const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
      this.setState({gestureName: gestureName});
      switch (gestureName) {
        case SWIPE_UP:
          this.setState({backgroundColor: 'red'});
          break;
        case SWIPE_DOWN:
          this.setState({backgroundColor: 'green'});
          break;
        case SWIPE_LEFT:
          this.setState({backgroundColor: 'blue'});
          break;
        case SWIPE_RIGHT:
          this.setState({backgroundColor: 'yellow'});
          break;
      }
    }
    /*__________________________*/


  async function MultiplesFilesDeleteItem(item) {
    console.log("item para borrar", item)
    const resultado = MultiplesFiles.filter(data => data.uri !== item)
    setMultiplesFiles(resultado)
    Toast.show("Archivo Removido.")
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
              {<RecordingVoice />}
              {/* <Text style={styles.audioTimerCounter}>{soundRecordTimer}</Text> */}
            </View>
            <GestureRecognizer onSwipeLeft={() => onSwipeLeft()} style={styles.audioDrag}>
              <Icon name="arrow-ios-back-outline" fill={"silver"} width={15} height={15} />
              <Text style={styles.audioDragText}>desliza para cancelar</Text>
            </GestureRecognizer>
            {/* <TouchableOpacity style={styles.audioDrag}>
            <Icon name="arrow-ios-back-outline" fill={"silver"} width={15} height={15} />
            <Text style={styles.audioDragText}>desliza para cancelar</Text>
          </TouchableOpacity> */}
          </View>
        }
        <View style={styles.wrapBtn}>
          <TouchableOpacity onPress={() => SendMessage()} style={styles.btn}>
            <Icon name="paper-plane-outline" fill={"white"} width={30} height={30} />
          </TouchableOpacity>
          {/* {writing === true ?
            <TouchableOpacity onPress={() => SendMessage()} style={styles.btn}>
              <Icon name="paper-plane-outline" fill={"white"} width={30} height={30} />
            </TouchableOpacity>
            :
            <TouchableOpacity onLongPress={() => record()} onPress={() => SendAudio()} style={styles.btn}>
              <Icon name="mic" fill={"white"} width={30} height={30} />
            </TouchableOpacity>
          }  */}
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

