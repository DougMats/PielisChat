import React, { useState, useEffect, useRef, useContext } from 'react';
import { SafeAreaView, StatusBar, ScrollView, View, Dimensions, Text, TouchableOpacity, ImageBackground, ActivityIndicator, RefreshControl } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import Toast from 'react-native-simple-toast';
import Message from './Message.js'
import { colorBeta, colorGamma, colorDseta } from '../../Colors.js'
import { create } from 'lodash';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function ChatList(props) {
  const [Load, setLoad] = useState(false);
  const scrollRef = useRef() //ref to ScrollView
  const [Dragging, setDragging] = useState(false); // muestra el boton para ir al ultimo mensaje abajo
  const [refreshing, setRefreshing] = useState(false); // refrescando el screen

  // useEffect(() => {
  //   buildMessage(props.messages, props.messagesSelectes)
  // }, [props.messages, props.messagesSelectes]);


  async function ToDownChat() {
    await scrollRef.current.scrollToEnd({ animated: true });
    setDragging(false)
  }

  function _onScrollBeginDrag(event) {
    setDragging(true)
  }







  //   async function buildMessage(messages, selects) {
  //     console.log("buildMessage")
  // console.log("M", messages)
  // console.log("S", selects)
  // if(selects.length>=1){
  //   console.log("single")
  // }
  // else{
  //   console.log(".....")
  //    messages.select = false
  //    messages.Color = "red"
  // }
  // console.log(" messages....",  messages)
  //console.log("creating")
  // let tree = props.messages
  // let select = props.MessagesSelectes
  // //console.log("tree =", tree.length)
  // //console.log("select =", select.length)
  // for (var t in tree) {
  //   if (select.length === 0) {
  //     tree[t].select = false
  //     break;
  //   } else {
  //     for (var s in select) {
  //       if (tree[t].key.id === select[s].key.id) {
  //         tree[t].select = true
  //       }
  //     }
  //   }
  // }
  //   function updateVegetablesCollection (veggies, veggie) {
  //     if (veggies.indexOf(veggie) === -1) {
  //         veggies.push(veggie);
  //         console.log('La nueva colección de vegetales es: ' + veggies);
  //     } else if (veggies.indexOf(veggie) > -1) {
  //         console.log(veggie + ' ya existe en la colección de verduras.');
  //     }
  // }
  // var veggies = ['patata', 'tomate', 'chiles', 'pimientoverde'];
  // updateVegetablesCollection(veggies, 'espinaca');
  // // La nueva colección de verduras es : patata, tomate, chiles, pimientoverde, espinaca
  // updateVegetablesCollection(veggies, 'espinaca');
  // // La espinaca ya existe en la colección de verduras.
  // setMessagesPrint(messages)
  // }

  return (
    <View style={{ flex: 1 }}>
      <View style={{
        display: props.messagesSelectes.length > 0 ? "flex" : "none",
        backgroundColor: colorBeta,
        padding: 5,
        flexDirection: "row",
        justifyContent: "space-around"
      }}>
        <Text style={{ color: "white", fontSize: 14, fontWeight: "800" }}>{props.messagesSelectes.length}</Text>
        {props.messagesSelectes.length === 1 &&
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() => props.messageAnswerCreate()}>
            <Icon name="undo" fill={colorDseta} width={20} height={20} />
            <Text style={{ color: "white", marginLeft: 5 }}>Responder</Text>
          </TouchableOpacity>
        }
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => props.messagesSelectesClear()}>
          <Icon name="checkmark-square-2" fill={colorDseta} width={20} height={20} />
          <Text style={{ color: "white", marginLeft: 5 }}>Deselec todo</Text>
        </TouchableOpacity>
      </View>
      {Load === true ?
        <View style={{ flex: 1, justifyContent: "center", alignContent: "center", alignItems: "center" }}>
          <ActivityIndicator color="white" size={30} />
        </View>
        :
        props.messages.length === 0 ?
          <>
            {/*
         <View style={{ flex: 1, justifyContent: "center", alignContent: "center", alignItems: "center" }}>
          <View style={{ width: "70%", backgroundColor: "white", paddingVertical: 20, borderRadius: 20, justifyContent: "center", alignContent: "center", alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, }}>
             <Icon name="alert-triangle-outline" fill={colorBeta} size={60} width={60} height={60} />
             <Text style={{ color: colorBeta, fontSize: 14, fontWeight: "600", lineHeight: 30 }}>No hay mensajes para mostrar.</Text>
           </View>
         </View>
         */}
          </>
          :
          <>
            <ScrollView
              ref={scrollRef}
              onScroll={event => {
                const y = event.nativeEvent.contentOffset.y;
                //console.log("y:::: ",y) // 3672
              }}
              onContentSizeChange={() => {
                if (props.PositionUp === false) {
                  scrollRef.current.scrollToEnd({ animated: true })
                }
              }}
              onScrollBeginDrag={_onScrollBeginDrag}
              refreshControl={
                <RefreshControl
                  // refreshing={refreshing}
                  onRefresh={props.getChats}
                />
              }
            >
              {
                props.messages.map((i, key) => {
                  return (
                    <Message
                      key={key}
                      data={i}
                      contact={props.contact}
                      CreateSelection={props.CreateSelection}
                      selectToAnswer={props.selectToAnswer}
                      messagesSelectes={props.messagesSelectes}


                      messagesSelectesInsert={props.messagesSelectesInsert}
                      messagesSelectesDelete={props.messagesSelectesDelete}
                      messagesSelectesClear={props.messagesSelectesClear}



                    // // multipleSelect={multipleSelect}
                    // // Selection={Selection}
                    />
                  )
                })
              }
            </ScrollView>
            {
              Dragging === true &&
              <TouchableOpacity
                style={{ position: "absolute", zIndex: 999, right: 10, bottom: 0, backgroundColor: colorBeta, width: 50, height: 50, borderRadius: 25, justifyContent: "center", alignContent: "center", alignItems: "center", shadowOffset: { width: 0, height: 3, }, shadowOpacity: 0.29, shadowRadius: 4.65, elevation: 7 }}
                onPress={() => ToDownChat()}>
                <Icon name="arrowhead-down-outline" fill={colorDseta} width={30} height={30} />
              </TouchableOpacity>
            }
          </>
      }
    </View>
  )
}
export default ChatList;