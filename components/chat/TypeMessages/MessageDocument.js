import React, { useState } from "react";
import { StyleSheet, View, Text, Modal, TouchableOpacity, Image, Dimensions, Linking, Platform } from "react-native";
import { Icon } from 'react-native-eva-icons';
import axios from 'axios';
import Toast from 'react-native-simple-toast';





export default function MessageDocument(props) {
  const [modal, setmodal] = useState(false);
  const [modalImage, setmodalImage] = useState(null);






  // {"ephemeralOutOfSync": false,
  // "key": {
  //   "fromMe": false,
  //   "id": "3A167FBBDC2F7C0D4537",
  //   "remoteJid": "573152077862@s.whatsapp.net"
  // },
  // "message": {
  //   "documentMessage": {
  //     "directPath": "/v/t62.7119-24/22562268_1169567613537912_7460871256329731075_n.enc?ccb=11-4&oh=644e04dea5f02a420c40f3948ed2f1e0&oe=617738C3",
  //     "fileEncSha256": "i8HHgf5k12gHB1xRfRLkEburM+xPuQRo3ENb7CAke+0=",
  //     "fileLength": "1702850", === 1,7 MB
  //     "fileName": "consulta-tu-soat_6_25_2021.pdf",
  //     "fileSha256": "kGaJ94wHnRpc4xXwZy7PgRYnSZLojv/frmRLkmvnQZg=",
  //     "jpegThumbnail": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABsSFBcUERsXFhceHBsgKEIrKCUlKFE6PTBCYFVlZF9VXVtqeJmBanGQc1tdhbWGkJ6jq62rZ4C8ybqmx5moq6T/2wBDARweHigjKE4rK06kbl1upKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKT/wgARCABIADgDASIAAhEBAxEB/8QAGgAAAgMBAQAAAAAAAAAAAAAAAAECAwUEBv/EABcBAQEBAQAAAAAAAAAAAAAAAAABAgP/2gAMAwEAAhADEAAAAPSVvMrT5uS2uXRy9XLpGEIOupygyahNGSJa6uiqosYk6jqEQvP+gp3ME9C9TPvuXPdpMkIAEgIgFoB//8QAGxEBAAICAwAAAAAAAAAAAAAAAQACERITIDD/2gAIAQIBAT8AAiedbazlYuXPb//EABoRAAICAwAAAAAAAAAAAAAAAAABEBESIDD/2gAIAQMBAT8A43LVmKE9v//EACgQAAEEAQQCAgAHAAAAAAAAAAEAAgMRBBIhMUETUSJxFDIzQ1Jhkf/aAAgBAQABPwBzgxtuNAI5MIAOsb8I5EQu3jZZ+Tpxw+J3fIQzMgj9QrEyT+HaXguJ7UcgkBIBH2soF0DmgWT0hj5AAGkHat0MeZriSLsUsiKR+E1jW04HgIYk4/bKwoqxmh4ojpNoCgVM6lq/tbWg4N4Rdsiox8lOd0CLVm9kD7Wra1q2UanG6HCHCHCa7ql5WiydqULg4WOE8b8Wi5oPQRcPbUHMrci/tBp5vZDxy6mtdZ7UA0jT6WVL4malMZnzvd8qJ2pFsg3Jej5HDYvv0sPJkjx2xvBJ9lOyY42NIrX20BY0gkGodrJ6QZfpCOv4lBgv8rf8RFONNCoE34239KEbcUpoy+qXgK8B9psRHa8TrK8TvSjaW8r//gADAP/Z",
  //     "mediaKey": "DjBQSZ8X4J20ZV7kIzmeCO0J+sSXXAjKEZklxmSGxNA=",
  //     "mediaKeyTimestamp": "1632848036",
  //     "mimetype": "application/pdf",
  //     "pageCount": 1,
  //     "title": "consulta-tu-soat_6_25_2021",
  //     "url": "https://mmg.whatsapp.net/d/f/ArXHmVoAYeUjSMKiWdrVSTKXJwh9Td1m7c8NiMk6z9tP.enc"
  //   }
  // },
  // "messageTimestamp": "1632848075"
  // }





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


  async function Download() {
    let mimetype = MediaType(props.data.message.documentMessage.mimetype)
    let File = await GetFile(props.data.message.documentMessage.mediaKey, props.data.message.documentMessage.url, mimetype)
    console.log("file", File.data.file)
    goToURL(File.data.file)
  }

  const goToURL = async (url) => {
    await Linking.openURL(`${url}`)
  }
  async function GetFile(mediaKey, url, extension) {
    var bodyFormData = new FormData();
    bodyFormData.append('mediakey', mediaKey)
    bodyFormData.append('filenc', url)
    bodyFormData.append('extension', extension)
    const response = await axios({
      method: "post",
      url: "https://pdtclientsolutions.com:5000/decrypt/document",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" }
    })
    return response
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
      <TouchableOpacity onPress={() => Download()}>
        <View style={{ flexDirection: "row", backgroundColor: "#ddd", marginVertical: 5, marginRight: 15, paddingRight: 10, borderRadius: 8 }}>
          <Icon name="file" fill="#eee" width={50} height={50} />
          <Text style={{ color: "red", position: "absolute", zIndex: 999, fontSize: 10, width: 30, textAlign: "center", top: 20, left: 10, fontWeight: "bold" }}>{MediaType(props.data.message.documentMessage.mimetype)}</Text>
          <Text style={{ color: "#555", fontWeight: "bold", lineHeight: 50 }}>
            {(props.data.message.documentMessage.fileName.length > 40) ? ((props.data.message.documentMessage.fileName.substring(0, 40 - 3)) + '...') : props.data.message.documentMessage.fileName}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>{KBMBGBTB(props.data.message.documentMessage.fileLength)}</Text>
          <Text>
            {props.getdate(props.data.messageTimestamp, "#555")}
            {props.data.key.fromMe && props.StatusMSG(props.data.status)}
          </Text>
        </View>
      </TouchableOpacity>
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


/* ---------------------------------------------------------------------- */
/*
import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, Modal } from "react-native";
import { Icon } from 'react-native-eva-icons';
import _, { cloneWith } from 'lodash';
import { colorAlfa, colorBeta, colorDseta, colorGamma } from "../Colors";
import axios from 'axios';
import { base_url, ApiCrm, ApiWhatsapp } from '../Env';
import Toast from 'react-native-simple-toast';
import Hyperlink from 'react-native-hyperlink';
 
 
import SoundPlayer from 'react-native-sound-player' // no
var Sound = require('react-native-sound');
import { sha256 } from 'react-native-sha256';
 
 
 
 
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
          style={{ position: "absolute", zIndex: 2, backgroundColor: "rgba(255,255,255,0.3)", width: "100%", height: "100%" }}></TouchableOpacity>
      }
      {
        MessageType(props.data, direction)
      }
    </TouchableOpacity>
  )
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
    right: 5
  }
});
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
function MessageTypeDocumentMessage(props) {
  //console.log("documento?", props.data)
 
  async function donwloadFile() {
 
    sha256(props.data.message.documentMessage.fileEncSha256).then(hash => {
      console.log("___________________________")
      console.log(hash);
    })
 
 
    // message.documentMessage{
    //     "directPath": "/v/t62.7119-24/11756237_341784267498276_1323455991587454224_n.enc?ccb=11-4&oh=15e0d2032954e74c651cd0d0c00a80ae&oe=616D79F9",
    //     "fileEncSha256": "jtLZvoRBW1EOmXVdXHsRq64fzcNurypZ9H2HQe1wurE=",
    //     "fileLength": "921063",
    //     "fileName": "Hoja de vida WISLEY PEREZ (1) (1) (1) (1).docx",
    //     "fileSha256": "2LJBpOukpPBYQzZ5b823DZAVN35GQcqfe71KexwAH5c=",
    //     "mediaKey": "bO68vPYMNLP5qmgfITmAiFyZH6gJRMri+iD3cXKvHhA=",
    //     "mediaKeyTimestamp": "1632173100",
    //     "mimetype": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    //     "pageCount": 6,
    //     "title": "Hoja de vida WISLEY PEREZ (1) (1) (1) (1).docx",
    //     "url": "https://mmg.whatsapp.net/d/f/AhIhJk15UHQ3PCVzIcIFQUdy_iH48FIQviTX27JWtR_Q.enc"}
    //   },
 
 
 
 
 
 
 
 
  }
 
  return (
    <View style={[styles.wrap, {
      backgroundColor: props.data.key.fromMe ? ColorSend : ColorReceive,
      borderTopRightRadius: props.direction === "left" ? 0 : 20, borderBottomRightRadius: props.direction === "left" ? 0 : 20, borderTopLeftRadius: props.direction === "left" ? 20 : 0, borderBottomLeftRadius: props.direction === "left" ? 20 : 0
    }]}>
      {forwarded()}
      <TouchableOpacity onPress={() => donwloadFile()}>
        <View style={{ flexDirection: "row", backgroundColor: "#ccc", marginVertical: 5, borderRadius: 8 }}>
          <Text style={{ color: colorAlfa, position: "absolute", zIndex: 999, fontSize: 10, top: 20, left: 15, fontWeight: "bold" }}>{MediaType()}</Text>
          <Icon name="file" fill="#eee" width={50} height={50} />
          <Text style={{ color: "white", lineHeight: 50 }}>
            {(props.data.message.documentMessage.fileName.length > 40) ? ((props.data.message.documentMessage.fileName.substring(0, 40 - 3)) + '...') : props.data.message.documentMessage.fileName}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>274 kB. PNG</Text>
          <Text>
            {getdate(props.data.messageTimestamp, "#555")}
            {props.data.key.fromMe && StatusMSG(props.data.status)}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}
 
 
*/



function MediaType(file) {
return "file"

let Format
//return file.split('/')[1]




  if (file === "audio/x-aac") { Format = "x-aac" }
  if (file === "audio/x-aiff") { Format = "x-aiff" }
  if (file === "audio/basic") { Format = "basic" }
  if (file === "audio/flac") { Format = "flac" }
  if (file === "audio/midi") { Format = "midi" }
  if (file === "audio/mpeg") { Format = "mpeg" }
  if (file === "audio/x-mpegurl") { Format = "x-mpegurl" }
  if (file === "audio/mp4") { Format = "mp4" }
  if (file === "audio/wav") { Format = "wav" }
  if (file === "audio/x-ms-wax") { Format = "x-ms-wax" }
  if (file === "audio/x-ms-wma") { Format = "x-ms-wma" }

  if (file === "application/pdf") { Format = "pdf" }
  if (file === "application/vnd.ms-excel") { Format = "doc" }
  if (file === "application/msword") { Format = "doc " }
  if (file === "application/vnd.ms-word.document.macroenabled.12") { Format = "doc" }
  if (file === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") { Format = "doc" }
  if (file === "application/vnd.ms-word.template.macroenabled.12") { Format = "doc" }
  if (file === "application/vnd.openxmlformats-officedocument.wordprocessingml.template") { Format = "doc" }
  if (file === "application/x-msmetafile") { Format = "doc" }
  if (file === "application/x-gtar") { Format = "doc" }
  if (file === "application/x-gzip") { Format = "doc" }
  if (file === "application/vnd.ms-publisher") { Format = "doc" }
  if (file === "application/x-rar-compressed") { Format = "doc" }
  if (file === "application/rsd+xml") { Format = "doc" }
  if (file === "application/rtf") { Format = "doc" }
  if (file === "application/vnd.ms-xpsdocument") { Format = "doc" }
  if (file === "application/xml") { Format = "doc" }
  if (file === "application/zip") { Format = "doc" }
  if (file === "application/ed") { Format = "doc" }
  if (file === "application/octet-strea") { Format = "doc" }
  if (file === "application/msproject") { Format = "doc" }
  if (file === "application/msoutlook") { Format = "doc" }
  if (file === "application/octet-stream") { Format = "doc" }
  if (file === "application/msonenote") { Format = "doc" }
  if (file === "application/vnd.ms-powerpoint") { Format = "doc" }
  if (file === "application/vnd.ms-powerpoint.template.macroenabled.12") { Format = "doc" }
  if (file === "application/vnd.openxmlformats-officedocument.presentationml.template") { Format = "doc" }
  if (file === "application/vnd.ms-powerpoint.addin.macroenabled.12") { Format = "doc" }
  if (file === "application/vnd.ms-powerpoint.slideshow.macroenabled.12") { Format = "doc" }
  if (file === "application/vnd.openxmlformats-officedocument.presentationml.slideshow") { Format = "doc" }
  if (file === "application/vnd.ms-powerpoint.presentation.macroenabled.12") { Format = "doc" }
  if (file === "application/vnd.openxmlformats-officedocument.presentationml.presentation") { Format = "doc" }
  if (file === "application/vnd.stardivision.draw") { Format = "doc" }
  if (file === "application/vnd.stardivision.calc") { Format = "doc" }
  if (file === "application/sdp") { Format = "doc" }
  if (file === "application/vnd.stardivision.writer") { Format = "doc" }
  if (file === "application/vnd.ms-powerpoint.slide.macroenabled.12") { Format = "doc" }
  if (file === "application/vnd.openxmlformats-officedocument.presentationml.slide") { Format = "doc" }
  if (file === "application/x-tar") { Format = "doc" }
  if (file === "application/x-iso9660-image") { Format = "doc" }
  if (file === "application/json") { Format = "doc" }
  if (file === "application/visio") { Format = "doc" }
  if (file === "application/vnd.ms-excel.addin.macroenabled.12") { Format = "doc" }
  if (file === "application/vnd.ms-excel.sheet.binary.macroenabled.12") { Format = "doc" }
  if (file === "application/vnd.ms-excel.sheet.macroenabled.12") { Format = "doc" }
  if (file === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") { Format = "doc" }
  if (file === "application/vnd.ms-excel.template.macroenabled.12") { Format = "doc" }
  if (file === "application/vnd.openxmlformats-officedocument.spreadsheetml.template") { Format = "doc" }
  if (file === "application/x-ms-wmd") { Format = "doc" }
  if (file === "application/vnd.ms-wpl") { Format = "doc" }

  if (file === "image/vnd.dwg") { Format = "doc" }
  if (file === "image/vnd.dxf") { Format = "doc" }
  if (file === "image/cgm") { Format = "doc" }
  if (file === "image/x-icon") { Format = "doc" }
  if (file === "image/tiff") { Format = "doc" }

  if (file === "model/iges") { Format = "doc" }

  if (file === "text/css") { Format = "doc" }
  if (file === "text/html") { Format = "doc" }
  if (file === "text/richtext") { Format = "doc" }
  if (file === "text/plain") { Format = "doc" }
  if (file === "text/xml") { Format = "doc" }

  if (file === "video/3gpp2") { Format = "doc" }
  if (file === "video/x-ms-asf") { Format = "doc" }
  if (file === "video/x-msvideo") { Format = "doc" }
  if (file === "video/x-ms-wmv") { Format = "doc" }
  if (file === "video/x-ms-wmx") { Format = "doc" }
  if (file === "video/x-ms-wvx") { Format = "doc" }
  if (file === "video/mpeg") { Format = "doc" }
  if (file === "video/mp4") { Format = "doc" }
  if (file === "video/x-ms-wm") { Format = "doc" }
  if (file === "video/quicktime") { Format = "doc" }

  if (file === "x-unknown/x-unknown") { Format = "doc" }
  if (file === "x-ptc/x-part") { Format = "doc" }

  return Format

  // .doc      application/msword
  // .dot      application/msword

  // .docx     application/vnd.openxmlformats-officedocument.wordprocessingml.document
  // .dotx     application/vnd.openxmlformats-officedocument.wordprocessingml.template
  // .docm     application/vnd.ms-word.document.macroEnabled.12
  // .dotm     application/vnd.ms-word.template.macroEnabled.12

  // .xls      application/vnd.ms-excel
  // .xlt      application/vnd.ms-excel
  // .xla      application/vnd.ms-excel

  // .xlsx     application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
  // .xltx     application/vnd.openxmlformats-officedocument.spreadsheetml.template
  // .xlsm     application/vnd.ms-excel.sheet.macroEnabled.12
  // .xltm     application/vnd.ms-excel.template.macroEnabled.12
  // .xlam     application/vnd.ms-excel.addin.macroEnabled.12
  // .xlsb     application/vnd.ms-excel.sheet.binary.macroEnabled.12

  // .ppt      application/vnd.ms-powerpoint
  // .pot      application/vnd.ms-powerpoint
  // .pps      application/vnd.ms-powerpoint
  // .ppa      application/vnd.ms-powerpoint

  // .pptx     application/vnd.openxmlformats-officedocument.presentationml.presentation
  // .potx     application/vnd.openxmlformats-officedocument.presentationml.template
  // .ppsx     application/vnd.openxmlformats-officedocument.presentationml.slideshow
  // .ppam     application/vnd.ms-powerpoint.addin.macroEnabled.12
  // .pptm     application/vnd.ms-powerpoint.presentation.macroEnabled.12
  // .potm     application/vnd.ms-powerpoint.template.macroEnabled.12
  // .ppsm     application/vnd.ms-powerpoint.slideshow.macroEnabled.12

  // .mdb      application/vnd.ms-access
}