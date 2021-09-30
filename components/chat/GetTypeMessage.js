import MessageImage from './TypeMessages/MessageImage.js'
import MessageConversation from './TypeMessages/MessageConversation.js'
import MessageText from './TypeMessages/MessageText.js'
import MessageAudio from './TypeMessages/MessageAudio.js'
// import MessageDocument from './TypeMessages/MessageDocument.js'
// import MessageVideo from './TypeMessages/MessageVideo.js'
import React from 'react'
import {Text} from 'react-native'


function FilterTypeMessage(data) {

console.log("answer......", data)
const direction="left"
const ColorSend="red"
const ColorReceive="blue"
const  MaxWidth=300
 



function StatusMSG(){
  //StatusMSG
}
function getdate(){
  //getdate
}
function forwarded(){
  //forwarded
}
function LINK(){
  //LINK
}

return <Text>carlos me lo chupa</Text>

if (data.chat) {
    if (data.chat.message.conversation) {
      return <MessageConversation data={data.chat} direction={direction} StatusMSG={StatusMSG} getdate={getdate} forwarded={forwarded} LINK={LINK} ColorSend={ColorSend} ColorReceive={ColorReceive} MaxWidth={MaxWidth} />
    }
    else {
      if (data.chat.message.extendedTextMessage) {
        <MessageText data={data.chat} direction={direction} StatusMSG={StatusMSG} getdate={getdate} forwarded={forwarded} LINK={LINK} ColorSend={ColorSend} ColorReceive={ColorReceive} MaxWidth={MaxWidth} />
      }
      else {
        if (data.chat.message.imageMessage) {
          return (<MessageImage data={data.chat} direction={direction} StatusMSG={StatusMSG} getdate={getdate} forwarded={forwarded} LINK={LINK} ColorSend={ColorSend} ColorReceive={ColorReceive} MaxWidth={MaxWidth} />)
        }
        else {
          if (data.chat.message.audioMessage) {
            return (<MessageAudio data={data.chat} direction={direction} StatusMSG={StatusMSG} getdate={getdate} forwarded={forwarded} LINK={LINK} ColorSend={ColorSend} ColorReceive={ColorReceive} MaxWidth={MaxWidth} />)
          }
          else {
            return (<Text>data.chat.message === undefined</Text>)
          }
        }
      }
    }
  }

  if (data.message) {
    if (data.message.conversation) {
      return <MessageConversation data={data} direction={direction} StatusMSG={StatusMSG} getdate={getdate} forwarded={forwarded} LINK={LINK} ColorSend={ColorSend} ColorReceive={ColorReceive} MaxWidth={MaxWidth} />
    }
    else {
      if (data.message.extendedTextMessage) {
        <MessageText data={data} direction={direction} StatusMSG={StatusMSG} getdate={getdate} forwarded={forwarded} LINK={LINK} ColorSend={ColorSend} ColorReceive={ColorReceive} MaxWidth={MaxWidth} />
      }
      else {
        if (data.message.imageMessage) {
          return (<MessageImage data={data} direction={direction} StatusMSG={StatusMSG} getdate={getdate} forwarded={forwarded} LINK={LINK} ColorSend={ColorSend} ColorReceive={ColorReceive} MaxWidth={MaxWidth} />)
        }
        else {

          if (data.message.audioMessage) {
            return (<MessageAudio data={data} direction={direction} StatusMSG={StatusMSG} getdate={getdate} forwarded={forwarded} LINK={LINK} ColorSend={ColorSend} ColorReceive={ColorReceive} MaxWidth={MaxWidth} />)
          }
          else {
            return (<Text> data.message === undefined</Text>)
          }

        }
      }
    }
  }
 }

export { FilterTypeMessage };
