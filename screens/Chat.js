import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StatusBar, ScrollView, View, Dimensions, Text, TouchableOpacity, ImageBackground, ActivityIndicator, Button } from 'react-native';
import HeadChat from '../components/HeadChat.js';
import IntroTextChat from '../components/IntroTextChat.js';
import Message from '../components/Message.js';
// import MessageSent from '../components/MessageSent.js';
// import MessageReceived from '../components/MessageReceived.js'
import LinearGradient from 'react-native-linear-gradient';
import LoadFile from '../components/LoadFile.js';
import Menu from '../components/Menu.js';
import { Icon } from 'react-native-eva-icons';
import { colorAlfa, colorBeta, colorGamma, colorEpsilon, colorDseta, colorEta, colorZeta, colorIota, colorKappa, colorLambda, colorMi, colorNi, colorXi, colorΟmicron, colorPi, colorRo, colorSigma, colorΤau, colorIpsilon, colorFi, colorJi, colorPsi, colorOmega } from '../Colors.js'
import _ from 'lodash';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function Chat(props) {
  const [positionY, setpositionY] = useState(0);
  const [Load, setLoad] = useState(true); //cargando
  const [File, setFile] = useState(false);
  const [TopMenu, setTopMenu] = useState(false); //mostrar menu
  const [selectList, setselectList] = useState([]); // lista de seleccion multiple
  const [multipleSelect, setmultipleSelect] = useState(false); //existe algun seleccionado?
  const [data, setdata] = useState(props.route.params.data); //listado de chat
  const [messages, setmessages] = useState([]); //listado de chat
  const scrollRef = useRef()
  const [Dragging, setDragging] = useState(false);
  const [typeMessage, settypeMessage] = useState("nunguno");

  let randomCode
  if (props.route.params) { randomCode = props.route.params.randomCode }
  else { randomCode = 1 }

  useEffect(() => {
    //setdata(props.route.params.data);
    setTopMenu(false);
  }, [randomCode]);

  useEffect(() => {
    if (data.messages) {
      //setLoad(false);
      setmessages(data.messages)
    }
  }, [data]);

  useEffect(() => {
    setLoad(false);
    let master = messages.length
    let slave = selectList.length
    console.log("----->", master, "=", slave, "<-----")
    for (var i = 0; i < master; i++) {
      if (slave === 0) {
        messages[i].selected = false;
      }
      else {
        for (var j = 0; j < slave; j++) {
        }
      }
    }
  }, [messages, selectList]);

  useEffect(() => {
    if (selectList.length > 0) {
      setmultipleSelect(true);
    }
    else {
      setmultipleSelect(false);
    }
  }, [selectList]);

  function Selection(value) {
    let array = { "id": value }
    console.log(array)
    if (selectList.length === 0) {
      setselectList([...selectList, array]);
    }
    else {
      let Updating = selectList.find(id => id.id == value)
      if (Updating === undefined) {
        console.log("no existe");
        setselectList([...selectList, array])
      }
      else {
        console.log("si existe");
        const update = selectList.filter(id => id.id !== value)
        setselectList(update)
      }
    }
  }

  function openTopMenu() {
    // console.log("open top menu")
    setTopMenu(true);
  }

  function closeTopMenu() {
    // console.log("closet top menu")
    setTopMenu(false);
  }

  function goToScreen(screen, data) {
    props.navigation.navigate(screen, { randomCode: Math.random(), data })
  }

  function ShowLoadFile() {
    console.log("to up load file", File)
    setFile(!File)
    console.log("to up load file", File)
  }

  function _onScrollBeginDrag(event) {
    setDragging(true)
    //console.log("renderItem", event)
  }

  function getTypeMessage(type) {
    settypeMessage(type)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor={colorGamma} barStyle="light-content" />
      <Menu level={1} show={TopMenu} closeTopMenu={closeTopMenu} goToScreen={goToScreen} data={data} />
      {!Load && selectList.length === 0 &&
        <HeadChat openTopMenu={openTopMenu} data={data} goToScreen={goToScreen} />
      }
      {selectList.length > 0 &&
        <View style={{ paddingTop: 10, height: 50, backgroundColor: colorGamma, flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableOpacity onPress={() => goToScreen("Dashboadr", null)} style={{ width: 40, alignContent: "center", justifyContent: "center", alignItems: "center", height: 40, borderRadius: 20, marginTop: -5 }}>
            <Icon name="arrow-back" fill={colorDseta} width={30} height={30} />
          </TouchableOpacity>
          <Text style={{ color: colorDseta, fontSize: 20, fontWeight: "bold", width: "20%", }}>....{selectList.length}</Text>
          <TouchableOpacity style={{ width: 40, alignContent: "center", justifyContent: "center", alignItems: "center", height: 40, borderRadius: 20, marginTop: -5 }}>
            <Icon name="undo" fill={colorDseta} width={30} height={30} />
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 40, alignContent: "center", justifyContent: "center", alignItems: "center", height: 40, borderRadius: 20, marginTop: -5 }}>
            <Icon name="star" fill={colorDseta} width={30} height={30} />
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 40, alignContent: "center", justifyContent: "center", alignItems: "center", height: 40, borderRadius: 20, marginTop: -5 }}>
            <Icon name="trash" fill={colorDseta} width={30} height={30} />
          </TouchableOpacity>
          <TouchableOpacity style={{ transform: [{ rotate: '180deg' }], width: 40, alignContent: "center", justifyContent: "center", alignItems: "center", height: 40, borderRadius: 20, marginTop: -5 }}>
            <Icon name="undo" fill={colorDseta} width={30} height={30} />
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 40, alignContent: "center", justifyContent: "center", alignItems: "center", height: 40, borderRadius: 20, marginTop: -5 }}>
            <Icon name="more-vertical-outline" fill={colorDseta} width={30} height={30} />
          </TouchableOpacity>
        </View>
      }
      <ImageBackground source={require('../images/background_1.png')}
        style={{
          flex: 1,
          justifyContent: "flex-end",
          resizeMode: "cover",
          width: "100%",
          height: "100%"
        }}>
        <View style={{
          paddingHorizontal: 10,
          marginBottom: 55,
          paddingTop: 0,
          width: windowWidth,
          height: windowHeight - 115
        }}>
          <ScrollView
            onLayout={(event) =>
              console.log(event.nativeEvent.layout)
            }
            ref={scrollRef}
            style={{ width: "100%", height: "100%" }}
            decelerationRate="normal"
            showsVerticalScrollIndicator={true}
            //scrollTo({x: 0, y: 0, duration: 500})
            // scrollToEnd(([options]: {animated: boolean, duration: number}));
            // scrollTo(
            //   ([y]: number),
            //   object,
            //   ([x]: number),
            //   ([animated]: boolean),
            //   ([duration]: number),
            onScrollBeginDrag={_onScrollBeginDrag}
          // useNativeDriver={true}
          // renderItem={renderItem(e)}
          //fadingEdgeLength={2}
          // ref={ref => scrollView = ref}
          //onContentSizeChange={() => scrollView.scrollToEnd({ animated: true })}
          // ref={scrollViewRef}
          // onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
          //scrollToEnd({ animated: true});
          >
            {
              Load &&
              <ActivityIndicator color="white" size={50} style={{ marginTop: "60%", width: "100%" }} />
            }
            {!Load && messages.length == 0 &&
              <Text style={{ backgroundColor: "red" }}>ry53y35y</Text>
            }
            <View style={{ justifyContent: "flex-end" }}>
              {!Load && messages.length > 0 &&
                messages.map((i, key) => {
                  return (<Message key={key} data={i} multipleSelect={multipleSelect} Selection={Selection} />)
                })
              }
            </View>
          </ScrollView>
          {
            Dragging === true &&
            <TouchableOpacity
              style={{
                position: "absolute",
                zIndex: 999,
                right: 10,
                bottom: 10,
                backgroundColor: colorBeta,
                width: 50,
                height: 50,
                borderRadius: 25,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.29,
                shadowRadius: 4.65,
                elevation: 7
              }}
              onPress={() =>
                scrollRef.current.scrollTo({
                  x: 0,
                  y: 999,//664,
                  animated: true,
                })}>
              <Icon name="arrowhead-down-outline" fill={colorDseta} width={30} height={30} />
            </TouchableOpacity>
          }
        </View>
      </ImageBackground>
      {File && <LoadFile ShowLoadFile={ShowLoadFile} getTypeMessage={getTypeMessage} />}
      <IntroTextChat ShowLoadFile={ShowLoadFile} typeMessage={typeMessage} />
    </SafeAreaView>
  );
}
export default Chat;