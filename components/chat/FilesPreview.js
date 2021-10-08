import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, Image, View, Text, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native'
import { Icon } from 'react-native-eva-icons';
import { colorBeta } from '../../Colors.js'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;






function FilesPreview(props) {


  const [Load, setLoad] = useState(true);
  const [Position, setPosition] = useState(0);
  const [Preview, setPreview] = useState(false);
  const [ShowSelected, setShowSelected] = useState(true);

  console.log("Preview", Preview)

  // console.log("___ file show ", props.File)
  // console.log("___ type ", props.type)
  // console.log("___ FilesTree: ", props.FilesTree)
  // console.log("___ selected: ", props.selected)




  // useEffect(() => {
  //   if (Preview !== "") {
  //     setShowSelected(true)
  //   }
  // }, [Preview]);

  // function deleteItem() {
  //   props.delete(Preview)
  // }



  let size_w, size_h


  if (props.type === "Gallery") {
    size_w = 90
    size_h = 90
  }


  if (props.type === "Document") {
    size_w = 150
    size_h = 120
  }


  useEffect(() => {
    setLoad(true)
    //if (props.FilesTree.length !== 0 && Preview === false) {
    setPreview(props.FilesTree[0])
    //}

  }, [props.FilesTree.length]);


  useEffect(() => {
    if (Preview !== false) {
      setLoad(false)
    }
  }, [Preview]);




  function KBMBGBTB(bit) {
    let number, format, KB, MB, GB, TB, PB
    KB = bit / 1000
    MB = bit / 1000000
    GB = bit / 1000000000
    if (GB > 1) {
      number = GB
      format = "GB"
    }
    else {
      if (MB > 1) {
        number = MB
        format = "MB"
      }
      else {
        if (KB > 1) {
          number = KB
          format = "KB"
        }
        else {
          number = bit
          format = "Bits"
        }
      }
    }
    return number.toFixed(2) + " " + format
  }




  console.log("Preview: ", Preview)

  if (props.FilesTree.length !== 0) {
    return (
      <View style={{}
      [styles.wrap, { display: props.FilesTree.length !== 0 ? "flex" : "none", paddingTop: ShowSelected === true ? 50 : 0 }]
      }>
        <View style={{
          backgroundColor: "white",
          flexDirection: "row",
          position: "absolute",
          zIndex: 999,
          top: ShowSelected === true ? 0 : -40,
          right: 0,
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
        }}>
          <TouchableOpacity onPress={() => setShowSelected(!ShowSelected)} style={styles.btnUp}>
            <Icon name={ShowSelected === true ? "arrow-ios-downward" : "arrow-ios-upward-outline"} fill={"#555"} width={25} height={25} />
          </TouchableOpacity>
          {ShowSelected === true &&
            <TouchableOpacity onPress={() => props.delete(Preview)} style={styles.btnUp}>
              <Icon name="trash" fill={"#555"} width={25} height={25} />
            </TouchableOpacity>
          }
        </View>
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center"
          }}>






          {props.type === "Gallery" && ShowSelected === true && Preview !== false && Load === false &&
            <View
              style={{
                margin: 10,
                width: windowWidth - 40,
                height: windowWidth,
              }}>


              {/* <Image source={{ uri: Preview.uri }} style={{ width: null, height: null, flex: 1, resizeMode: "cover" }} /> */}


            </View>
          }
        </View>




{/* 
        {props.type === "Document" && ShowSelected === true && Preview !== false &&
          <View style={{
            backgroundColor: "white",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            width: "60%",
            padding: 20
          }}>
            <Icon name='file' width={40} height={40} fill={'silver'} />
            <Text>Nombre: {Preview.name}</Text>
            <Text>Peso: {KBMBGBTB(Preview.size)}</Text>
          </View>
        } */}


        




{/* 
{"fileCopyUri": "content://com.android.externalstorage.documents/document/primary%3ADownload%2F1632946676.94_document.doc", "name": "1632946676.94_document.doc", "size": 921063, "type": "application/msword", "uri": "content://com.android.externalstorage.documents/document/primary%3ADownload%2F1632946676.94_document.doc"}, 
{"fileCopyUri": "content://com.android.externalstorage.documents/document/primary%3ADownload%2F1632945280.28_document.vnd.openxmlformats-officedocument.wordprocessingml.document.zip", "name": "1632945280.28_document.vnd.openxmlformats-officedocument.wordprocessingml.document.zip", "size": 921063, "type": "application/zip", "uri": "content://com.android.externalstorage.documents/document/primary%3ADownload%2F1632945280.28_document.vnd.openxmlformats-officedocument.wordprocessingml.document.zip"}, 
{"fileCopyUri": "content://com.android.externalstorage.documents/document/primary%3ADownload%2F1632860356.05_document.pdf", "name": "1632860356.05_document.pdf", "size": 1702850, "type": "application/pdf", "uri": "content://com.android.externalstorage.documents/document/primary%3ADownload%2F1632860356.05_document.pdf"}, 
{"fileCopyUri": "content://com.android.externalstorage.documents/document/primary%3A.fn%2Fvsfb%2Fcolor_filters_glinfo64.bin", "name": "color_filters_glinfo64.bin", "size": 54508, "type": "application/octet-stream", "uri": "content://com.android.externalstorage.documents/document/primary%3A.fn%2Fvsfb%2Fcolor_filters_glinfo64.bin"}, 
{"fileCopyUri": "content://com.android.externalstorage.documents/document/primary%3AAndroid%2Fdata%2Fcom.google.android.apps.maps%2Ftestdata%2Fvoice%2Fes_USde2eb863%2Fvoice_instructions_unitless.zip", "name": "voice_instructions_unitless.zip", "size": 751060, "type": "application/zip", "uri": "content://com.android.externalstorage.documents/document/primary%3AAndroid%2Fdata%2Fcom.google.android.apps.maps%2Ftestdata%2Fvoice%2Fes_USde2eb863%2Fvoice_instructions_unitless.zip"}
*/}



        <ScrollView horizontal={true}>
          {props.FilesTree.map((i, key) => {
            return (
              <TouchableOpacity key={key}
                onPress={() => [
                  setPosition(key),
                  setPreview(i),
                  setShowSelected(true)
                ]}

                style={
                  {
                    width: size_w,
                    height: size_h,
                    minWidth: size_w,
                    minHeight: size_h,
                    maxWidth: size_w,
                    maxHeight: size_h,
                    borderColor: Position === key ? colorBeta : "black",
                    borderWidth: Position === key ? 2 : 0,
                  }}>


                <Text style={styles.text}>
                  {key + 1}/{props.FilesTree.length}
                </Text>



                {props.type === "Gallery" &&
                  <Image
                    source={{ uri: i.uri }}
                    style={{
                      width: null,
                      height: null,
                      flex: 1,
                      resizeMode: "cover"
                    }}
                  />
                }


                {props.type === "Document" &&
                  <View
                    style={{
                      backgroundColor: "white",
                      flexDirection: "column",
                      paddingTop: 25,
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center",
                      padding: 5
                    }}>

                    <Icon name='file' width={40} height={40} fill={'silver'} />

                    <Text>{i.name}</Text>
                  </View>
                }


              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    )
  }
  else {
    return <></>
  }
}







const styles = StyleSheet.create({
  wrap: {
    marginBottom: -5,
    backgroundColor: "#555",//"rgba(0,0,0,0.8)",
    width: "100%",
    flexDirection: "column",
    paddingHorizontal: 5,
  },
  btnUp: {
    margin: 5,
    borderRadius: 35,
    height: 35,
    width: 35,
    backgroundColor: "rgba(255,255,255,1)",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
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
    backgroundColor: "rgba(0,0,0,0.05)",
    color: "black"
  },
})
export default FilesPreview;
