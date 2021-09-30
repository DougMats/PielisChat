import React, { useState, useEffect, useRef, useContext } from 'react';
import { SafeAreaView, StatusBar, ScrollView, View, Dimensions, Text, TouchableOpacity, ImageBackground, ActivityIndicator, RefreshControl } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import Toast from 'react-native-simple-toast';
import Message from './Message.js'
import { colorBeta, colorGamma, colorDseta } from '../../Colors.js'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function ChatList(props) {
  const [Load, setLoad] = useState(true);
  const scrollRef = useRef() //ref to ScrollView
  const [Dragging, setDragging] = useState(false); // muestra el boton para ir al ultimo mensaje abajo
  const [refreshing, setRefreshing] = useState(false); // refrescando el screen
  const [data, setdata] = useState([]);

  //ir al final del scroll view true / false
  async function ToDownChat() {
    await scrollRef.current.scrollToEnd({ animated: true });
    setDragging(false)
  }

  //detectar movimiento de scroll
  function _onScrollBeginDrag(event) {
    setDragging(true)
  }

  useEffect(() => {
    create(props.messages, props.MessagesSelectes)
  }, [props.messages, props.MessagesSelectes]);


  useEffect(() => {
    setLoad(false)
  }, [data]);

  async function create() {
    //console.log("creating")
    let tree = props.messages
    let select = props.MessagesSelectes
    //console.log("tree =", tree.length)
    //console.log("select =", select.length)
    for (var t in tree) {
      if (select.length === 0) {
        tree[t].selected = false
        break;
      } else {
        for (var s in select) {
          if (tree[t].key.id === select[s].key.id) {
            tree[t].selected = true
          }
        }
      }
    }
    setdata(tree)
  }

  return (
    <View style={{ flex: 1 }}>
      {Load &&
        <View style={{ flex: 1, justifyContent: "center", alignContent: "center", alignItems: "center" }}>
          <ActivityIndicator color="white" size={60} />
        </View>
      }
      {!Load && data.length !== 0 &&
        <ScrollView
          ref={scrollRef}


          onScroll={event => {
            const y = event.nativeEvent.contentOffset.y;
            //console.log("y:::: ",y) // 3672
          }}



          // onContentSizeChange={() => {
          //   if (props.PositionUp === false) {
          //     scrollRef.current.scrollToEnd({ animated: true })
          //   }
          // }}


          // onScrollBeginDrag={_onScrollBeginDrag}


          
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={props.getChats}
            />
          }
        >
          {
            data.map((i, key) => {
              return (
                <Message
                  key={key}
                  data={i}
                  CreateSelection={props.CreateSelection}
                // multipleSelect={multipleSelect}
                // Selection={Selection}
                />)
            })
          }
        </ScrollView>
      }
      {!Load && data.length === 0 &&
        <View style={{ flex: 1, justifyContent: "center", alignContent: "center", alignItems: "center" }}>
          <View style={{ width: "70%", backgroundColor: "white", paddingVertical: 20, borderRadius: 20, justifyContent: "center", alignContent: "center", alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, }}>
            <Icon name="alert-triangle-outline" fill={colorBeta} size={60} width={60} height={60} />
            <Text style={{ color: colorBeta, fontSize: 14, fontWeight: "600", lineHeight: 30 }}>No hay mensajes para mostrar.</Text>
          </View>
        </View>
      }
      {
        Dragging === true &&
        <TouchableOpacity
          style={{ position: "absolute", zIndex: 999, right: 10, bottom: 0, backgroundColor: colorBeta, width: 50, height: 50, borderRadius: 25, justifyContent: "center", alignContent: "center", alignItems: "center", shadowOffset: { width: 0, height: 3, }, shadowOpacity: 0.29, shadowRadius: 4.65, elevation: 7 }}
          onPress={() => ToDownChat()}>
          <Icon name="arrowhead-down-outline" fill={colorDseta} width={30} height={30} />
        </TouchableOpacity>
      }
    </View>
  )
}
// messages={props.messages} //lista de mensaje
// getChats={props.getChats} // refrescar esta lista de mensajes
// PositionUp={props.PositionUp}
// MessageSelectionMultiple={MessageSelectionMultiple}
// MessageSelectionInser={MessageSelectionInser}
// MessageSelectionDelete={MessageSelectionDelete}
// const [selection, setselection] = useState([]);
// useEffect(() => {
//   setdata(props.messages)
// }, [props.messages]);
// useEffect(() => {
//   setselection(props.MessageSelectionMultiple)
// }, [props.MessageSelectionMultiple]);
// useEffect(() => {
//   console.log("D:", data.length)
//   console.log("S:", selection.length)
//   async function filter() {
//     for (var i in data) {
//       if (selection.length === 0) {
//         //console.log("vacio")
//         data[i].select = false
//       }
//       else {
//         for (var s in selection)
//           if (selection[s].id === data[i].key.id) {
//             //console.log("..........", data[i].key.id)
//             data[i].select = true
//           }
//           else {
//             //console.log("not ", data[i].key.id)
//             data[i].select = false
//           }
//       }
//     }
//   }
//   filter()
// }, [data, selection]);
// let tags2 = ["PHP", "Wordpress"]
// let tags = ["Wordpress", "PHP"]
// var encuentra = false;
// for (var i = 0; i < tags2.length; i++) {
//   encuentra = false;
//   for (var j = 0; j < tags.length; j++) {
//     if (tags2[i] == tags[j]) {
//       encuentra = true;
//       break;
//     }
//   }
//   if (!encuentra) {
//     console.log("los arreglos no son iguales");
//     break;
//   }
// }
// if (encuentra) {
//   console.log("si son iguales");
// }

export default ChatList;